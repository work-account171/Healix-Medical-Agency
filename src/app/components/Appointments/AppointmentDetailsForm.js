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
  nextStep,
  hasPreselectedDoctor
}) {
  // Find the selected doctor
  const selectedDoctor = doctors.find(doc => doc._id === formData.doctorId);

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10">Appointment Details</h2>

      {/* Show selected doctor info if one is pre-selected */}
      {hasPreselectedDoctor && selectedDoctor && (
        <div className="p-4 bg-blue-50 rounded-lg mb-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">You&apos;re booking with:</h3>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-800">{selectedDoctor.name}</h4>
              <p className="text-blue-700">{selectedDoctor.specialization.name}</p>
              <p className="text-blue-700">{selectedDoctor.location}</p>
              <p className="text-blue-700 font-medium">Consultation Fee: ${selectedDoctor.consultationFee}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Specialization Dropdown */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium text-gray-700">Specialization *</label>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={loading.specializations || hasPreselectedDoctor}
          >
            <option value="">Select Specialization</option>
            {specializations?.map((spec) => (
              <option key={spec._id} value={spec._id}>
                {spec.name}
              </option>
            ))}
          </select>
          {loading?.specializations && (
            <p className="mt-1 text-sm text-gray-500">Loading specializations...</p>
          )}
        </div>

        {/* Doctor Dropdown */}
        <div className="md:col-span-1">
          <label className="block mb-2 font-medium text-gray-700">Doctor *</label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={!formData.specialization || loading.doctors || hasPreselectedDoctor}
          >
            <option value="">{formData.specialization ? 'Select Doctor' : 'Select specialization first'}</option>
            {filteredDoctors?.map(doctor => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} ({doctor.location}) - ${doctor.consultationFee}
              </option>
            ))}
          </select>
          {loading?.doctors && (
            <p className="mt-1 text-sm text-gray-500">Loading doctors...</p>
          )}
        </div>

        {/* Date Dropdown */}
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
            <option value="">{formData.doctorId ? 'Select Date' : 'Select doctor first'}</option>
            {availableDates?.map((date, i) => (
              <option key={i} value={date}>
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </option>
            ))}
          </select>
          {loading?.dates && (
            <p className="mt-1 text-sm text-gray-500">Loading available dates...</p>
          )}
        </div>

        {/* Time Dropdown */}
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
            <option value="">{formData.date ? 'Select Time' : 'Select date first'}</option>
            {availableTimes?.map((time, i) => (
              <option key={i} value={time}>{time}</option>
            ))}
          </select>
          {loading?.times && (
            <p className="mt-1 text-sm text-gray-500">Loading available times...</p>
          )}
        </div>

        {/* Location Input */}
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
          className="heroBtn bg-[#EC7FA9] text-white px-5 py-2.5 font-bold rounded-lg hover:bg-[#BE5985]"
          disabled={!formData.doctorId || !formData.date || !formData.time}
        >
          {loading.submitting ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}