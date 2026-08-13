"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function TableStudents() {
    const router = useRouter();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para el modal de edición
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<any>(null);
    const [editName, setEditName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editDocumentType, setEditDocumentType] = useState("CC");
    const [editDocumentNumber, setEditDocumentNumber] = useState("");
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState("");
    const [editSuccess, setEditSuccess] = useState("");
    
    // Mostrar estudiantes al cargar la página
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/student/StudentAll');
                let resJson = await response.json();
                setStudents(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setStudents([]);
            } finally {
                setLoading(false);
            }
        }
        fetchStudents();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este aprendiz?')) return;
        try {
            const response = await fetch(`http://localhost:3000/api/student/DeleteStudent/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setStudents(students.filter((student: any) => student.id !== id));
                alert('✅ Aprendiz eliminado');
            } else {
                alert('❌ Error al eliminar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error de conexión');
        }
    };

    // Abrir modal de edición
    const openEditModal = (student: any) => {
        setEditingStudent(student);
        setEditName(student.name);
        setEditLastName(student.lastName);
        setEditDocumentType(student.documentType);
        setEditDocumentNumber(student.documentNumber);
        setEditError("");
        setEditSuccess("");
        setIsEditModalOpen(true);
    };

    // Cerrar modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingStudent(null);
        setEditError("");
        setEditSuccess("");
    };

    // Actualizar estudiante
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditLoading(true);
        setEditError("");
        setEditSuccess("");

        try {
            const response = await fetch(`http://localhost:3000/api/student/UpdateStudent/${editingStudent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editName,
                    lastName: editLastName,
                    documentType: editDocumentType,
                    documentNumber: editDocumentNumber
                }),
            });

            const resJson = await response.json();

            if (response.ok) {
                setEditSuccess("✅ Estudiante actualizado");
                
                // Actualizar la lista
                setStudents(students.map((student: any) => 
                    student.id === editingStudent.id 
                        ? { ...student, name: editName, lastName: editLastName, documentType: editDocumentType, documentNumber: editDocumentNumber }
                        : student
                ));
                
                setTimeout(() => {
                    closeEditModal();
                }, 1500);
            } else {
                setEditError(resJson.message || "Error al actualizar");
            }
        } catch (error) {
            setEditError("Error de conexión");
        } finally {
            setEditLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-4 bg-white rounded-lg shadow border border-border">
                <div className="text-center py-8 text-gray-600">
                    Cargando estudiantes...
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">
                    Lista de Aprendices
                </h2>
                <button
                    onClick={() => router.push('/dashboard/students/formStudents')}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                >
                    <Plus size={16} />
                    Aprendiz
                </button>
            </div>

            <table className="w-full border-collapse">

                <thead>
                    <tr className="bg-green-2-navbar text-black">
                        <th className="border border-border px-4 py-2 text-center text-black">ID</th>
                        <th className="border border-border px-4 py-2 text-center text-black">Nombre</th>
                        <th className="border border-border px-4 py-2 text-center text-black">Apellido</th>
                        <th className="border border-border px-4 py-2 text-center text-black">Tipo Documento</th>
                        <th className="border border-border px-4 py-2 text-center text-black">Número Documento</th>
                        <th className="border border-border px-4 py-2 text-center text-black">Fecha Registro</th>
                        <th className="border border-border px-4 py-2 text-center text-black">Opciones</th>
                    </tr>
                </thead>

                <tbody>
                    {students.length > 0 ? (
                        students.map((student: any) => (
                            <tr key={student.id} className="hover:bg-fond transition-colors">
                                <td className="border border-border px-4 py-2 text-black text-center">{student.id}</td>
                                <td className="border border-border px-4 py-2 text-black text-center">{student.name}</td>
                                <td className="border border-border px-4 py-2 text-black text-center">{student.lastName}</td>
                                <td className="border border-border px-4 py-2 text-black text-center">{student.documentType}</td>
                                <td className="border border-border px-4 py-2 text-black text-center">{student.documentNumber}</td>
                                <td className="border border-border px-4 py-2 text-black text-center">
                                    {new Date(student.createdAt).toLocaleDateString('es-ES')}
                                </td>
                                <td className="border border-border px-4 py-2 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => openEditModal(student)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1 px-3 rounded transition-colors text-sm"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition-colors text-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="border border-border px-4 py-6 text-center text-black">
                                No hay aprendices registrados.
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

            {/* MODAL DE EDICIÓN */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        
                        {/* Header del modal */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800">
                                Editar Aprendiz
                            </h3>
                        </div>

                        {/* Cuerpo del modal */}
                        <div className="p-6">
                            {editError && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4">
                                    {editError}
                                </div>
                            )}

                            {editSuccess && (
                                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg mb-4">
                                    {editSuccess}
                                </div>
                            )}

                            <form onSubmit={handleUpdate}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-800"
                                            placeholder="Nombre"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Apellido
                                        </label>
                                        <input
                                            type="text"
                                            value={editLastName}
                                            onChange={(e) => setEditLastName(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-800"
                                            placeholder="Apellido"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Tipo Documento
                                        </label>
                                        <select
                                            value={editDocumentType}
                                            onChange={(e) => setEditDocumentType(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-800 bg-white"
                                        >
                                            <option value="CC">Cédula de Ciudadanía</option>
                                            <option value="CE">Cédula de Extranjería</option>
                                            <option value="TI">Tarjeta de Identidad</option>
                                            <option value="PASAPORTE">Pasaporte</option>
                                            <option value="OTRO">Otro</option>
                                        </select>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Número Documento
                                        </label>
                                        <input
                                            type="text"
                                            value={editDocumentNumber}
                                            onChange={(e) => setEditDocumentNumber(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-800"
                                            placeholder="Número de documento"
                                        />
                                    </div>
                                </div>

                                {/* Botones del modal */}
                                <div className="flex gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-lg transition-all duration-200"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={editLoading}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {editLoading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Actualizando...
                                            </span>
                                        ) : (
                                            "Actualizar Aprendiz"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}