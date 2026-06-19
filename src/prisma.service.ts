import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.js";
const adapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    connectionLimit: 5,
    user: "root",
    password: "rootpass",
    database: "mysql_db",
});

export const prisma = new PrismaClient({ adapter });

export default prisma;