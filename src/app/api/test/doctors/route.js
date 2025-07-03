
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export async function GET() {
  try {
    await dbConnect();
    const doctors = await Doctor.find({});

    // If no doctors exist, create sample data
    if (doctors.length === 0) {
      const sampleDoctors = [
        {
          name: "Dr. Smith",
          specialization: "Cardiology",
          location: "Main Hospital",
          consultationFee: 200,
          availableSlots: [
            {
              date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
              times: ["09:00", "10:00", "11:00"]
            },
            {
              date: new Date(new Date().setDate(new Date().getDate() + 3)),
              times: ["14:00", "15:00"]
            },
            {
              date: new Date(new Date().setDate(new Date().getDate() + 5)),
              times: ["10:30", "13:30"]
            }
          ]
        },
        {
          name: "Dr. Johnson",
          specialization: "Pediatrics",
          location: "Children's Wing",
          consultationFee: 150,
          availableSlots: [
            {
              date: new Date(new Date().setDate(new Date().getDate() + 2)),
              times: ["08:00", "09:30", "11:00"]
            },
            {
              date: new Date(new Date().setDate(new Date().getDate() + 4)),
              times: ["13:00", "14:30"]
            }
          ]
        },
        {
          name: "Dr. Lee",
          specialization: "Neurology",
          location: "Neuro Center",
          consultationFee: 250,
          availableSlots: [
            {
              date: new Date(new Date().setDate(new Date().getDate() + 1)),
              times: ["10:00", "12:00", "16:00"]
            },
            {
              date: new Date(new Date().setDate(new Date().getDate() + 6)),
              times: ["09:00", "11:00", "14:00"]
            }
          ]
        },
        {
          name: "Dr. Garcia",
          specialization: "Orthopedics",
          location: "Sports Medicine Center",
          consultationFee: 180,
          availableSlots: [
            {
              date: new Date(new Date().setDate(new Date().getDate() + 2)),
              times: ["07:30", "09:30", "15:30"]
            },
            {
              date: new Date(new Date().setDate(new Date().getDate() + 5)),
              times: ["08:00", "10:00", "13:00"]
            }
          ]
        },
        {
          name: "Dr. Wilson",
          specialization: "Dermatology",
          location: "Skin Care Clinic",
          consultationFee: 175,
          availableSlots: [
            {
              date: new Date(new Date().setDate(new Date().getDate() + 3)),
              times: ["08:30", "11:30", "14:30"]
            },
            {
              date: new Date(new Date().setDate(new Date().getDate() + 7)),
              times: ["09:00", "12:00", "15:00"]
            }
          ]
        },
        {
          name: "Dr. Chen",
          specialization: "Ophthalmology",
          location: "Eye Care Center",
          consultationFee: 190,
          availableSlots: [
            {
              date: new Date(new Date().setDate(new Date().getDate() + 1)),
              times: ["08:00", "10:00", "13:00", "16:00"]
            },
            {
              date: new Date(new Date().setDate(new Date().getDate() + 4)),
              times: ["09:30", "11:30", "14:30"]
            }
          ]
        },
        {
          name: "Dr. Rodriguez",
          specialization: "Psychiatry",
          location: "Mental Wellness Center",
          consultationFee: 220,
          availableSlots: [
            {
              date: new Date(new Date().setDate(new Date().getDate() + 2)),
              times: ["10:00", "12:00", "15:00"]
            },
            {
              date: new Date(new Date().setDate(new Date().getDate() + 6)),
              times: ["09:00", "11:00", "14:00"]
            }
          ]
        }
      ];

      await Doctor.insertMany(sampleDoctors);
      const newDoctors = await Doctor.find({});
      return Response.json(newDoctors);
    }

    return Response.json(doctors);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch doctors", details: error.message },
      { status: 500 }
    );
  }
}