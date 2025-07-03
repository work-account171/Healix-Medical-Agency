'use client';

export default function AppointmentDetailsForm({
  formData,
  handleChange,
  doctors,
  specializations,
  filteredDoctors,
  availableDates,
  availableTimes,
  loading,
  prevStep,
  nextStep
}) {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">Appointment Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Specialization */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium text-gray-700">Specialization *</label>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={loading.doctors}
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec, i) => (
              <option key={i} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Doctor */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium text-gray-700">Doctor *</label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={!formData.specialization || loading.doctors}
          >
            <option value="">Select Doctor</option>
            {filteredDoctors.map(doctor => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} ({doctor.location}) - ${doctor.consultationFee}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Date *</label>
          <select
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={!formData.doctorId || loading.dates}
          >
            <option value="">Select Date</option>
            {availableDates.map((date, i) => (
              <option key={i} value={date}>
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </option>
            ))}
          </select>
        </div>

        {/* Time */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Time *</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={!formData.date || loading.times}
          >
            <option value="">Select Time</option>
            {availableTimes.map((time, i) => (
              <option key={i} value={time}>{time}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">Location Preference</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any specific location preference?"
          />
        </div>
      </div>

      <div className="flex justify-start gap-4 mt-6 pt-10">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
         className="heroBtn bg-[#EC7FA9]  text-white px-5 py-2.5 font-bold rounded-lg hover:bg-[#BE5985]"
          disabled={!formData.doctorId || !formData.date || !formData.time}
        >
          Submit
        </button>
      </div>
    </div>
  );
}