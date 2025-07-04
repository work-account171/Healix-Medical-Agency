"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/appointments/fetch-appointment-by-id");
        const data = await res.json();
        console.log("data: ", data);
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Failed to load appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="px-6 py-10 min-h-[70vh] bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center md:text-left w-full mb-4 md:mb-0">
            My Appointments
          </h1>
          <Link
            href="/appointments/new"
            className="bg-[#EC7FA9] text-white hover:bg-[#BE5985] px-4 py-2 rounded font-medium whitespace-nowrap"
          >
            + Schedule Appointment
          </Link>
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
                  Dr. {appt.doctor?.name || "N/A"}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  Specialization: {appt.doctor?.specialization?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Location: {appt.doctor?.location}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Date: {new Date(appt.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mb-1">Time: {appt.time}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Status: <span className="capitalize">{appt.status}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
