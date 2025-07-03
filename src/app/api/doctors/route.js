
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export async function GET() {
  try {
    await dbConnect();
    const doctors = await Doctor.find({}).select('-appointments -availableSlots');
    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      message: 'Failed to fetch doctors',
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}