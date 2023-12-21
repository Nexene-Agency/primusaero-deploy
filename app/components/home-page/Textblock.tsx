const Textblock = () => {
  return (
    <div>
      <div className="w-[1408px] h-[231px] justify-start items-start gap-[194px] inline-flex mb-1">
        <div className="w-[340px] text-stone-950 text-[22px] font-normal font-['Nimbus Sans'] leading-[27px]">
          What We Do
        </div>
        <div className="flex-col justify-start items-start gap-16 inline-flex">
          <div className="w-[874px]">
            <span className="text-stone-950 text-[22px] font-normal font-['Nimbus Sans'] leading-[27px]">
              Navigating the Skies with Excellence and Passion.
              <br />
              <br />
            </span>
            <span className="text-neutral-500 text-[22px] font-normal font-['Nimbus Sans'] leading-[27px]">
              PRIMUS AERO obtains a decade of steadfast commitment and a broad
              spectrum of services to elevate your private aircraft operation
              experience. Our expertise and devotion to aviation are reflected
              in every facet of our services, ensuring that we meet and exceed
              your expectations.{" "}
            </span>
          </div>
          <div className="pl-6 pr-[18px] pt-[15px] pb-[17px] bg-stone-950 rounded-[40px] flex-col justify-start items-start gap-2.5 flex">
            <div className="justify-start items-center gap-2 inline-flex">
              <div className="text-right text-white text-lg font-normal font-['Nimbus Sans']">
                Get in touch
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Textblock;
