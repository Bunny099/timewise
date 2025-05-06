export default function Free() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mt-16 px-6 md:px-0">
      <img
        src={"/zero.png"}
        alt="zero cost illustration"
        width={350}
        className="mb-8 md:mb-0 md:pr-12 "
      />

      <div className="flex flex-col space-y-4 max-w-md pl-0 md:pl-14">
        <h1 className="text-orange-500 text-4xl font-semibold">Free forver!</h1>
        <div className="flex items-center gap-1">
          <img src="/check.svg" alt="zero checkmarl" width={25} />
          <h2 className="text-xl text-gray-900">Unlimited users</h2>
        </div>
        <div className="flex items-center gap-1">
          <img src="/check.svg" alt="" width={25} />
          <h2 className="text-xl text-gray-900">Unlimited tracking</h2>
        </div>
        <div className="flex items-center gap-1">
          <img src="/check.svg" alt="" width={25} />
          <h2 className="text-xl text-gray-900">Unlimited projects</h2>
        </div>
      </div>
    </div>
  );
}
