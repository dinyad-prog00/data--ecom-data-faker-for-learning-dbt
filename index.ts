import { PrismaClient } from '@prisma/client'
import { fakerFR as faker } from '@faker-js/faker';
import { runSeeder } from './utils/data.seeder';
import { SeederOptions } from './types';

const prisma = new PrismaClient()

const seedersOptions: SeederOptions = {
    customers: { size: 8000 },
    stores: { size: 100 },
    suppliers: { size: 100 },
    products: { size: 5000 },
    employees: { size: 200, managerSize: 10 },
    orders: { size: 10000, itemsMaxSize: 10 },
    reset: true
}

async function main() {

    await runSeeder(faker, seedersOptions)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
