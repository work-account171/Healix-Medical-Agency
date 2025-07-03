export default function DoctorCard() {
  return (
    <>
      {/* <Image className="rounded-full h-full" src={doctor1} width={100} height={200} alt="doctor 1 image" /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8  p-4">
        <div className="cont rounded-lg bg-[#EC7FA9]  shadow-xl ">
          <h1 className="pt-6 p-4 text-2xl text-white font-bold ">
            Doctor says
          </h1>
          <p className="p-4 pt-0 text-white text-sm">
            Drinking enough water daily is essential to keep your body hydrated
            and functioning properly. Aim for at least 8 glasses a day. Getting
            7-9 hours of sleep each night is crucial for your overall health, as
            it helps with immunity, memory, and recovery.{" "}
          </p>
        </div>

        <div className="cont rounded-lg bg-[#EC7FA9]  shadow-xl ">
          <h1 className="pt-6 p-4 text-2xl text-white font-bold ">
            Doctor says
          </h1>
          <p className="p-4 pt-0 text-white text-sm">
            A balanced diet rich in fruits, vegetables, lean proteins, and whole
            grains ensures your body gets the nutrients it needs. Regular
            exercise, at least 30 minutes a day, improves heart health, boosts
            mood, and helps maintain a healthy weight.
          </p>
        </div>

        <div className="cont rounded-lg bg-[#EC7FA9]  shadow-xl ">
          <h1 className="pt-6 p-4 text-2xl text-white font-bold ">
            Doctor says
          </h1>
          <p className="p-4 pt-0 text-white text-sm">
            Limiting sugar and salt intake can prevent conditions like diabetes
            and high blood pressure, keeping your heart and kidneys healthy.
            Practicing good hygiene, such as frequent handwashing and proper
            oral care, reduces the risk of dental issues.
          </p>
        </div>

        <div className="cont rounded-lg bg-[#EC7FA9]  shadow-xl ">
          <h1 className="pt-6 p-4 text-2xl text-white font-bold ">
            Doctor says
          </h1>
          <p className="p-4 pt-0 text-white text-sm">
            Managing stress through meditation, deep breathing, or engaging in
            hobbies is important for mental well-being. Avoiding smoking and
            excessive alcohol consumption lowers the risk of heart disease, lung
            problems, and liver damage.
          </p>
        </div>

        <div className="cont rounded-lg bg-[#EC7FA9]  shadow-xl ">
          <h1 className="pt-6 p-4 text-2xl text-white font-bold ">
            Doctor says
          </h1>
          <p className="p-4 pt-0 text-white text-sm">
            Regular health checkups are vital for early detection of diseases
            and effective treatment. Protecting your skin by using sunscreen and
            avoiding excessive sun exposure helps prevent skin damage and
            reduces the risk of skin cancer.
          </p>
        </div>

        <div className="cont rounded-lg bg-[#EC7FA9]  shadow-xl ">
          <h1 className="pt-6 p-4 text-2xl text-white font-bold ">
            Doctor says
          </h1>
          <p className="p-4 pt-0 text-white text-sm">
            Regular Health Checkups, Routine medical exams can help detect
            diseases early and improve treatment outcomes.rotecting your skin by
            using sunscreen and avoiding excessive sun exposure helps prevent
            skin damage and reduces the risk of skin cancer.
          </p>
        </div>
      </div>
    </>
  );
}
