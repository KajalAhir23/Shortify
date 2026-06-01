
import { URL } from "../models/URL.js";
import shortid from "shortid";

export const shortUrl = async (req, res) => {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();
    const shortURL = `${req.protocol}://${req.get('host')}/${shortCode}`;
    const newUrl = new URL({ shortCode, longUrl });
    await newUrl.save();
    console.log("Shortened URL saved:", newUrl);
    res.redirect(`/?shortURL=${encodeURIComponent(shortURL)}`);
};

export const getOriginalUrl = async (req, res) => {
    const shortCode = req.params.shortCode;
    const originalUrl = await URL.findOne({ shortCode });
    if (originalUrl) {
        res.redirect(originalUrl.longUrl);
    } else {
        res.status(404).render("index", { shortURL: null });
    }
};
