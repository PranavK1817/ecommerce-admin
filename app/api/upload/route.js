import multer from 'multer';
import fs from 'fs';
import nextConnect from 'next-connect';
import { MongoClient } from 'mongodb';

const upload = multer({ dest: './public/uploads/' });

const handler = nextConnect();

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

handler.use(upload.single('image'));

handler.post(async (req, res) => {
  try {
    // Check if file is an image
    if (!req.file || !req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Selected file is not an image' });
    }

    // Connect to MongoDB
    await client.connect();

    const database = client.db(process.env.MONGODB_DB);
    const collection = database.collection('images');

    // Read image file
    const imageBuffer = fs.readFileSync(req.file.path);
    const encodedImage = imageBuffer.toString('base64');

    // Create document to insert into MongoDB
    const imageDocument = {
      name: req.file.originalname,
      image: encodedImage,
      contentType: req.file.mimetype,
    };

    // Insert document into MongoDB
    const result = await collection.insertOne(imageDocument);

    // Delete temporary file
    fs.unlinkSync(req.file.path);

    // Return image URL (a route to retrieve the image by ID could be used here)
    res.status(200).json({ imageUrl: `/api/images/${result.insertedId}` });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  } finally {
    // Close the connection to MongoDB
    await client.close();
  }
});

export default handler;
