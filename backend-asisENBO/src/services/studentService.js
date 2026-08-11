const student = require('../models/studentModel');

// crear estudiante
const studentCreate = async (data) => {
    try {
        const newStudent = await student.create(data);
        return newStudent;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener todos los estudiantes
const studentGetAll = async () => {
    try {
        const students = await student.findAll();
        return students;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener estudiante por id
const getStudentById = async (id) => {
    try {
        const studentId = await student.findOne({ where: { id } });
        return studentId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// eliminar estudiante
const studentDelete = async (id) => {
    try {
        const studentDelete = await student.destroy({ where: { id } });
        return studentDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// actualizar estudiante
const studentUpdate = async (id, data) => {
    try {
        const studentToUpdate = await student.findOne({ where: { id } });
        if (!studentToUpdate) {
            return null;
        }
        await studentToUpdate.update(data);
        return studentToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    studentCreate,
    studentGetAll,
    getStudentById,
    studentDelete,
    studentUpdate
}