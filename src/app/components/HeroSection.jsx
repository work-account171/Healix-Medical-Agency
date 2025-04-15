import Image from "next/image";
// import DoctorImage from "../images/doctor.jpg"
import DoctorImage from "../images/doctorimage.png"
import heroImage from "../images/heroimage.jpg"

export default function HeroSection(){
    return(
       <>
           <div className="heroSection bg-gray-50 pt-28 pb-36 flex px-24 justify-between items-center">
              
              <div className="heroDetail flex flex-col gap-9">
                 <h1 className="heroHeading flex items-center font-bold">Welcome to Healix <span className="heroHeartImage w-[5vw]"><Image className="mix-blend-multiply" src={heroImage} alt="hero Image"/></span></h1>
                   <p className="heroDesc text-gray-500 w-[35vw]">
                   Healix is an online platform that allows users to find doctors and book appointments effortlessly. It provides a seamless way to connect with healthcare professionals and manage medical consultations, ensuring convenience, reliability, and timely access to quality care. This platform is created to enhance your healthcare experience with ease and efficiency.
                   </p>
                 <div className="heroBtnDiv flex gap-5">
                    <button className="heroBtn bg-[#EC7FA9] text-white px-5 py-2.5 font-bold rounded-lg hover:bg-[#BE5985]">Find Doctors</button>
                    <button className="heroBtn border border-[#EC7FA9] hover:text-white bg-gray-50 text-[#EC7FA9] hover:bg-[#BE5985] px-5 py-2.5 font-bold rounded-lg">Apply as Doctor</button>
                 </div>
              </div>

              <div className="heroImgDiv">
                 <Image    
                  className="heroImg object-cover object-center rounded-xl h-[51vh]"
                  width={500} 
                  src={DoctorImage}
                  alt="Doctor Image"/>
              </div>

           </div>
       </>
    )
}