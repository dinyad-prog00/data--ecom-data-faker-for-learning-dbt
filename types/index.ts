export type IdProvider = number | number[]
export type StatusProvider = string | string[]

export interface OrderOptions {
    status?: StatusProvider
    customer: IdProvider
    store: IdProvider
    employee: IdProvider
}

export interface OrderItemOptions {
    product: IdProvider
    order: IdProvider
}

export interface ModelSeedOptions {
    size: number
}

export interface ProductSeedOptions extends ModelSeedOptions {
    suppliersId: number[]
}

export interface EmployeeSeedOptions extends ModelSeedOptions {
    managerSize: number
}

export interface OrderSeedOptions extends ModelSeedOptions {
    itemsMaxSize: number
}

export interface SeederOptions {
    customers: ModelSeedOptions
    suppliers: ModelSeedOptions,
    stores: ModelSeedOptions,
    products: ModelSeedOptions,
    employees: EmployeeSeedOptions
    orders : OrderSeedOptions
    reset : boolean
}