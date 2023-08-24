import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export const validateModel = (model: Model<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doc = new model(req.body);
            
            await doc.validate();
      
            next();
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Invalid request body' });
        }
    };
};