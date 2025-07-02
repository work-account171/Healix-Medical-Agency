
const specializations = [
  {
    name: 'Dentistry',
    description: 'Dental care and oral health services.',
    icon: 'https://cdn-icons-png.flaticon.com/512/2809/2809445.png',
  },
  {
    name: 'Cardiology',
    description: 'Heart-related diagnosis and treatment.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3621/3621504.png',
  },
  {
    name: 'ENT Specialists',
    description: 'Ear, nose, and throat specialists.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3467/3467795.png',
  },
  {
    name: 'Astrology',
    description: 'Astrology-based health and personality insights.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3199/3199895.png',
  },
  {
    name: 'Neuroanatomy',
    description: 'Brain and nervous system specialization.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3022/3022201.png',
  },
  {
    name: 'Blood Screening',
    description: 'Blood tests and screenings.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1785/1785366.png',
  },
  {
    name: 'Orthopedics',
    description: 'Bone and joint specialists.',
    icon: 'https://cdn-icons-png.flaticon.com/512/657/657684.png',
  },
  {
    name: 'Dermatology',
    description: 'Skin care and treatment.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3845/3845824.png',
  },
];

async function seedSpecializations() {
  for (const spec of specializations) {
    try {
      const res = await fetch('http://localhost:3000/api/doctors/create-specialization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spec),
      });

      const data = await res.json();
      console.log(`${spec.name}:`, data.success ? '✅ Created' : '❌ Failed', data);
    } catch (err) {
      console.error(`❌ Error creating ${spec.name}:`, err.message);
    }
  }
}

seedSpecializations();
