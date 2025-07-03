"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    // patient fields
    age: "",
    gender: "",
    bloodGroup: "",
    // doctor fields
    specialization: "",
    licenseNumber: "",
    experienceYears: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setForm({
      name: "",
      email: "",
      password: "",
      role,
      age: "",
      gender: "",
      bloodGroup: "",
      specialization: "",
      licenseNumber: "",
      experienceYears: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      alert("Server error — unexpected response format.");
      return;
    }

    if (!res.ok) {
      alert(data.error || "Signup failed");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded shadow-lg overflow-hidden">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Sign Up as a {form.role === "doctor" ? "Doctor" : "Patient"}
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6 space-x-4">
            {["patient", "doctor"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleChange(role)}
                className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 ${
                  form.role === role
                    ? "bg-[#EC7FA9] text-white border-[#EC7FA9]"
                    : "bg-white text-[#EC7FA9] border-[#EC7FA9] hover:bg-[#fce8f0]"
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Shared Fields */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full mb-4 px-4 py-2 border rounded"
            />

            {/* Patient Fields */}
            {form.role === "patient" && (
              <>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                  required
                  className="w-full mb-4 px-4 py-2 border rounded"
                />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded"
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </>
            )}

     
            {form.role === "doctor" && (
              <>
                <input
                  type="text"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  placeholder="Specialization (e.g., Cardiology)"
                  required
                  className="w-full mb-4 px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  name="licenseNumber"
                  value={form.licenseNumber}
                  onChange={handleChange}
                  placeholder="Medical License Number"
                  required
                  className="w-full mb-4 px-4 py-2 border rounded"
                />
                <input
                  type="number"
                  name="experienceYears"
                  value={form.experienceYears}
                  onChange={handleChange}
                  placeholder="Years of Experience"
                  required
                  className="w-full mb-4 px-4 py-2 border rounded"
                />
              </>
            )}

            <button
              type="submit"
              className="w-full border border-[#EC7FA9] bg-gray-50 text-[#EC7FA9] hover:bg-[#BE5985] hover:text-white px-5 py-2.5 font-bold rounded-lg transition-all duration-200"
            >
              Sign Up
            </button>

            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
        <div className="w-full md:w-1/2 bg-gray-50 flex items-stretch justify-center p-4">
          {form.role === "doctor" ? (
            <Image
              src="/images/doctor.png"
              alt="Doctor illustration"
              width={700}
              height={200}
              className="object-fill transition-opacity duration-300"
              priority
            />
          ) : (
            <Image
              src="/images/doctor.png"
              alt="Patient illustration"
              width={400}
              height={400}
              className="object-contain transition-opacity duration-300"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}
