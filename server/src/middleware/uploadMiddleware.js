import multer from 'multer';
import path from 'path';

// 🔥 Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Make sure the 'uploads/' folder actually exists in your project root
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// 🔥 File filter (image + docs)
const fileFilter = (req, file, cb) => {
  // 1. Array of allowed MIME types
  const allowedMimes = [
    'image/jpeg', 
    'image/png', 
    'image/jpg', 
    'image/webp', 
    'image/gif',
    'application/pdf', 
    'image/avif',
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'text/plain'
  ];

  // 2. Regex for allowed extensions
  const allowedExts = /jpeg|jpg|avif|png|webp|gif|pdf|doc|docx|txt/;

  // Logic checks
  const mime = allowedMimes.includes(file.mimetype);
  const ext = allowedExts.test(path.extname(file.originalname).toLowerCase());

  if (ext && mime) {
    cb(null, true); 
  } else {
    // Provide a clear error message including the rejected type for debugging
    cb(new Error(`Only images and documents are allowed. Got: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;