/**
 * Download Images Script
 * 
 * Reads products.json, downloads images, and updates the JSON with local paths.
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const axiosInstance = axios.create({ httpsAgent });

const DATA_DIR = path.resolve(__dirname, '../src/data');
const IMAGES_DIR = path.resolve(__dirname, '../public/images/products');
const INPUT_FILE = path.join(DATA_DIR, 'products.json');
const OUTPUT_FILE = path.join(DATA_DIR, 'products-with-images.json');

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function downloadFile(url, outputPath) {
    try {
        const response = await axiosInstance({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading file ${url}:`, error.message);
        throw error;
    }
}

async function processImages() {
    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`Input file not found: ${INPUT_FILE}`);
        return;
    }

    const products = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
    console.log(`Found ${products.length} products to process.`);

    for (const product of products) {
        if (product.image) {
            try {
                // Generate filename from existing URL or product name
                const ext = path.extname(product.image) || '.jpg';
                const filename = product.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + ext;
                const localPath = path.join(IMAGES_DIR, filename);
                const publicPath = `/images/products/${filename}`;

                if (fs.existsSync(localPath)) {
                    console.log(`Image exists: ${filename}, skipping.`);
                } else {
                    console.log(`Downloading image for ${product.name}...`);
                    await downloadFile(product.image, localPath);
                }

                product.localImagePath = publicPath;
                // Update the main image field to be the local path for the app to use directly
                // keeping original as backup if needed, usually better to just swap or add a new field.
                product.image = publicPath;

            } catch (error) {
                console.error(`Failed to download image for ${product.name}`, error.message);
            }
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
    console.log(`Done! Updated data saved to ${OUTPUT_FILE}`);
}

processImages();
