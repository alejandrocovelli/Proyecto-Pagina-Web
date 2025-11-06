const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const conexion = require("./db/conexion");
const router = require("./router/routes")

const app = express();
app.use(cors());
app.use(router)
app.use(bodyParser.json());
app.use(express.static("public")); // sirve archivos estáticos (HTML, JS, etc.)

app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));