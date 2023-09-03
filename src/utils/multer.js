import { resolve } from 'path';
import multer from 'multer';
import fs from 'fs';

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

export const uploadDocs = (req, res, next) => {
  //Limite de 5 archivos de 5mb cada uno maximo
  uploader.array('documents', 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message })
    }

    const docs = req.files;
    const errors = [];

    if(docs.length < 1) return res.status(400).json({ success: false, message: "No files selected" })

    docs.forEach((doc) => {
      if (doc.size > maxSize) errors.push(`File ${file.originalname} is too large, each file limit is 5MB`);
    })

    if (errors.length > 0) {
      docs.forEach((doc) => {
        fs.unlinkSync(doc.path)
      })
      return res.status(400).json({ success: false, message: "Upload failed! Check the errors and try again", errors: errors })
    }

    req.docs = docs

    next();
  })
}

export const uploadProfile = (req, res, next) => {
  uploader.single('profile')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message })
    }

    const profile = req.file;
    if (profile.size > maxSize) return res.status(400).json({ success: false, message: `File ${profile.originalname} is too large, file limit is 5MB` })
  })

  req.profile = profile;

  next();
}

export const uploadProduct = (req, res, next) => {
  uploader.array('products', 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message })
    }

    const products = req.files;
    const errors = [];

    products.forEach((product) => {
      if (product.size > maxSize) errors.push(`File ${file.originalname} is too large, each file limit is 5MB`);
    })

    if (errors.length > 0) {
      products.forEach((product) => {
        fs.unlinkSync(product.path)
      })
      return res.status(400).json({ success: false, message: "Upload failed! Check the errors and try again", errors: errors })
    }

    req.products = products

    next();
  })
}