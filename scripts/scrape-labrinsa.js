/**
 * Scrape Labrinsa Script
 * 
 * Fetches products from labrinsa.com, extracts details, and downloads technical sheets.
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = 'https://labrinsa.com';
const PRODUCTS_URL = 'https://labrinsa.com/productos/';
// Bypass SSL certificate errors
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const axiosInstance = axios.create({ httpsAgent });

const OUTPUT_DIR = path.resolve(__dirname, '../src/data');
const PDF_DIR = path.resolve(__dirname, '../public/pdfs');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(PDF_DIR)) {
    fs.mkdirSync(PDF_DIR, { recursive: true });
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    }
}

async function scrapeProductDetails(productUrl) {
    try {
        console.log(`Scraping product: ${productUrl}`);
        const { data } = await axiosInstance.get(productUrl);
        const $ = cheerio.load(data);

        const name = $('h1.product_title').text().trim() || $('h1.entry-title').text().trim() || productUrl.split('/').filter(Boolean).pop();
        // Fallback for image if main image not found
        const image = $('.woocommerce-product-gallery__image a').attr('href') || '';
        const category = $('.posted_in a').first().text().trim();
        const description = $('.woocommerce-product-details__short-description').text().trim();

        // Composition
        const composition = [];
        // Attempt to find composition in tabs or content. 
        // Structure varies, usually in a "Description" tab or main content.
        // Based on visually inspecting, it seems to be in the main content or tabs.
        // Let's look for known headers or list items if possible.
        // For now, we will grab the raw text of the description tab if specific structure is hard to parse genericially.
        // However, the example mock data had structured composition.
        // Let's try to parse table rows if present, or li elements.

        // Detailed extraction might require looking at specific HTML structure observed in browser tool.
        // Use general selector for now.

        let pdfUrl = '';
        // Look for the "Descargar ficha técnica" button
        $('a').each((i, el) => {
            if ($(el).text().toLowerCase().includes('descargar ficha técnica')) {
                pdfUrl = $(el).attr('href');
            }
        });

        // Warnings / Indications - often in standard WP tabs
        const indications = [];
        const warnings = [];

        // Simple extraction logic for now, processing raw text might be needed later
        // or we dump the full HTML of the description for the user to clean up.

        return {
            name,
            url: productUrl,
            image,
            category,
            description,
            // composition, // Complex to parse generically without more inspection
            // indications,
            // warnings,
            pdfUrl
        };

    } catch (error) {
        console.error(`Error scraping ${productUrl}:`, error.message);
        return null;
    }
}

async function scrapeCatalog() {
    let currentPage = 1;
    let hasNextPage = true;
    const allProducts = [];
    const productLinks = [];

    // Step 1: Collect all product links
    console.log('Starting catalog scrape...');

    while (hasNextPage) {
        const url = currentPage === 1 ? PRODUCTS_URL : `${PRODUCTS_URL}page/${currentPage}/`;
        console.log(`Visiting catalog page ${currentPage}: ${url}`);

        try {
            const { data } = await axiosInstance.get(url);
            const $ = cheerio.load(data);

            // Labrinsa seems to use standard WooCommerce loop (.products .product)
            const productsOnPage = $('.products .product');

            if (productsOnPage.length === 0) {
                hasNextPage = false;
                break;
            }

            productsOnPage.each((i, el) => {
                const link = $(el).find('a.woocommerce-LoopProduct-link').attr('href');
                if (link) {
                    productLinks.push(link);
                }
            });

            // Check for next page
            const nextLink = $('.woocommerce-pagination .next').attr('href');
            if (!nextLink) {
                hasNextPage = false;
            } else {
                currentPage++;
                await sleep(1000); // Be polite
            }

        } catch (error) {
            console.error(`Error scraping page ${currentPage}:`, error.message);
            hasNextPage = false;
        }
    }

    console.log(`Found ${productLinks.length} products. Starting detail scrape...`);

    // Step 2: Scrape details for each product
    for (const link of productLinks) {
        const productData = await scrapeProductDetails(link);

        if (productData) {
            // Download PDF if exists
            if (productData.pdfUrl) {
                // Generate filename: use scraped name or URL slug
                let safeName = productData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                if (!safeName || safeName.length < 3) {
                    safeName = link.split('/').filter(Boolean).pop();
                }
                const filename = safeName + '.pdf';
                const pdfPath = path.join(PDF_DIR, filename);
                if (fs.existsSync(pdfPath)) {
                    console.log(`PDF already exists: ${filename}, skipping download.`);
                    productData.localPdfPath = `/pdfs/${filename}`;
                } else {
                    console.log(`Downloading PDF for ${productData.name} (File: ${filename})...`);
                    await downloadFile(productData.pdfUrl, pdfPath);
                    productData.localPdfPath = `/pdfs/${filename}`;
                }
            }

            allProducts.push(productData);

            // Save incrementally
            const outputPath = path.join(OUTPUT_DIR, 'products.json');
            fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2));
        }
        await sleep(1000); // Politeness delay
    }

    // Step 3: Save results
    fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2));
    console.log(`Scraping complete! Saved ${allProducts.length} products to ${outputPath}`);
}

scrapeCatalog();
