// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Image from "next/image";

// export default function DoctorSignup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "doctor",
//     specialization: "",
//     licenseNumber: "",
//     experienceYears: "",
//   });

//   const router = useRouter();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       router.push("/login");
//     } else {
//       const data = await res.json();
//       alert(data.error || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="flex flex-col md:flex-row max-w-5xl w-full bg-white shadow rounded overflow-hidden">
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-3xl font-bold text-center mb-6">Doctor Sign Up</h2>
//           <form onSubmit={handleSubmit}>
//             <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="w-full mb-4 px-4 py-2 border rounded" />
//             <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full mb-4 px-4 py-2 border rounded" />
//             <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required className="w-full mb-4 px-4 py-2 border rounded" />
//             <input type="text" name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization" required className="w-full mb-4 px-4 py-2 border rounded" />
//             <input type="text" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="License Number" required className="w-full mb-4 px-4 py-2 border rounded" />
//             <input type="number" name="experienceYears" value={form.experienceYears} onChange={handleChange} placeholder="Years of Experience" required className="w-full mb-4 px-4 py-2 border rounded" />
//             <button type="submit" className="w-full bg-pink-100 text-pink-600 border border-pink-400 hover:bg-pink-500 hover:text-white px-5 py-2.5 font-bold rounded-lg">Sign Up</button>
//             <p className="mt-4 text-center text-sm">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a></p>
//           </form>
//         </div>
//         <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center">
//           <Image src="/images/doctor.png" alt="Doctor" width={400} height={400} className="object-contain" />
//         </div>
//       </div>
//     </div>
//   );
// }
