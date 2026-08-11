const express = require("express");
const router = express.Router();

const {
    getAllAttendances,
    getAttendanceByIdController,
    createAttendance,
    updateAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");

// Obtener todas las asistencias
router.get("/AttendanceAll", getAllAttendances);

// Obtener asistencia por ID
router.get("/AttendanceById/:id", getAttendanceByIdController);

// Crear asistencia
router.post("/CreateAttendance", createAttendance);

// Actualizar asistencia
router.put("/UpdateAttendance/:id", updateAttendance);

// Eliminar asistencia
router.delete("/DeleteAttendance/:id", deleteAttendance);

module.exports = router;