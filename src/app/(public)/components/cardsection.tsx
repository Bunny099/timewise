import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";
export default function CardSection() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl  bg-orange-100 mt-4 md:mt-16 p-6 md:p-16 mx-2 md:mx-14 text-center">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
        Start tracking time with TimeWise
      </h1>
      <p className="text-base text-gray-600 pt-3 pb-4 ">
        24/7 Support • Cancel Anytime • Free Forever
      </p>
      <Link
        className=" flex  items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium px-6 py-3 shadow-md rounded-xl transition-all duration-300"
        href="/auth/register"
      >
        Start From NOW <FiArrowRightCircle size={24} />
      </Link>
    </div>
  );
}
