import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = './urls.json';

const ensureDataFile = async () => {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
    }
};

const readUrls = async () => {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
};

const writeUrls = async (urls) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(urls, null, 2));
};

export const URL = {
    async save(urlObj) {
        const urls = await readUrls();
        urls.push({ ...urlObj, createdAt: new Date().toISOString() });
        await writeUrls(urls);
        return urlObj;
    },
    
    async findOne(query) {
        const urls = await readUrls();
        return urls.find(url => url.shortCode === query.shortCode) || null;
    }
};
