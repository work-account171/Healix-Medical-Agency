"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";

export default function Doctors() {
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);


  useEffect(() => {
    fetch("/api/doctors/fetch-specializations")
      .then((res) => res.json())
      .then((data) => setSpecializations(data.specializations));

    fetch("/api/doctors/fetch-doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data.doctors));
  }, []);

  const filteredDoctors = selectedSpecialization
    ? doctors.filter((doc) => doc.specialization.name === selectedSpecialization)
    : doctors;

  return (
    <>
      <Header />
      <section className="mt-[76px]">
        <SpecializationFilters
          specializations={specializations}
          selected={selectedSpecialization}
          onSelect={setSelectedSpecialization}
        />
        <DoctorGrid doctors={filteredDoctors} />
      </section>
    </>
  );
}

const SpecializationFilters = ({ specializations, selected, onSelect }) => (
  <div className="flex flex-wrap gap-4 px-6 py-4 justify-center">
    {specializations.map((spec) => (
      <button
        key={spec._id}
        className={`flex flex-col items-center p-4 rounded-xl border hover:shadow transition 
          ${
            selected === spec._id
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 bg-white"
          }`}
        onClick={() => onSelect(spec._id)}
      >
        <img src={spec.icon} alt={spec.name} className="w-10 h-10 mb-2" />
        <span className="text-sm font-medium">{spec.name}</span>
      </button>
    ))}
  </div>
);

const DoctorCard = ({ doctor }) => (
  <div className="rounded-[32px] bg-[#EFF6FF] p-6 shadow-sm text-center">
    <div className="flex gap-5 items-center mb-5">
      <img
        src={doctor.profileImage}
        alt={doctor.name}
        className="w-[100px] h-[100px] rounded-full object-cover"
      />
      <div>
        <h3 className="text-base font-medium text-[#222222] underline">
          {doctor.name}
        </h3>
        {doctor.verified && <p className="text-sm text-[#4CA585] font-bold">PMDC Verified</p>}
      </div>
    </div>

    <p className="text-sm text-left text-[#222222] mb-6">{doctor.specialization.name}</p>

    <div className="grid grid-cols-3 gap-x-6 mb-12">
        <p className="text-[#EC7FA9] font-medium text-sm">Reviews</p>
        <p className="text-[#222222] font-normal text-sm">Experience</p>
        <p className="text-[#222222] font-normal text-sm">Satisfaction</p>

        <p className="text-[#222222] font-bold text-sm">{doctor.reviews || 7100}</p>
        <p className="text-[#222222] font-bold text-sm">{doctor.experienceYears || 0}</p>
        <p className="text-[#222222] font-bold text-sm">{doctor.satisfaction || 98}%</p>
    </div>

    <Link href="/appointments" className="bg-[#EC7FA9] hover:bg-pink-500 text-white px-6 py-4 rounded-[8px] text-base font-bold">
      Book Appointment
    </Link>
  </div>
);

const DoctorGrid = ({ doctors }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8">
    {doctors.map((doctor) => (
      <DoctorCard key={doctor._id} doctor={doctor} />
    ))}
  </div>
);
