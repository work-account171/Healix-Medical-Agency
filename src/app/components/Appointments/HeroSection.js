"use client";

export default function HeroSection() {
  return (
    <div className="relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[30rem] relative">
        <div className="md:w-1/2 pt-40">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your Doctor&apos;s Appointment
          </h1>
          <p className="text-md mb-8">
            Easy, fast, and secure way to schedule your medical visits with our
            specialists.
          </p>
          <div className="flex space-x-4">
            <button className="heroBtn bg-[#EC7FA9] text-white px-5 py-2.5 font-bold rounded-lg hover:bg-[#BE5985]">
              Book Now
            </button>
            <button className="heroBtn border border-[#EC7FA9] hover:text-white bg-gray-50 text-[#EC7FA9] hover:bg-[#BE5985] px-5 py-2.5 font-bold rounded-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .relative {
          background-image: url("/images/doctor-hero.jpg");
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
}
