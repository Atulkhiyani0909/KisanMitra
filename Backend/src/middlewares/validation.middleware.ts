import { z } from 'zod';

const validate = (schema:any ) => (req : Request, res :Response, next:any) => {
  try {
    // Validate request body, query, or params based on your schema
    schema.parse(req.body); // Or req.query, req.params
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
        //@ts-ignore
      return res.status(400).json({ errors: error.errors });
    }
    next(error); // Pass other errors to the error handling middleware
  }
};

export default validate;