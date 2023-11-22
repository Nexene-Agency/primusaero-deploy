import React from "react";
import PropTypes from "prop-types";

const ServicePageTitle = (props: any) => {

  return (
    <div className="flex flex-col mt-9 lg:mt-18 ml-6 lg:ml-16 mr-5 lg:mr-14 mb-16 lg:mb-36 items-start">
      {props.titles.map((title: string, index: number) => (
        <div key={`spt-${index}`}
             className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase">{title}</div>
      ))}
    </div>
  );
};

ServicePageTitle.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default ServicePageTitle;
