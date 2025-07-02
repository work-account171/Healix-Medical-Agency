'use client';

export default function ProgressSteps({ currentStep }) {
  const steps = ['Patient Info', 'Appointment Details', 'Confirmation'];
  
  return (
    <div className="w-full flex justify-center mb-8">
      <div className="w-full hidden md:block">
        <div className="flex justify-between relative">
          {/* Progress line */}
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
            <div 
              className="h-1 bg-[#EC7FA9] transition-all duration-300" 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= index ? 'bg-[#EC7FA9] text-white' : 'bg-gray-200 text-gray-600'}`}>
                {index + 1}
              </div>
              <span className={`mt-2 text-sm ${currentStep >= index ? 'text-[#EC7FA9] font-medium' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}