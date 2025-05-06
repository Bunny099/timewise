import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";
export default function ServiceShow() {
  return (
    <section className="flex flex-col items-center justify-center py-12 border-y border-orange-500  bg-white">
      <h2 className="text-3xl md:text-4xl text-center font-semibold px-4">
        {" "}
        Trusted by thousands of teams across all industries
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center p-4 my-8 w-full max-w-5xl gap-8">
        {[
          {
            icon: "/client.svg",
            alt: "Active clients Icon",
            value: "30,000+",
            lablel: "Active Companies",
          },
          {
            icon: "/hours.svg",
            alt: "Hours Tracked Icon",
            value: "2 Million",
            lablel: "Hours Tracked",
          },
          {
            icon: "/invoice.svg",
            alt: "Report Created",
            value: "10,000+",
            lablel: "Reports Created",
          },
        ].map((state, index) => (
          <div
            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-6 border-b md:border-b-0 md:border-r last:md:border-r-0 border-orange-500 pb-6 md:pb-0 md:pr-6"
            key={index}
          >
            <img src={state.icon} alt={state.alt} className="w-14 h-14" />
            <div>
              <h3 className="text-3xl font-semibold">{state.value}</h3>
              <p className="text-xl text-gray-600">{state.lablel}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-center px-4">
        <Link
          href="/auth/register"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium px-6 py-3 rounded-xl shadow-md transition-all duration-300 w-full max-w-xs justify-center"
        >
          Create FREE account <FiArrowRightCircle size={24} />
        </Link>
      </div>
    </section>
  );
}
