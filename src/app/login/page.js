'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/success');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

          <form onSubmit={handleSubmit}>
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
              className="w-full mb-6 px-4 py-2 border rounded"
            />

            <button
              type="submit"
              className="w-full heroBtn border border-[#EC7FA9] hover:text-white bg-gray-50 text-[#EC7FA9] hover:bg-[#BE5985] px-5 py-2.5 font-bold rounded-lg transition-all duration-200"
            >
              Login
            </button>

            <p className="mt-4 text-center text-sm">
              Dont have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
            </p>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-4">
          <Image
            src="/images/doctor.png"
            alt="Login illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
