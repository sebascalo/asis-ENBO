const attendance = require('../models/attendanceModel');

// crear asistencia
const attendanceCreate = async (data) => {
    try {
        const newAttendance = await attendance.create(data);
        return newAttendance;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener todas las asistencias
const attendanceGetAll = async () => {
    try {
        const attendances = await attendance.findAll();
        return attendances;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener asistencia por id
const getAttendanceById = async (id) => {
    try {
        const attendanceId = await attendance.findOne({ where: { id } });
        return attendanceId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// eliminar asistencia
const attendanceDelete = async (id) => {
    try {
        const attendanceDelete = await attendance.destroy({ where: { id } });
        return attendanceDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// actualizar asistencia
const attendanceUpdate = async (id, data) => {
    try {
        const attendanceToUpdate = await attendance.findOne({ where: { id } });
        if (!attendanceToUpdate) {
            return null;
        }
        await attendanceToUpdate.update(data);
        return attendanceToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    attendanceCreate,
    attendanceGetAll,
    getAttendanceById,
    attendanceDelete,
    attendanceUpdate
}