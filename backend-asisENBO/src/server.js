const express = require("express");

const cors = require("cors");
//rutas
const attendanceRoutes = require("./routes/attendanceRoute");
const studentRoutes = require("./routes/studentRoute");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
//ruta base
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de asisENBO" });
});

//rutas api
app.use("/api/attendance", attendanceRoutes);
app.use("/api/student", studentRoutes);

// Ruta no encontrada
app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");

  error.status = 404;

  next(error);
});

// Iniciar el servidor
const init = async () => {
  try {
    console.log("Conexión a DB exitosa.");
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();