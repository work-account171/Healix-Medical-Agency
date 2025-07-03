"use client";

export default function PatientInfoForm({ formData, handleChange, nextStep }) {
  return (
    <div className="space-y-4 p-6 ">
      <div className="mb-10">
        
        <h1 className="text-3xl lg:text-4xl  font-bold">
          Personal Information
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-start pt-10">
        <button
          type="button"
          onClick={nextStep}
          className="bg-[#EC7FA9] text-white px-5 py-2.5 font-bold rounded-lg hover:bg-[#BE5985]"
          disabled={!formData.patientName || !formData.patientEmail}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
