const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const bucket = require('../config/firebaseConfig');

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload file to Firebase under a specific path
const uploadToFirebase = async (file, folderPath) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file provided"));
    }

    // Define the storage path: memory_vault/capsules/{folderPath}/{uuid-fileName}
    const fileName = `memory_vault/capsules/${folderPath}/${uuidv4()}-${file.originalname}`;
    const fileRef = bucket.file(fileName);

    // Create a stream for file upload
    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype, // Keep correct MIME type
      },
    });

    stream.on('error', (error) => {
      console.error("Upload failed:", error);
      reject(error);
    });

    stream.on('finish', async () => {
      // Make file publicly accessible
      await fileRef.makePublic();

      // Construct public URL
      const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      resolve(fileUrl);
    });

    stream.end(file.buffer);
  });
};

// Middleware to handle file upload and update request body
const uploadFilesMiddleware = async (req, res, next) => {
  try {
    if (!req.files) return next();

    const uploadedFiles = {};

    // Upload images to memory_vault/capsules/images
    if (req.files.images) {
      uploadedFiles.images = await Promise.all(
        req.files.images.map((file) => uploadToFirebase(file, 'images'))
      );
    }

    // Upload videos to memory_vault/capsules/videos
    if (req.files.videos) {
      uploadedFiles.videos = await Promise.all(
        req.files.videos.map((file) => uploadToFirebase(file, 'videos'))
      );
    }

    // Upload text files to memory_vault/capsules/text
    if (req.files.text_files) {
      uploadedFiles.text_files = await Promise.all(
        req.files.text_files.map((file) => uploadToFirebase(file, 'text'))
      );
    }

    // Update request body with file URLs
    req.body.content = uploadedFiles;

    next();
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ message: "File upload failed", error });
  }
};

// Export the middleware
module.exports = { upload, uploadFilesMiddleware };
