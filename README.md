
# E-commerce Data Faker for Learning dbt

This repository provides a data faker tool designed for learning dbt (Data Build Tool) with simulated e-commerce data. It allows users to generate synthetic data for an e-commerce database to aid in learning and testing.

## Overview

The tool is built using TypeScript and leverages the faker-js library to generate realistic data across various entities such as customers, employees, suppliers, products, stores, orders, and order items. The generated data follows predefined schemas and can be used to populate a database for educational purposes or to test dbt models.

![Giagramme](images/prisma-erd.svg)

## Installation

To use this tool, ensure you have Node.js installed on your machine. Then, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running:

   ```
   npm install
   ```
## Database

This tool is designed to work with databases compatible with Prisma, including PostgreSQL, MySQL, SQLite, etc. Ensure you have the necessary database drivers installed and configured based on your chosen database system. The Prisma schema included in the repository defines the database schema. You can setup your database in `.env` file following Prisma format.


## Usage

After installation, you can run the data faker and seeder by executing the following command:

```
npm start
```

This will generate synthetic data based on the specified options and seed it into your database.

## Configuration

The tool provides various options to customize the generated data, including:

- **Size**: Define the number of records to generate for each entity.
- **Manager Size**: Specify the number of employees to act as managers.
- **Items Max Size**: Set the maximum number of items per order.
- **Reset**: Control whether to reset the database before seeding new data.

These options can be adjusted in the `index.ts` file under `seedersOptions`.


## Contributors

- [Donatien YETO](https://github.com/dinyad-prog00)

## License

This project is licensed under the [MIT License](LICENSE).
