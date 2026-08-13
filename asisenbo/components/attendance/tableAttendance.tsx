"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Attendance {
  id: number;
  name: string;
  date: string;
  status: string;
  hasExcuse: boolean;
  observacion: string | null;
  createdAt: string;
}

export default function ListAttendances() {
  const router = useRouter();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados para el modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState<Attendance | null>(
    null,
  );
  const [editStatus, setEditStatus] = useState("");
  const [editHasExcuse, setEditHasExcuse] = useState("no");
  const [editObservacion, setEditObservacion] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/attendance/AttendanceAll",
      );
      const data = await response.json();
      setAttendances(data.info || data.data || []);
    } catch (error) {
      console.error("Error:", error);
      setError("Error al cargar las asistencias");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta asistencia?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/attendance/DeleteAttendance/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setAttendances(attendances.filter((att: any) => att.id !== id));
        alert("✅ Asistencia eliminada");
      } else {
        alert("❌ Error al eliminar");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error de conexión");
    }
  };

  // Abrir modal de edición
  const openEditModal = (attendance: Attendance) => {
    setEditingAttendance(attendance);
    setEditStatus(attendance.status);
    setEditHasExcuse(attendance.hasExcuse ? "si" : "no");
    setEditObservacion(attendance.observacion || "");
    setEditError("");
    setEditSuccess("");
    setIsEditModalOpen(true);
  };

  // Cerrar modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingAttendance(null);
    setEditError("");
    setEditSuccess("");
  };

  // Actualizar asistencia
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    setEditSuccess("");

    // Validar: si tiene excusa, observación obligatoria
    if (editHasExcuse === "si" && !editObservacion.trim()) {
      setEditError("La observación es obligatoria cuando tiene excusa");
      setEditLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/attendance/UpdateAttendance/${editingAttendance?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: editStatus,
            hasExcuse: editHasExcuse === "si",
            observacion: editHasExcuse === "si" ? editObservacion : null,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setEditSuccess("✅ Asistencia actualizada");

        // Actualizar la lista
        setAttendances(
          attendances.map((att: any) =>
            att.id === editingAttendance?.id
              ? {
                  ...att,
                  status: editStatus,
                  hasExcuse: editHasExcuse === "si",
                  observacion: editHasExcuse === "si" ? editObservacion : null,
                }
              : att,
          ),
        );

        setTimeout(() => {
          closeEditModal();
        }, 1500);
      } else {
        setEditError(data.message || "Error al actualizar");
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
          Cargando asistencias...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow border border-border">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">
          Lista de Asistencias
        </h2>
        <button
          onClick={() => router.push("/dashboard/attendance/formAttendances")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Registrar Asistencia
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-2-navbar text-black">
            <th className="border border-border px-4 py-2 text-center">ID</th>
            <th className="border border-border px-4 py-2 text-center">
              Estudiante
            </th>
            <th className="border border-border px-4 py-2 text-center">
              Fecha
            </th>
            <th className="border border-border px-4 py-2 text-center">
              Estado
            </th>
            <th className="border border-border px-4 py-2 text-center">
              Excusa
            </th>
            <th className="border border-border px-4 py-2 text-center">
              Observación
            </th>
            <th className="border border-border px-4 py-2 text-center">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {attendances.length > 0 ? (
            attendances.map((attendance: any) => (
              <tr
                key={attendance.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="border border-border px-4 py-2 text-center">
                  {attendance.id}
                </td>
                <td className="border border-border px-4 py-2 text-center font-medium">
                  {attendance.name || "Sin nombre"}
                </td>
                <td className="border border-border px-4 py-2 text-center">
                  {new Date(attendance.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </td>
                <td className="border border-border px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-bold ${
                      attendance.status === "presente"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {attendance.status === "presente"
                      ? "✅ Presente"
                      : "❌ Ausente"}
                  </span>
                </td>
                <td className="border border-border px-4 py-2 text-center">
                  {attendance.status === "presente" ? (
                    <span className="text-gray-400">-</span>
                  ) : attendance.hasExcuse ? (
                    <span className="px-2 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                      ✅ Sí
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-sm font-bold bg-gray-100 text-gray-600">
                      ❌ No
                    </span>
                  )}
                </td>
                <td className="border border-border px-4 py-2 text-center text-sm">
                  {attendance.status === "presente"
                    ? "-"
                    : attendance.observacion || "-"}
                </td>
                <td className="border border-border px-4 py-2 text-center">
  <div className="flex justify-center gap-2">
    <button
      onClick={() => openEditModal(attendance)}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center shadow-sm"
      title="Editar"
    >
      <Pencil size={18} />
    </button>
    <button
      onClick={() => handleDelete(attendance.id)}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center shadow-sm"
      title="Eliminar"
    >
      <Trash2 size={18} />
    </button>
  </div>
</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="border border-border px-4 py-6 text-center text-gray-500"
              >
                No hay asistencias registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL DE EDICIÓN */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">
                Editar Asistencia
              </h3>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {editError && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4">
                  ⚠️ {editError}
                </div>
              )}

              {editSuccess && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg mb-4">
                  ✅ {editSuccess}
                </div>
              )}

              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditStatus(value);
                      if (value === "presente") {
                        setEditHasExcuse("no");
                        setEditObservacion("");
                      }
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="presente">✅ Presente</option>
                    <option value="ausente">❌ Ausente</option>
                  </select>
                </div>

                {editStatus === "ausente" && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Tiene excusa?
                    </label>
                    <select
                      value={editHasExcuse}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEditHasExcuse(value);
                        if (value === "no") {
                          setEditObservacion("");
                        }
                      }}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="no">No tiene excusa</option>
                      <option value="si">Tiene excusa</option>
                    </select>

                    {editHasExcuse === "si" && (
                      <div className="mt-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Observación *
                        </label>
                        <textarea
                          value={editObservacion}
                          onChange={(e) => setEditObservacion(e.target.value)}
                          required
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                          placeholder="Ej: Estudiante enfermo, llegó tarde, etc."
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 transition"
                  >
                    {editLoading ? "Actualizando..." : "Actualizar Asistencia"}
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
