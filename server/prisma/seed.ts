import { prisma } from '../src/db/client.js';

async function main() {
    await prisma.categories.createMany({
        data: [
            { name: 'T-Shirts' },
            { name: 'Outerwear' },
            { name: 'Shoes' },
            { name: 'Pants' },
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
