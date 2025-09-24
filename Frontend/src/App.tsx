import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Landing from "./pages/landing"
import Weather from "./pages/weather"
import { RecoilRoot } from "recoil"
import MarketPrice from "./pages/marketPrice"
import CropAdvisory from "./pages/cropAdvisory"
import Community from "./pages/community"
import Marketplace from "./pages/marketPlace"
import Chatbot from "./pages/chatBot"

function App() {


  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route element={<Landing/>} path="/"/>
      <Route element={<Weather/>} path="/weather"/>
      <Route element={<MarketPrice/>} path="/market-price"/>
      <Route element={<CropAdvisory/>} path="/crop-suggestion"/>
      <Route element={<Community/>} path="/community-page"/>
      <Route element={<Marketplace/>} path="/market-place"/>
      <Route element={<Chatbot/>} path="/chat-bot"/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
