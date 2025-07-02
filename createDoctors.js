
// Specializations we expect to match by name
const specializationMap = {
  Dentistry: '',
  Cardiology: '',
  'ENT Specialists': '',
  Astrology: '',
  Neuroanatomy: '',
  'Blood Screening': '',
  Orthopedics: '',
  Dermatology: '',
};

// Doctor seed data
const doctors = [
  {
    name: 'Dr. Aisha Khalid',
    specialization: 'Dentistry',
    experienceYears: 8,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    profileImage: 'https://source.unsplash.com/featured/300x300/?dentist,female',
  },
  {
    name: 'Dr. Omar Zafar',
    specialization: 'Cardiology',
    experienceYears: 12,
    availableDays: ['Tuesday', 'Thursday'],
    profileImage: 'https://source.unsplash.com/featured/300x300/?cardiologist,male',
  },
  {
    name: 'Dr. Sana Tariq',
    specialization: 'ENT Specialists',
    experienceYears: 6,
    availableDays: ['Monday', 'Thursday'],
    profileImage: 'https://source.unsplash.com/featured/300x300/?ent,doctor,female',
  },
  {
    name: 'Dr. Hamza Ali',
    specialization: 'Neuroanatomy',
    experienceYears: 10,
    availableDays: ['Wednesday', 'Saturday'],
    profileImage: 'https://source.unsplash.com/featured/300x300/?neurology,doctor',
  },
  {
    name: 'Dr. Laiba Rehman',
    specialization: 'Dermatology',
    experienceYears: 5,
    availableDays: ['Monday', 'Friday'],
    profileImage: 'https://source.unsplash.com/featured/300x300/?dermatologist,female',
  },
];

// Fetch specializations and map names to ObjectIds
async function fetchSpecializationIds() {
  try {
    const res = await fetch('http://localhost:3000/api/doctors/fetch-specializations');
    const data = await res.json();

    if (!data.success) throw new Error(data.message);

    data.specializations.forEach((spec) => {
      if (specializationMap.hasOwnProperty(spec.name)) {
        specializationMap[spec.name] = spec._id;
      }
    });
  } catch (err) {
    console.error('❌ Failed to fetch specialization IDs:', err.message);
    process.exit(1);
  }
}

// Create doctors using mapped specialization IDs
async function seedDoctors() {
  await fetchSpecializationIds();

  for (const doc of doctors) {
    const specId = specializationMap[doc.specialization];

    if (!specId) {
      console.warn(`⚠️ Skipped ${doc.name}: Missing specialization ID`);
      continue;
    }

    try {
      const res = await fetch('http://localhost:3000/api/doctors/create-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: doc.name,
          profileImage: doc.profileImage,
          specialization: specId,
          experienceYears: doc.experienceYears,
          availableDays: doc.availableDays,
          availableTime: {
            start: '09:00 AM',
            end: '05:00 PM',
          },
          verified: true,
        }),
      });

      const data = await res.json();
      console.log(`${doc.name}:`, data.success ? '✅ Created' : '❌ Failed', data);
    } catch (err) {
      console.error(`❌ Error creating ${doc.name}:`, err.message);
    }
  }
}

seedDoctors();
