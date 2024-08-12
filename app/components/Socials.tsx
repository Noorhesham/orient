import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";

const Socials = () => {
  return (
    <div className=" flex flex-col mt-10">
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <p className=" text-xs  text-main2 bg-gray-50 font-[400] mx-auto text-center">OR SIGN IN WITH</p>
        </div>
      </div>
      <div className="flex text-gray-50 self-center mt-3 items-center gap-5">
        <span className="  p-1.5 rounded-full  text-lg bg-main2">
          <FaGoogle />
        </span>
        <span className="  p-1.5 rounded-full  text-lg bg-main2">
          <FaFacebook />
        </span>
        <span className="  p-1.5 rounded-full  text-lg bg-main2">
          <FaLinkedin />
        </span>
      </div>
    </div>
  );
};

export default Socials;
