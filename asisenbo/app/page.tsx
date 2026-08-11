import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full bg-green-50 m-0 p-5">
            <h1 className="text-6xl font-bold text-green-900 mb-4 text-center">
                Bienvenido a asisENBO
            </h1>
            <p className="text-2xl text-green-700 mb-10 text-center">
                Sistema de gestión de asistencias para aprendices
            </p>
            <Link href="/dashboard">
                <button className="bg-green-700 text-white border-none py-4 px-14 text-xl font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:bg-green-900 hover:scale-105">
                    Haz clic para empezar
                </button>
            </Link>
        </div>
    );
}