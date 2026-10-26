import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    database: "worldofmontague",
    username: "postgres",
    password: "My_P_Pass1",
    synchronize: false,
    logging: true
})