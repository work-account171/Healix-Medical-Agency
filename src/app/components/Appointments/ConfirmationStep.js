'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmationStep({
  formData,
  doctors,
  prevStep,
  handleSubmit,
  loading,
  error,
  success
}) {
  const router = useRouter();
  const selectedDoctor = doctors.find(d => d._id === formData.doctorId);
  
  // Redirect on success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 2000); // Redirect after 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Confirm Your Appointment</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
          Appointment booked successfully! Redirecting to home page...
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-2">Appointment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Patient Name:</p>
            <p className="font-medium">{formData.patientName}</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{formData.patientEmail}</p>
          </div>
          <div>
            <p className="text-gray-600">Doctor:</p>
            <p className="font-medium">{selectedDoctor?.name} ({selectedDoctor?.specialization})</p>
          </div>
          <div>
            <p className="text-gray-600">Date & Time:</p>
            <p className="font-medium">
              {new Date(formData.date).toLocaleDateString()} at {formData.time}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Location:</p>
            <p className="font-medium">{formData.location || selectedDoctor?.location}</p>
          </div>
          <div>
            <p className="text-gray-600">Consultation Fee:</p>
            <p className="font-medium">${selectedDoctor?.consultationFee}</p>
          </div>
        </div>
      </div>
      
      {!success && (
        <div className="flex justify-start gap-4 pt-10">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="heroBtn bg-[#EC7FA9] text-white px-5 py-2.5 font-bold rounded-lg hover:bg-[#BE5985]"
            disabled={loading.submitting}
          >
            {loading.submitting ? 'Confirming...' : 'Confirm Appointment'}
          </button>
        </div>
      )}
    </div>
  );
}