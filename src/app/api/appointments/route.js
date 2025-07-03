import dbConnect from '@/lib/dbConnect';
import Appointment from '@/models/Appointment';
import Doctor from '@/models/Doctor';

export async function POST(request) {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    
    console.log('Parsing request body...');
    const body = await request.json();
    console.log('Request body:', body);

    // Validate required fields
    if (!body.doctorId || !body.date || !body.time || !body.patientName || !body.patientEmail) {
      console.log('Missing required fields');
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get doctor details to check specialization
    const doctor = await Doctor.findById(body.doctorId);
    if (!doctor) {
      return Response.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    console.log('Checking for existing appointments...');
    
    // Check 1: Existing appointment for same time slot
    const existingTimeSlot = await Appointment.findOne({
      doctor: body.doctorId,
      date: body.date,
      time: body.time,
      status: { $ne: 'cancelled' }
    });
    
    if (existingTimeSlot) {
      console.log('Time slot already booked');
      return Response.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    // Check 2: Existing appointment for same patient with same doctor/specialization
    const existingPatientAppointment = await Appointment.findOne({
      doctor: body.doctorId,
      'patientInfo.email': body.patientEmail,
      status: { $ne: 'cancelled' }
    });

    if (existingPatientAppointment) {
      console.log('Patient already has an appointment with this doctor');
      return Response.json(
        { 
          error: 'You already have an existing appointment with this doctor/specialization',
          existingAppointment: {
            date: existingPatientAppointment.date,
            time: existingPatientAppointment.time
          }
        },
        { status: 409 }
      );
    }

    console.log('Creating new appointment...');
    const appointment = new Appointment({
      doctor: body.doctorId,
      specialization: doctor.specialization, // Store specialization for easier querying
      patientInfo: {
        name: body.patientName,
        email: body.patientEmail,
        phone: body.patientPhone || ''
      },
      date: body.date,
      time: body.time,
      location: body.location || '',
      status: 'confirmed'
    });

    console.log('Saving appointment...');
    await appointment.save();
    
    console.log('Appointment created successfully:', appointment);
    return Response.json(appointment, { status: 201 });
    
  } catch (error) {
    console.error('Error in appointment booking:', error);
    return Response.json(
      { 
        error: 'Failed to book appointment',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}