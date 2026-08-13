"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Student {
    id: string;
    name: string;
    lastName: string;
    documentNumber?: string;
}

export default function CreateAttendance() {
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        name: "",      
        status: "presente",
        date: "",
        hasExcuse: "no",
        observacion: ""
    });
    
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Obtener la fecha local actual sin usar toISOString()
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const localDate = `${year}-${month}-${day}`;

        setFormData(prev => ({ ...prev, date: localDate }));
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/student/StudentAll');
            const data = await response.json();
            const studentsList = data.info || data.students || data;
            setStudents(Array.isArray(studentsList) ? studentsList : []);
        } catch (error) {
            console.error('Error:', error);
            setError("Error al cargar los estudiantes");
        } finally {
            setLoadingStudents(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'status' && value === 'presente') {
            setFormData(prev => ({ ...prev, hasExcuse: 'no', observacion: '' }));
        }
        if (name === 'hasExcuse' && value === 'no') {
            setFormData(prev => ({ ...prev, observacion: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name) {
            setError("Por favor seleccione un aprendiz");
            return;
        }

        if (formData.hasExcuse === 'si' && !formData.observacion.trim()) {
            setError("Debe escribir la observación cuando el aprendiz tiene excusa");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch('http://localhost:3000/api/attendance/CreateAttendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,              // ✅ Enviar el nombre
                    status: formData.status,
                    date: formData.date,
                    hasExcuse: formData.hasExcuse === 'si',
                    observacion: formData.observacion || null
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("✅ Asistencia registrada correctamente");
                
                setFormData({
                    name: "",
                    status: "presente",
                    date: new Date().toISOString().split('T')[0],
                    hasExcuse: "no",
                    observacion: ""
                });

                setTimeout(() => {
                    router.push('/dashboard/attendance/listAttendances');
                }, 2000);
            } else {
                setError(data.message || "Error al registrar asistencia");
            }
            
        } catch (error) {
            console.error('Error:', error);
            setError("Error de conexión al servidor");
        } finally {
            setLoading(false);
        }
    };

    const goToList = () => router.push('/dashboard/attendance/listAttendances');
    const goToCreateStudent = () => router.push('/dashboard/students/formStudents');

    return (
        <div className="min-h-screen">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Crear Asistencia</h2>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4">
                        ⚠️ {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg mb-4">
                        ✅ {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Aprendiz 
                        </label>
                        
                        {loadingStudents ? (
                            <div className="px-4 py-2.5 border rounded-lg bg-gray-50 text-gray-500">
                                Cargando aprendices...
                            </div>
                        ) : (
                            <>
                                <select
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Seleccione un aprendiz</option>
                                    {students.map((student) => (
                                        <option key={student.id} value={`${student.name} ${student.lastName}`}>
                                            {student.name} {student.lastName}
                                            {student.documentNumber && ` (${student.documentNumber})`}
                                        </option>
                                    ))}
                                </select>

                                {students.length === 0 && (
                                    <p className="text-sm text-amber-600 mt-1">
                                        No hay aprendices registrados.{' '}
                                        <button 
                                            type="button"
                                            onClick={goToCreateStudent}
                                            className="text-blue-600 hover:underline font-semibold"
                                        >
                                            Crear aprendiz
                                        </button>
                                    </p>
                                )}
                            </>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Estado 
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="presente">✅ Presente</option>
                            <option value="ausente">❌ Ausente</option>
                        </select>
                    </div>

                    {formData.status === 'ausente' && (
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Excusa
                            </label>
                            <select
                                name="hasExcuse"
                                value={formData.hasExcuse}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="no">No tiene excusa</option>
                                <option value="si">Tiene excusa</option>
                            </select>

                            {formData.hasExcuse === 'si' && (
                                <div className="mt-3">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Observación
                                    </label>
                                    <textarea
                                        name="observacion"
                                        value={formData.observacion}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                        placeholder="Ej: Excusa médica..."
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Fecha
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={goToList}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-lg transition"
                        >
                            Cancelar
                        </button>
                        
                        <button
                            type="submit"
                            disabled={loading || loadingStudents || students.length === 0}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 transition"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registrando...
                                </span>
                            ) : (
                                "Guardar Asistencia"
                            )}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}