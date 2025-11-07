import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connectDB } from "./config/database.js";
import router from "./router/index.js";
import { applyAssociations } from "./models/associations.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(router);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: "Error interno del servidor", error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));

connectDB().then(() => {
    applyAssociations(); // ✅ define relaciones
    console.log("✅ Relaciones entre modelos configuradas");
});

export default app;

