import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";
export default function Join() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around mt-10 border-t border-orange-400 p-6 px-4 md:px-14 py-12 max-auto ">
      <div className="md:w-1/2  ">
        <h1 className="text-3xl md:text-5xl text-center md:text-left font-semibold text-gray-900">
          Start tracking time today
        </h1>
        <p className="text-xl md:text-2xl text-center md:text-left font-light text-gray-600 pt-6 pb-4">
          Join 70,000+ companies spending their time wisely with TimeWise.
        </p>

        <div className="flex justify-center md:justify-start">
          <Link
            className=" flex  items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium px-6 py-3 shadow-md rounded-xl transition-all duration-300"
            href="/auth/register"
          >
            Try Timewise Free <FiArrowRightCircle size={24} />
          </Link>
        </div>
      </div>
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={"/computer.svg"}
          alt="time tracking interface"
          className="w-full max-w-md "
        />
      </div>
    </div>
  );
}
