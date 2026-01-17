
import fs from 'fs';
import path from 'path';

const formatName = (slug) => {
    if (!slug) return '';
    return slug
        .split('-')
        .map(word => {
            if (word.length === 0) return '';
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

const files = ['src/data/products.json', 'src/data/products-with-images.json'];

files.forEach(file => {
    const filePath = path.resolve(file);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const updatedData = data.map(p => ({
            ...p,
            name: formatName(p.name)
        }));
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        console.log(`Updated ${file}`);
    }
});
