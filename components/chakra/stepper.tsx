"use client";
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckIcon from "@framework/icons/basic/CheckIcon";
import { optionalFunctionWrapper } from "@framework/utils";

export interface Step {
  index: number;
  caption: string;
  status: "complete" | "incomplete" | "current";
  description?: string;
}

export const
    Stepper = (props: any) => {
  const [steps] = useState<Step[]>(props.steps);

  useEffect(() => {
    console.log("steps changed", steps);
  }, [steps]);

  const clicked = (step: Step) => {
    optionalFunctionWrapper("stepper", props.onChanged)(step);
  };

  return (
    <div className="flex flex-col">
      <div className="__stepper">
        {steps.map((step: Step, index: number) => (
          <Fragment key={"_" + index}>
            <div className="flex flex-col __step-container">
              <div
                className={`__step __${step.status}`}
                key={"s" + index}
                onClick={() => clicked(step)}
              >
                {step.status === "complete" ? (
                  <CheckIcon className="__step-complete" />
                ) : (
                  <span>{step.caption}</span>
                )}
              </div>
            </div>
            {index < props.steps.length - 1 ? (
              <div key={"d" + index} className="__step-line" />
            ) : null}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-between">
        {steps.map((step: Step, index: number) => (
          <div key={`sd-${index}`}>{step.description}</div>
        ))}
      </div>
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      caption: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onChanged: PropTypes.func,
};
export default Stepper;
