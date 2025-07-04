"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availableDate, setAvailableDate] = useState("");
    const [availableTimes, setAvailableTimes] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch("/api/doctors/fetch-appointments");
                if (!res.ok) {
                    throw new Error("Unauthorized or failed to fetch");
                }
                const data = await res.json();
                setAppointments(data.appointments || []);
            } catch (err) {
                console.error("Failed to fetch doctor appointments:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleAddSlot = async () => {
        try {
            const timesArray = availableTimes.split(",").map((t) => t.trim());
            const res = await fetch("/api/doctors/add-slot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: availableDate,
                    times: timesArray,
                }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Slot added successfully!");
                setIsModalOpen(false);
                setAvailableDate("");
                setAvailableTimes("");
            } else {
                alert("Failed to add slot");
            }
        } catch (err) {
            console.error("Failed to add slot:", err);
        }
    };

    return (
        <>
            <Header />
            <div className="px-6 py-10 min-h-[70vh] bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-center w-full">
                        Doctor Appointments
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#EC7FA9] hover:bg-pink-500 text-white px-4 py-2 rounded-md min-w-max"
                    >
                        Add Available Slot
                    </button>
                </div>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : appointments.length === 0 ? (
                    <p className="text-center text-gray-500">No appointments found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appointments.map((appt) => (
                            <div
                                key={appt._id}
                                className="bg-white shadow rounded-lg p-4 border border-gray-200"
                            >
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                    Patient: {appt.patientInfo?.name || "N/A"}
                                </h2>
                                <p className="text-sm text-gray-500 mb-1">
                                    Email: {appt.patientInfo?.email}
                                </p>
                                <p className="text-sm text-gray-500 mb-1">
                                    Phone: {appt.patientInfo?.phone || "N/A"}
                                </p>
                                <p className="text-sm text-gray-500 mb-1">
                                    Date: {new Date(appt.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500 mb-1">Time: {appt.time}</p>
                                <p className="text-sm text-gray-500 mb-1">
                                    Location: {appt.location || "N/A"}
                                </p>
                                <p className="text-sm text-gray-500 mb-1">
                                    Status: <span className="capitalize">{appt.status}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-lg font-bold mb-4">Add Available Slot</h2>
                            <label className="block mb-2 text-sm font-medium">Date:</label>
                            <input
                                type="date"
                                value={availableDate}
                                onChange={(e) => setAvailableDate(e.target.value)}
                                className="w-full border px-3 py-2 rounded-md mb-4"
                            />
                            <label className="block mb-2 text-sm font-medium">
                                Time Slots (comma separated):
                            </label>
                            <input
                                type="text"
                                value={availableTimes}
                                onChange={(e) => setAvailableTimes(e.target.value)}
                                placeholder="e.g. 10:00 AM, 11:00 AM"
                                className="w-full border px-3 py-2 rounded-md mb-4"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddSlot}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
