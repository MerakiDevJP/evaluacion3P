//server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

//MIdd
app.use(cors());
app.use(express.json());

//Conexion a MongoDB
mongoose
  .connect("mongodb://172.17.0.1:27017/centro_odontologico")
  .then(() => console.log("Conectado exitosamente a MongoDB"))
  .catch((err) => console.error(" Error de conexión a MongoDB:", err));

//Esquema y modelo para las visitas
const VisitaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del visitante es obligatorio"],
  },
  motivo: {
    type: String,
    required: [true, "El motivo de la visita es obligatorio"],
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

const Visita = mongoose.model("Visita", VisitaSchema);

//Endpoints
//Crear Visita
app.post("/visitas", async (req, res) => {
  try {
    const { nombre, motivo } = req.body;

    if (!nombre || !motivo) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }

    const nuevaVisita = new Visita({ nombre, motivo });
    await nuevaVisita.save();

    res.status(201).json({
      mensaje: "¡Visita registrada con éxito!",
      visita: nuevaVisita,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hubo un error al guardar la visita en el servidor." });
  }
});

//Mostrar Visitas
app.get("/visitas", async (req, res) => {
  try {
    const visitas = await Visita.find().sort({ fechaRegistro: -1 });
    res.status(200).json(visitas);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hubo un error al obtener las visitas del servidor." });
  }
});

app.listen(PORT, () => {
  console.log(` Servidor backend corriendo en http://localhost:${PORT}`);
});
