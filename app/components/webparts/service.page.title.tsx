import React from "react";
import PropTypes from "prop-types";

const ServicePageTitle = (props: any) => {
  return (
    <div className="flex flex-col items-start">
      {props.titles.map((title: string, index: number) => (
        <div
          key={`spt-${index}`}
          className="text-white text-5xl lg:text-8xl font-bold font-muller uppercase"
        >
          {title}
        </div>
      ))}
    </div>
  );
};

ServicePageTitle.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default ServicePageTitle;
