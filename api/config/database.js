import { Sequelize } from "sequelize"
import dotenv from 'dotenv';
dotenv.config();
console.log("🧩 ENV:", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_DIALECT: process.env.DB_DIALECT,
});

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

export const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("✅ Conexión a la base de datos establecida correctamente.")
        // Las asociaciones se configuran automáticamente cuando se cargan los modelos
        // No necesitamos llamarlas manualmente aquí
    } catch (error) {
        console.log("🚀 ~ connectDB ~ error:", error)
    }
}
