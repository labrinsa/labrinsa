
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.resolve(__dirname, '../src/data/products-with-images.json');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/mockData.js');

const products = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));

// Extract unique categories
const categories = [...new Set(products.map(p => p.category))].filter(Boolean);

const formatName = (slug) => {
    if (!slug) return '';
    return slug
        .split('-')
        .map(word => {
            if (word.length === 0) return '';
            // Capitalize first letter
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

const transformedProducts = products.map((p, index) => {
    let indications = [];
    let warnings = [];
    let composition = [];
    let description = p.description;

    const formattedName = formatName(p.name);

    // Parse composition
    if (description.includes('contiene:') && description.includes('Indicaciones:')) {
        const compPart = description.split('contiene:')[1].split('Indicaciones:')[0].trim();
        const lines = compPart.split('\n').map(l => l.trim()).filter(Boolean);

        // Pattern is usually [Name]\n[Quantity]
        for (let i = 0; i < lines.length; i += 2) {
            if (lines[i] && lines[i + 1]) {
                composition.push({
                    name: lines[i],
                    quantity: lines[i + 1]
                });
            }
        }
    }

    if (description.includes('Indicaciones:')) {
        const parts = description.split('Indicaciones:');
        const remaining = parts[1];
        if (remaining.includes('Advertencias:')) {
            const subParts = remaining.split('Advertencias:');
            indications = subParts[0].trim().split('\n').map(s => s.trim()).filter(Boolean);
            warnings = subParts[1].trim().split('\n').map(s => s.trim()).filter(Boolean);
        } else {
            indications = remaining.trim().split('\n').map(s => s.trim()).filter(Boolean);
        }
    }

    return {
        id: index + 1,
        name: formattedName,
        image: p.localImagePath,
        category: p.category,
        description: p.description,
        composition: composition,
        indications: indications,
        warnings: warnings,
        pdfPath: p.localPdfPath,
        originalUrl: p.url
    };
});

const content = `export const categories = ${JSON.stringify(categories, null, 4)};

export const products = ${JSON.stringify(transformedProducts, null, 4)};
`;

fs.writeFileSync(OUTPUT_FILE, content);
console.log('mockData.js updated successfully!');
