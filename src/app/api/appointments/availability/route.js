import Appointment from '@/models/Appointment';
import dbConnect from '@/lib/dbConnect';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');
    const date = searchParams.get('date');

    if (!doctorId || !date) {
      return new Response(JSON.stringify({ message: 'Missing parameters' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Get all booked appointments for this doctor and date
    const bookedAppointments = await Appointment.find({
      doctor: doctorId,
      date,
      status: { $ne: 'cancelled' }
    }).select('time');

    const bookedTimes = bookedAppointments.map(app => app.time);

    // Generate all possible time slots (every 30 minutes from 9AM to 5PM)
    const allSlots = [];
    for (let hour = 9; hour < 17; hour++) {
      allSlots.push(`${hour}:00`);
      allSlots.push(`${hour}:30`);
    }

    // Filter out booked times
    const availableTimes = allSlots.filter(slot => !bookedTimes.includes(slot));

    return new Response(JSON.stringify({ availableTimes }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to check availability' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}