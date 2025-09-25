from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import datetime
import os

# Load environment variables from a .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)

# --- Enable CORS for all routes and all origins ---
CORS(app)

# Initialize the language model
llm = ChatGoogleGenerativeAI(model='gemini-1.5-flash', temperature=0.3)

# UPDATED prompt template to match the frontend data structure
detailed_planning_template = """
**Role:** You are a senior Agronomist and Agricultural Economist for India. Your advice is considered the gold standard for accuracy and practicality. You are tasked with creating a detailed, risk-mitigated, and profitable crop plan for a farmer. Your analysis must be precise, your language simple (in Hindi), and your recommendations directly tied to the data provided. Do not hallucinate; use realistic data ranges for costs and prices for the specified region.

**Farmer's Data Profile:**
* **Location:** {location}
* **Total Land Area:** {area} acres
* **Soil Type:** {soil_type}
* **Local Weather:** {weather_data}
* **Selected Season:** {season_name}

**Your Definitive Task:**
1.  Based on the farmer's complete profile for the upcoming **{season_name} season**, create a comprehensive farming strategy.

**Required Output Format:**

**किसान भाई, आपकी जमीन और बाजार की पूरी जानकारी के आधार पर आने वाले {season_name} सीजन के लिए यह सबसे अच्छी योजना है:**

**1. आपकी जमीन का विश्लेषण (Your Farm's Analysis):**
* संक्षेप में बताएं कि किसान की मिट्टी और मौसम की स्थिति क्या है (e.g., "आपकी {soil_type} मिट्टी और मौजूदा मौसम की स्थिति को देखते हुए, यह रबी की फसलों के लिए उत्तम है।").

**2. फसल योजना और जमीन का बंटवारा (Crop Plan & Land Allocation):**
* Provide a clear land allocation strategy. Be explicit. Example: "आपके पास कुल {area} एकड़ जमीन है। हमारा सुझाव है कि आप जोखिम कम करने और मुनाफा पक्का करने के लिए अपनी जमीन को इस तरह बांटें:"
    * **[X] एकड़ ([Y]% हिस्से में):** [मुख्य फसल का नाम]
    * **[X] एकड़ ([Y]% हिस्से में):** [दूसरी फायदेमंद फसल का नाम]
    * **[X] एकड़ ([Y]% हिस्से में):** [तीसरी, नकदी/प्रयोगिक फसल का नाम]

**3. हर फसल का विस्तृत विश्लेषण (Detailed Analysis for Each Allocated Crop):**
* Create a detailed section for EACH crop mentioned in the allocation plan.

**[Crop Name] ([Allocated Acres] एकड़ में) [Emoji]**

* **क्यों यह फसल आपके लिए सही है? (Why This Crop is Perfect for YOU?):**
    * Directly connect the crop to the user's specific soil type and weather. (e.g., "आपकी {soil_type} मिट्टी इस फसल की जड़ों को अच्छी पकड़ देती है और पानी को सही मात्रा में सोखती है।").
* **आर्थिक विश्लेषण (प्रति एकड़) | Economic Analysis (Per Acre):**
    * **अनुमानित कुल लागत (Estimated Total Cost):** ₹ [Amount].
    * **अनुमानित उपज (Expected Yield):** [Quantity] Quintals/Acre.
    * **मौजूदा बाजार भाव (Current Market Price):** ₹ [Amount] per Quintal.
    * **अनुमानित शुद्ध मुनाफा (Estimated Net Profit per Acre):** ₹ [Amount].
    * **निवेश पर रिटर्न (Return on Investment - ROI):** [Percentage]%.
* **विशेष सलाह (आपकी मिट्टी के अनुसार) | Tailored Advice (As per YOUR soil):**
    * Provide specific fertilizer and irrigation advice suited to the soil type. (e.g., "आपकी {soil_type} मिट्टी के लिए, बुवाई के समय [Fertilizer Name] डालें और [Number] सिंचाई की आवश्यकता होगी।").
* **बाजार की जानकारी | Market Insights:**
    * **मांग (Demand):** [High / Stable].
    * **मूल्य जोखिम (Price Risk):** [Low / Medium / High].

**(Repeat this detailed structure for all crops in the plan)**

**4. योजना का सारांश (Plan Summary):**
* Conclude with a summary table comparing the allocated crops based on 'कुल अनुमानित मुनाफा (Total Estimated Profit from allocated area)', 'कुल लागत (Total Cost)', and 'जोखिम स्तर (Risk Level)'.

**Disclaimer:**
* Add a final, responsible disclaimer.
"""

# Define the endpoint for getting recommendations
@app.route("/recommendation", methods=["POST"])
def get_recommendation():
    """
    API endpoint to generate a crop recommendation plan.
    Expects a JSON payload with farmer's data.
    """
    try:
        # Get the JSON data from the request body
        data = request.get_json()
        print("Received data:", data)

        # Basic validation to ensure required keys are present
        required_keys = ["location", "area", "weather_data", "query"]
        if not all(key in data for key in required_keys):
            return jsonify({"error": "Missing required fields in request body"}), 400
        
        # Deeper validation for nested keys
        if not all(key in data.get("query", {}) for key in ["soil_type", "season"]):
            return jsonify({"error": "Missing 'soil_type' or 'season' in query"}), 400

        # --- Format and extract data correctly ---
        location_obj = data["location"]
        location_str = f"{location_obj.get('city', '')}, {location_obj.get('state', '')}"
        
        query_obj = data["query"]
        soil_type = query_obj["soil_type"]
        season = query_obj["season"]

        # Prepare the input for the prompt
        prompt_input = {
            "location": location_str,
            "area": data["area"],
            "soil_type": soil_type,
            "weather_data": str(data["weather_data"]), # Pass weather data as a string
            "season_name": season
        }

        # --- Create and Format the Prompt ---
        prompt = PromptTemplate(
            template=detailed_planning_template,
            input_variables=list(prompt_input.keys())
        )
        final_prompt = prompt.invoke(prompt_input)

        # --- Get the AI's Detailed Plan ---
        print("--- Generating accurate crop plan based on user data... ---")
        answer = llm.invoke(final_prompt)
        
        # Return the plan as a JSON response
        return jsonify({"recommendation_plan": answer.content})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500

# --- Main execution block to run the Flask app ---
if __name__ == "__main__":
    # Use 0.0.0.0 to make it accessible on your local network
    app.run(host='0.0.0.0', port=5000, debug=True)