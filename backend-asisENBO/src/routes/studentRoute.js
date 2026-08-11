const express = require("express");
const router = express.Router();

const {
    getAllStudents,
    getStudentByIdController,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// Obtener todos los estudiantes
router.get("/StudentAll", getAllStudents);

// Obtener estudiante por ID
router.get("/StudentById/:id", getStudentByIdController);

// Crear estudiante
router.post("/CreateStudent", createStudent);

// Actualizar estudiante
router.put("/UpdateStudent/:id", updateStudent);

// Eliminar estudiante
router.delete("/DeleteStudent/:id", deleteStudent);

module.exports = router;