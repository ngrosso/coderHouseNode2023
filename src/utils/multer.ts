import { resolve } from 'path';
import multer from 'multer';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(`src/public/images/${file.fieldname}`));
  },
  filename: (req, file, cb) => {
    cb(null, `Document-${Date.now()}-${file.originalname}`);
  }
});

const uploader = multer({ storage });

export const uploadDocs = (req: Request, res: Response, next: NextFunction) => {
  //Limite de 5 archivos de 5mb cada uno maximo
  uploader.array('documents', 5)(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const docs = req.files as Express.Multer.File[];
    const errors: string[] = [];

    if(!docs || docs.length < 1) return res.status(400).json({ success: false, message: "No files selected" });

    docs.forEach((doc) => {
      if (doc.size > maxSize) errors.push(`File ${doc.originalname} is too large, each file limit is 5MB`);
    });

    if (errors.length > 0) {
      docs.forEach((doc) => {
        fs.unlinkSync(doc.path);
      });
      return res.status(400).json({ success: false, message: "File Upload failed! Check the errors and try again", errors: errors });
    }

    (req as any).docs = docs;

    next();
  });
};

export const uploadProfile = (req: Request, res: Response, next: NextFunction) => {
  uploader.single('profile')(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const profile = req.file;
    if (profile && profile.size > maxSize) return res.status(400).json({ success: false, message: `File ${profile.originalname} is too large, file limit is 5MB` });
  
    (req as any).profile = profile;

    next();
  });
};

export const uploadProduct = (req: Request, res: Response, next: NextFunction) => {
  uploader.array('products', 5)(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const products = req.files as Express.Multer.File[];
    const errors: string[] = [];

    products.forEach((product) => {
      if (product.size > maxSize) errors.push(`File ${product.originalname} is too large, each file limit is 5MB`);
    });

    if (errors.length > 0) {
      products.forEach((product) => {
        fs.unlinkSync(product.path);
      });
      return res.status(400).json({ success: false, message: "File Upload failed! Check the errors and try again", errors: errors });
    }

    (req as any).products = products;

    next();
  });
};
