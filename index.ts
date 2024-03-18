import { PrismaClient } from '@prisma/client'
import { fakerFR as faker } from '@faker-js/faker';
import DataFaker from './utils/data.faker';
import { runSeeder } from './utils/data.seeder';
import { SeederOptions } from './types';

const prisma = new PrismaClient()

const seedersOptions: SeederOptions = {
    customers: { size: 100 },
    stores: { size: 100 },
    suppliers: { size: 100 },
    products: { size: 100 },
    employees: { size: 25, managerSize: 2 },
    orders: { size: 200, itemsMaxSize: 10 },
    reset: false
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
