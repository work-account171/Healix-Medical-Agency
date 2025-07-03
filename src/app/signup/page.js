"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",
    location: "",
    specialization: "",
    experienceYears: "",
    consultationFee: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRoleChange = (role) => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json() || {};
    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }
    router.push("/login");
  };
  const getImage = () => {
    return form.role === "doctor"
      ? "/images/doctor.png"
      : "/images/patient.png";
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  w-[87%]  mx-auto">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-10 bg-white shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Create an Account
        </h2>
        {/* Role Toggle Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            onClick={() => handleRoleChange("patient")}
            className={`px-4 py-2 rounded-full font-semibold border ${form.role === "patient"
              ? "bg-pink-500 text-white border-pink-500"
              : "text-pink-500 border-pink-500 bg-white hover:bg-pink-100"
              } transition duration-200`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("doctor")}
            className={`px-4 py-2 rounded-full font-semibold border ${form.role === "doctor"
              ? "bg-pink-500 text-white border-pink-500"
              : "text-pink-500 border-pink-500 bg-white hover:bg-pink-100"
              } transition duration-200`}
          >
            Doctor
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {form.role === "doctor" && (
            <>
              <input
                name="specialization"
                placeholder="Specialization"
                required
                value={form.specialization}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                name="experienceYears"
                type="number"
                placeholder="Years of Experience"
                required
                value={form.experienceYears}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                name="consultationFee"
                type="number"
                placeholder="Consultation Fee"
                value={form.consultationFee}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </>
          )}
          <input
            name="phone"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="location"
            placeholder="Location"
            required
            value={form.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-500 font-semibold hover:underline"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-pink-50 p-10">
        <Image
          src={getImage()}
          alt="Signup Illustration"
          width={400}
          height={400}
          className="rounded object-contain"
        />
      </div>
    </div>
  );
}
