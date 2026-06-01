import express from 'express';
import { shortUrl, getOriginalUrl } from './Controllers/url.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    const shortURL = req.query.shortURL || null;
    res.render('index', { shortURL });
});

app.post('/short', shortUrl);
app.get('/:shortCode', getOriginalUrl);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));