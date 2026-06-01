import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { shortUrl, getOriginalUrl } from './Controllers/url.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://kajalbhatiya610_db_user:KqSda07I2tdkhzy8@cluster0.6kmv7xw.mongodb.net/NodeJs_YT?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    dbName: process.env.MONGO_DB || 'NodeJs_YT'
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
    const shortURL = req.query.shortURL || null;
    res.render('index', { shortURL });
});

app.post('/short', shortUrl);
app.get('/:shortCode', getOriginalUrl);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));