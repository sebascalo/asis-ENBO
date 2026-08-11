const { 
    studentCreate, 
    studentUpdate, 
    studentDelete, 
    getStudentById, 
    studentGetAll 
} = require("../services/studentService");
const Response = require("../functions/response");

// Obtener todos los estudiantes
const getAllStudents = async (req, res) => {
    try {
        const students = await studentGetAll();
        const response = new Response("Registros de estudiantes obtenidos exitosamente", students, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllStudents:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Obtener un estudiante por ID
const getStudentByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        
        if (!id) {
            errors.push("El ID del estudiante es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al obtener el estudiante", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        const student = await getStudentById(id);
        var response = new Response(`Estudiante ${id} obtenido exitosamente`, student, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getStudentByIdController:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Crear un nuevo estudiante
const createStudent = async (req, res) => {
    try {
        const { name, lastName, documentType, documentNumber } = req.body;
        
        var errors = [];

        // Validaciones
        if (!name || name.trim() === "") {
            errors.push("El nombre es obligatorio");
        }
        if (!lastName || lastName.trim() === "") {
            errors.push("El apellido es obligatorio");
        }
        if (!documentType || !['CC', 'CE', 'TI', 'PASAPORTE', 'OTRO'].includes(documentType)) {
            errors.push("El tipo de documento es obligatorio y debe ser CC, CE, TI, PASAPORTE o OTRO");
        }
        if (!documentNumber || documentNumber.trim() === "") {
            errors.push("El número de documento es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el estudiante", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = { 
            name, 
            lastName, 
            documentType, 
            documentNumber 
        };
        
        const student = await studentCreate(data);
        var response = new Response("Estudiante creado exitosamente", student, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createStudent:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Actualizar un estudiante
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, documentType, documentNumber } = req.body;
        
        var errors = [];

        if (!id) {
            errors.push("El ID del estudiante es obligatorio");
        }
        if (documentType && !['CC', 'CE', 'TI', 'PASAPORTE', 'OTRO'].includes(documentType)) {
            errors.push("El tipo de documento debe ser CC, CE, TI, PASAPORTE o OTRO");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el estudiante", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {};
        if (name) data.name = name;
        if (lastName) data.lastName = lastName;
        if (documentType) data.documentType = documentType;
        if (documentNumber) data.documentNumber = documentNumber;
        
        const student = await studentUpdate(id, data);
        var response = new Response(`Estudiante ${id} actualizado exitosamente`, student, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateStudent:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Eliminar un estudiante
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        
        if (!id) {
            errors.push("El ID del estudiante es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el estudiante", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        await studentDelete(id);
        var response = new Response(`Estudiante ${id} eliminado exitosamente`, { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteStudent:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getAllStudents,
    getStudentByIdController,
    createStudent,
    updateStudent,
    deleteStudent
};