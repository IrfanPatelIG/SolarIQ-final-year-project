import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false, // false bcz don't want SQL logs
    }
);

// Test connection
export const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connected Successfully")
    } catch (error) {
        console.error("Database connected failed!: ", error.message)
    }
}

export default sequelize;