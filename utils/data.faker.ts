import { Faker } from "@faker-js/faker";
import { IdProvider, OrderItemOptions, OrderOptions } from "../types";

export default (faker: Faker) => ({

    customer: () => {
        const fn = faker.person.firstName()
        const ln = faker.person.lastName()
        return {
            first_name: fn,
            last_name: ln,
            email: faker.internet.email({ firstName: fn, lastName: ln }).toLowerCase(),
            phone: faker.phone.number(),
            zip_code: faker.location.zipCode(),
            city: faker.location.city(),
            state: faker.location.state(),
            address: faker.location.streetAddress(),
        }
    },

    employee: (options: { hasManager: boolean, managerId?: number, managerIds?: number[] } = { hasManager: false }) => {
        const fn = faker.person.firstName()
        const ln = faker.person.lastName()
        return {
            first_name: fn,
            last_name: ln,
            email: faker.internet.email({ firstName: fn, lastName: ln }).toLowerCase(),
            job_title: faker.person.jobTitle(),
            hire_date: faker.date.past(),
            manager_id: options.hasManager ? options.managerId ?? choice(options.managerIds!) : undefined,
            zip_code: faker.location.zipCode(),
            city: faker.location.city(),
            state: faker.location.state(),
            address: faker.location.streetAddress(),
        }
    },
    supplier: () => {
        return {
            name: faker.company.name(),
            contact_person: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            phone: faker.phone.number(),
            zip_code: faker.location.zipCode(),
            city: faker.location.city(),
            state: faker.location.state(),
            address: faker.location.streetAddress(),
        }
    },

    store: () => {
        return {
            name: faker.company.name(),
            phone: faker.phone.number(),
            email: faker.internet.email().toLowerCase(),
            zip_code: faker.location.zipCode(),
            city: faker.location.city(),
            state: faker.location.state(),
            address: faker.location.streetAddress(),
        }
    },

    product: ({ supplierIds }: { supplierIds: number[] }) => {
        return {
            name: faker.commerce.productName(),
            category: faker.commerce.department(),
            retail_price: faker.commerce.price({ min: 1, max: 1000 }),
            supplier_price: faker.commerce.price({ min: 0.5, max: 800 }),
            supplier_id: choice(supplierIds)

        }
    },
    order: ({ status, customer, employee, store }: OrderOptions) => {
        return {
            order_date: faker.date.past(),
            status: status ? (typeof status === "string" ? status : choice(status)) : choice(['Pending', 'Processing', 'Completed']),
            customer_id: choiceId(customer),
            store_id: choiceId(store),
            employee_id: choiceId(employee)
        }
    },
    orderItem: ({ product, order }: OrderItemOptions) => {
        return {
            quantity: faker.number.int({ min: 1, max: 10 }),
            unit_price: faker.commerce.price({ min: 1, max: 1000 }),
            product_id: choiceId(product),
            order_id: choiceId(order)
        }
    }
})


const choice = (list: any[]) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex]
}

const choiceId = (id: IdProvider) => typeof id == "number" ? id : choice(id)

