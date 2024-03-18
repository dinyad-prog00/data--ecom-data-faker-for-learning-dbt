import { Faker } from "@faker-js/faker";
import { PrismaClient } from '@prisma/client'
import { ModelSeedOptions, SeederOptions } from "../types";
import DataFaker from "./data.faker";

const defaultSeesOptions: SeederOptions = {
    customers: { size: 100 },
    stores: { size: 100 },
    suppliers: { size: 100 },
    products: { size: 100 },
    employees: { size: 25, managerSize: 2 },
    orders: { size: 200, itemsMaxSize: 10 },
    reset: true
}

export const runSeeder = async (faker: Faker, { customers, stores, suppliers, products, employees, orders, reset }: SeederOptions = defaultSeesOptions) => {
    const prisma = new PrismaClient()
    const dataFaker = DataFaker(faker)

    const seedCustomers = async () => {
        const ids: number[] = []
        for (let _ = 0; _ < customers.size; _++) {

            const customerData = dataFaker.customer()
            const customer = await prisma.customer.create({ data: customerData })
            ids.push(customer.id)
        }

        return ids;
    }

    const seedStores = async () => {
        const ids: number[] = []
        for (let _ = 0; _ < stores.size; _++) {

            const storeData = dataFaker.store()
            const store = await prisma.store.create({ data: storeData })
            ids.push(store.id)
        }

        return ids;
    }

    const seedSuppliers = async () => {
        const ids: number[] = []
        for (let _ = 0; _ < suppliers.size; _++) {

            const supplierData = dataFaker.supplier()
            const supplier = await prisma.supplier.create({ data: supplierData })
            ids.push(supplier.id)
        }

        return ids;
    }

    const seedProducts = async (supplierIds: number[]) => {
        const ids: number[] = []
        for (let _ = 0; _ < products.size; _++) {

            const productData = dataFaker.product({ supplierIds })
            const product = await prisma.product.create({ data: productData })
            ids.push(product.id)
        }

        return ids;
    }

    const seedEmployees = async () => {
        const managerIds: number[] = []
        const ids: number[] = []
        for (let _ = 0; _ < employees.managerSize; _++) {

            const employeeData = dataFaker.employee({ hasManager: false })
            const employee = await prisma.employee.create({ data: employeeData })
            ids.push(employee.id)
            managerIds.push(employee.id)

        }

        for (let _ = 0; _ < employees.size - employees.managerSize; _++) {

            const employeeData = dataFaker.employee({ hasManager: true, managerIds })
            const employee = await prisma.employee.create({ data: employeeData })
            ids.push(employee.id)
        }

        return ids;
    }

    const seedOrders = async (customersIds: number[], storesIds: number[], employeesIds: number[], productsIds: number[]) => {
        const ids: number[] = []
        for (let _ = 0; _ < orders.size; _++) {

            const orderData = dataFaker.order({ customer: customersIds, store: storesIds, employee: employeesIds })
            const order = await prisma.order.create({ data: orderData })
            //Insert order items
            const nbItemps = Math.floor(Math.random() * orders.itemsMaxSize) + 1;

            for (let _ = 0; _ < nbItemps; _++) {
                const itemData = dataFaker.orderItem({ product: productsIds, order: order.id })
                await prisma.orderItem.create({ data: itemData })
            }

            ids.push(order.id)
        }

        return ids;
    }



    if (reset) {
        console.log("Cleaning database...")
        await prisma.orderItem.deleteMany()
        await prisma.order.deleteMany()
        await prisma.product.deleteMany()
        await prisma.store.deleteMany()
        await prisma.supplier.deleteMany()
        await prisma.customer.deleteMany()
        await prisma.employee.deleteMany()
        console.info("Cleaning done.")
    }
    console.info("Seeding database...")

    const customerIds = await seedCustomers()
    const storesIds = await seedStores()
    const suppliersIds = await seedSuppliers()
    const productsIds = await seedProducts(suppliersIds)
    const employeesIds = await seedEmployees()
    const ordersId = await seedOrders(customerIds, storesIds, employeesIds, productsIds)

    console.info("Seeding done.")



}

