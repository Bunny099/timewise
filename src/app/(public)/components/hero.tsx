export default function Hero() {
  return (
    <div className="flex flex-col  md:flex-row items-center justify-between my-20 px-6 md:px-16  ">
      <div className="flex flex-col w-full  md:w-2/5  space-y-4">
        <h1 className="text-4xl md:text-5xl text-center md:text-left font-semibold leading-tight">
          Track Time. Boost Productivity. Own Your Day.
        </h1>
        <p className="text-base text-gray-500 text-center md:text-left">
          Timewise helps you manage projects, log work hours, and generate
          insightful reports—all in one seamless platform designed for
          professionals who value clarity and control.
        </p>
      </div>
      <div className="md:w-3/5 w-full mt-10 md:mt-0">
        <img
          src={"/report.png"}
          alt="Timewise dashboard"
          className="rounded-xl shadow-md  w-full object-cover"
        />
      </div>
    </div>
  );
}
