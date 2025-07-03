

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import ConfirmationStep from '../components/Appointments/ConfirmationStep';
import AppointmentDetailsForm from '../components/Appointments/AppointmentDetailsForm';
import PatientInfoForm from '../components/Appointments/PatientInfoForm';
import ProgressSteps from '../components/Appointments/ProgressSteps';
import HeroSection from '../components/Appointments/HeroSection';
import Footer from '../components/Footer';
import OurServices from '../components/OurServices';
import DoctorCard from '../components/DoctorCard';

function BookAppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    doctorId: '',
    specialization: '',
    specializationName: '',
    date: '',
    time: '',
    location: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    amount: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  
  const [loading, setLoading] = useState({
    doctors: true,
    specializations: true,
    dates: false,
    times: false,
    submitting: false,
    initialLoad: true
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch specializations
        const specsRes = await fetch('/api/doctors/fetch-specializations');
        if (!specsRes.ok) throw new Error('Failed to load specializations');
        const specsData = await specsRes.json();
        const specs = specsData.specializations || specsData.data || [];
        setSpecializations(specs);

        // Fetch doctors
        const docsRes = await fetch('/api/doctors/fetch-doctors');
        if (!docsRes.ok) throw new Error('Failed to load doctors');
        const docsData = await docsRes.json();
        const docs = docsData.doctors || docsData.data || [];
        setDoctors(docs);

        // Check for doctorId in URL params
        const doctorIdFromParams = searchParams.get('doctorId');
        if (doctorIdFromParams) {
          const selectedDoctor = docs.find(d => d._id === doctorIdFromParams);
          if (selectedDoctor) {
            setFormData(prev => ({
              ...prev,
              doctorId: selectedDoctor._id,
              specialization: selectedDoctor.specialization._id,
              specializationName: selectedDoctor.specialization.name,
              amount: selectedDoctor.consultationFee
            }));
            // Start from appointment details step if doctor is pre-selected
            setCurrentStep(0);
          }
        }

      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(prev => ({ ...prev, 
          doctors: false, 
          specializations: false,
          initialLoad: false
        }));
      }
    };

    fetchData();
  }, [searchParams]);

  // When specialization changes, reset doctor selection if not pre-selected
  useEffect(() => {
    if (formData.specialization && !searchParams.get('doctorId')) {
      const selectedSpec = specializations.find(s => s._id === formData.specialization);
      setFormData(prev => ({ 
        ...prev, 
        doctorId: '', 
        date: '', 
        time: '',
        specializationName: selectedSpec?.name || ''
      }));
    }
  }, [formData.specialization, specializations, searchParams]);

  // When doctor changes, get available dates and set amount
  useEffect(() => {
    if (!formData.doctorId) {
      setAvailableDates([]);
      return;
    }

    const fetchDates = async () => {
      setLoading(prev => ({ ...prev, dates: true }));
      try {
        const doctor = doctors.find(d => d._id === formData.doctorId);
        const dates = doctor?.availableSlots?.map(slot => {
          const dateObj = new Date(slot.date);
          return dateObj.toISOString().split('T')[0];
        }) || [];

        setAvailableDates(dates);
        
        // Set consultation fee as amount
        if (doctor?.consultationFee) {
          setFormData(prev => ({ ...prev, amount: doctor.consultationFee }));
        }
      } catch (err) {
        setError('Failed to load available dates');
      } finally {
        setLoading(prev => ({ ...prev, dates: false }));
      }
    };

    fetchDates();
  }, [formData.doctorId, doctors]);

  // When date changes, get available times
  useEffect(() => {
    if (!formData.doctorId || !formData.date) {
      setAvailableTimes([]);
      return;
    }

    const fetchTimes = async () => {
      setLoading(prev => ({ ...prev, times: true }));
      try {
        const doctor = doctors.find(d => d._id === formData.doctorId);
        const slot = doctor?.availableSlots?.find(s => {
          const slotDate = new Date(s.date).toISOString().split('T')[0];
          return slotDate === formData.date;
        });

        setAvailableTimes(slot?.times || []);
      } catch (err) {
        setError('Failed to load available times');
      } finally {
        setLoading(prev => ({ ...prev, times: false }));
      }
    };

    fetchTimes();
  }, [formData.date, formData.doctorId, doctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'date' ? { time: '' } : {}),
      ...(name === 'doctorId' ? { date: '', time: '' } : {}),
      ...(name === 'specialization' ? { 
        specializationName: specializations.find(s => s._id === value)?.name || ''
      } : {})
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    // Validate required fields
    const requiredFields = [
      'doctorId', 'specialization', 'date', 'time',
      'patientName', 'patientEmail', 'amount'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(prev => ({ ...prev, submitting: true }));

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          specialization: formData.specializationName 
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        
        if (res.status === 409) {
          const existingDate = errorData.existingAppointment?.date 
            ? new Date(errorData.existingAppointment.date).toLocaleDateString() 
            : 'previously';
          const existingTime = errorData.existingAppointment?.time || '';
          
          setError(`You already have an appointment with this doctor on ${existingDate} at ${existingTime}.`);
        } else {
          throw new Error(errorData.message || 'Booking failed');
        }
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/appointments'), 1500);
    } catch (err) {
      setError(err.message || 'An error occurred while booking your appointment');
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };
  
  // Filter doctors by specialization
  const filteredDoctors = formData.specialization
    ? doctors.filter(doc => doc.specialization._id === formData.specialization)
    : [];

  // Navigation between steps
  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Header />
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 py-8 mt-10 lg:mt-20">
        <ProgressSteps currentStep={currentStep} />
        
        <div className="mt-8">
          {currentStep === 0 && (
            <PatientInfoForm
              formData={formData} 
              handleChange={handleChange} 
              nextStep={nextStep}
            />
          )}
          
          {currentStep === 1 && (
            <AppointmentDetailsForm
              formData={formData}
              handleChange={handleChange}
              doctors={doctors}
              specializations={specializations}
              filteredDoctors={filteredDoctors}
              availableDates={availableDates}
              availableTimes={availableTimes}
              loading={loading}
              prevStep={prevStep}
              nextStep={nextStep}
              hasPreselectedDoctor={!!searchParams.get('doctorId')}
            />
          )}
          
          {currentStep === 2 && (
            <ConfirmationStep
              formData={formData}
              doctors={doctors}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
              loading={loading}
              error={error}
              success={success}
            />
          )}
        </div>
      </div>
      
      {!searchParams.get('doctorId') && (
        <div className="docCardsParent px-4 md:px-24 mt-10">
          <DoctorCard/>
        </div>
      )}
      
      <OurServices/>
      <Footer />
    </>
  );
}

export default function BookAppointment() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Loading appointment details...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <BookAppointmentContent />
    </Suspense>
  );
}