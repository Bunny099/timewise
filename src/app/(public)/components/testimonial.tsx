"use client";
import { useState } from "react";

const testimonials = [
  {
    image: "/testimonial1.webp",
    feedback:
      "We really focus on work-life balance in remote work… Time tracking reveals if somebody is overburdened and that becomes an immediate conversation.",
    auhor: "-Noah Gedrich, Zehner",
  },
  {
    image: "/testimonial2.webp",
    feedback:
      "We needed something that worked, something super simple, because we don't want to have to teach people how to use it as part of onboarding.",
    auhor: "-Nick Frandsen, Dovetail",
  },
  {
    image: "/testimonial3.webp",
    feedback:
      "Having an easy, clean way to track time allows us to focus on the tough engineering problems where we bring value to our clients.",
    auhor: "-Genevieve Laing, Cooper Perkins",
  },
  {
    image: "/testimonial4.webp",
    feedback:
      "Timewise was key to helping me start my company, it allowed us to move from managing a lot of subcontractors to managing a staff quite easily.",
    auhor: "-Sara Holoubek, Luminary Labs",
  },
];
export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };
  const current = testimonials[index];
  return (
    <div className="flex flex-col gap-4 mt-12 border-t border-orange-500 justify-center items-center py-12">
      <div className=" text-center max-w-2xl">
        <h1 className="text-xl text-orange-500 font-bold tracking-widest uppercase">
          Trusted by 70,000+ companies
        </h1>
        <h1 className="text-3xl md:text-4xl  font-semibold mt-2">
          Helping teams thrive since 2025
        </h1>
        <p className="text-lg md:text-2xl font-light text-gray-600 mt-4">
          Teams of all sizes, types, and industries track time with TimeWise.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center mt-8 max-w-7xl w-full">
        <div className="flex-1">
          <img
            src={current.image}
            alt="testimonial1"
            className="rounded-xl px-4 md:px-0 w-full max-w-2xl mx-auto shadow-md"
          />
        </div>
        <div className="flex-1 px-2 text-center md:text-left">
          <p className="text-xl md:text-2xl  text-gray-800 mb-4">
            {" "}
            {current.feedback}
          </p>
          <p className="text-gray-600 font-medium text-sm">{current.auhor}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          className="border border-orange-500 hover:cursor-pointer hover:bg-orange-600 rounded-full w-6 h-6 bg-orange-500"
        ></button>
        <button
          onClick={handleNext}
          className="border border-orange-500 hover:cursor-pointer hover:bg-orange-600 rounded-full w-6 h-6 bg-orange-500"
        ></button>
      </div>
    </div>
  );
}
