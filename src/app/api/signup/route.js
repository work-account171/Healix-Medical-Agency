import Patient from '../../../models/patient';
import Doctor from '../../../models/doctor';
import dbConnect from '@/lib/dbConnect';

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const {
    name, email, password, role,
    age, gender, bloodGroup,
    specialization, licenseNumber, experienceYears,
  } = body;

  try {
    if (role === 'patient') {
      const existing = await Patient.findOne({ email });
      if (existing) return new Response(JSON.stringify({ error: 'Patient already exists' }), { status: 400 });

      const patient = await Patient.create({ name, email, password, age, gender, bloodGroup });
      return new Response(JSON.stringify({ success: true, user: patient }), { status: 201 });
    }

    if (role === 'doctor') {
      const existing = await Doctor.findOne({ email });
      if (existing) return new Response(JSON.stringify({ error: 'Doctor already exists' }), { status: 400 });

      const doctor = await Doctor.create({ name, email, password, specialization, licenseNumber, experienceYears });
      return new Response(JSON.stringify({ success: true, user: doctor }), { status: 201 });
    }

    return new Response(JSON.stringify({ error: 'Invalid role' }), { status: 400 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Something went wrong', details: err.message }), { status: 500 });
  }
}

      // import dbConnect from '@/lib/dbConnect';
      // import User from '@/models/User'; 
      
      // export async function POST(req) {
      //   try {
      //     const body = await req.json();
      //     const { name, email, password, role } = body;
      
      //     if (!name || !email || !password || !role) {
      //       return new Response(
      //         JSON.stringify({ error: 'All fields are required' }),
      //         { status: 400, headers: { 'Content-Type': 'application/json' } }
      //       );
      //     }
      
      //     if (!['doctor', 'patient'].includes(role)) {
      //       return new Response(
      //         JSON.stringify({ error: 'Invalid role' }),
      //         { status: 400, headers: { 'Content-Type': 'application/json' } }
      //       );
      //     }
      
      //     await dbConnect();
      
      //     const existingUser = await User.findOne({ email });
      //     if (existingUser) {
      //       return new Response(
      //         JSON.stringify({ error: 'User already exists' }),
      //         { status: 409, headers: { 'Content-Type': 'application/json' } }
      //       );
      //     }
      
      //     const newUser = await User.create({ name, email, password, role });
      
      //     return new Response(
      //       JSON.stringify({ message: 'User created', user: newUser }),
      //       { status: 201, headers: { 'Content-Type': 'application/json' } }
      //     );
      //   } catch (err) {
      //     console.error(err);
      //     return new Response(
      //       JSON.stringify({ error: 'Internal Server Error' }),
      //       { status: 500, headers: { 'Content-Type': 'application/json' } }
      //     );
      //   }
      // }