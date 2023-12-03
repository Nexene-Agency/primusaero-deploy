import PropTypes from "prop-types";
import React from "react";

const PrimaryButton = (props: any) => {

  const renderAsLink = () => (
    <a href={props.disabled ? "#" : props.target}
       className={`pl-4 pr-4 h-11 pt-3.5 pb-3.5 text-lg font-normal rounded-3xl justify-start items-center gap-2.5 flex flex-row ${props.class ?? "bg-stone-950 text-white"}`}>
      {props.children}
    </a>
  );

  const renderAsButton = () => (
    <button onClick={props.onClick} type="button" disabled={props.disabled}
            className={`pl-4 pr-4 h-11 pt-3.5 pb-3.5 text-lg font-normal rounded-3xl justify-start items-center gap-2.5 flex flex-row ${props.class ?? "bg-stone-950 text-white"}`}>
      {props.children}
    </button>
  );

  return props.asLink ? renderAsLink() : renderAsButton();
};

PrimaryButton.propTypes = {
  disabled: PropTypes.bool,
  class: PropTypes.string,
  asLink: PropTypes.bool,
  target: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any
};

export default PrimaryButton;