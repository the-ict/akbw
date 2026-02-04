import { prisma } from '../src/db/client.js';

async function main() {
    await prisma.categories.createMany({
        data: [
            { name: { uz: 'T-Shirts', ru: 'Футболки', en: 'T-Shirts' } },
            { name: { uz: 'Outerwear', ru: 'Верхняя одежда', en: 'Outerwear' } },
            { name: { uz: 'Shoes', ru: 'Обувь', en: 'Shoes' } },
            { name: { uz: 'Pants', ru: 'Брюки', en: 'Pants' } },
        ],
    });

    await prisma.sizes.createMany({
        data: [
            { name: 'XS' },
            { name: 'S' },
            { name: 'M' },
            { name: 'L' },
            { name: 'XL' },
        ],
    });

    await prisma.colors.createMany({
        data: [
            { name: 'Black' },
            { name: 'White' },
            { name: 'Red' },
            { name: 'Blue' },
        ],
    });

    // Create default access types
    await prisma.access.createMany({
        data: [
            { name: 'ko\'rish' },
            { name: 'yaratish' },
            { name: 'o\'zgartirish' },
            { name: 'o\'chirish' },
        ]
    });

    console.log('Seed data created successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
