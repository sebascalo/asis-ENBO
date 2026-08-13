const { 
    attendanceCreate, 
    attendanceUpdate, 
    attendanceDelete, 
    getAttendanceById, 
    attendanceGetAll 
} = require("../services/attendanceService");
const Response = require("../functions/response");

// Obtener todas las asistencias
const getAllAttendances = async (req, res) => {
    try {
        const attendances = await attendanceGetAll();
        const response = new Response("Registros de asistencias obtenidos exitosamente", attendances, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllAttendances:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Obtener una asistencia por ID
const getAttendanceByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        
        if (!id) {
            errors.push("El ID de la asistencia es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al obtener la asistencia", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        const attendance = await getAttendanceById(id);
        var response = new Response(`Asistencia ${id} obtenida exitosamente`, attendance, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAttendanceByIdController:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Crear una nueva asistencia
const createAttendance = async (req, res) => {
    try {
        const { name, status, date, hasExcuse, observacion } = req.body;
        
        var errors = [];

        // Validaciones
        if (!name) {
            errors.push("El nombre del estudiante es obligatorio");
        }
        if (!status || !['presente', 'ausente'].includes(status)) {
            errors.push("El estado es obligatorio y debe ser 'presente' o 'ausente'");
        }

        // Validación: si tiene excusa, la observación es obligatoria
        if (hasExcuse && !observacion) {
            errors.push("La observación es obligatoria cuando el estudiante tiene excusa");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear la asistencia", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = { 
            name,
            status,
            date: date || new Date().toISOString().split('T')[0],
            hasExcuse: hasExcuse || false,
            observacion: observacion || null
        };
        
        const attendance = await attendanceCreate(data);
        var response = new Response("Asistencia creada exitosamente", attendance, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createAttendance:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Actualizar una asistencia
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, date, hasExcuse, observacion } = req.body;
        
        var errors = [];

        if (!id) {
            errors.push("El ID de la asistencia es obligatorio");
        }
        if (status && !['presente', 'ausente'].includes(status)) {
            errors.push("El estado debe ser 'presente' o 'ausente'");
        }

        // Validación: si tiene excusa, la observación es obligatoria
        if (hasExcuse && !observacion) {
            errors.push("La observación es obligatoria cuando el estudiante tiene excusa");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar la asistencia", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {};
        if (name) data.name = name;
        if (status) data.status = status;
        if (date) data.date = date;
        if (hasExcuse !== undefined) data.hasExcuse = hasExcuse;
        if (observacion !== undefined) data.observacion = observacion;
        
        const attendance = await attendanceUpdate(id, data);
        var response = new Response(`Asistencia ${id} actualizada exitosamente`, attendance, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateAttendance:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Eliminar una asistencia
const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        
        if (!id) {
            errors.push("El ID de la asistencia es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al eliminar la asistencia", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        await attendanceDelete(id);
        var response = new Response(`Asistencia ${id} eliminada exitosamente`, { id }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteAttendance:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getAllAttendances,
    getAttendanceByIdController,
    createAttendance,
    updateAttendance,
    deleteAttendance
};