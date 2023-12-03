"use client";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CheckboxUnchecked from "@components/icons/CheckboxUnchecked";
import CheckboxChecked from "@components/icons/CheckboxChecked";

export const Checkbox = (props: any) => {
  const [checked, setChecked] = useState(props.checked ?? false);

  const clicked = (event: any) => {
    setChecked((current: boolean) => {
      return !current;
    });
  };

  useEffect(() => {
    props.onChanged(checked);
  }, [checked]);

  return (
    <div className="flex items-center   gap-3" onClick={clicked}>
      <div>
        {
          checked ? <CheckboxChecked className="__checkbox __checked"/> :
            <CheckboxUnchecked className="__checkbox __unchecked"/>
        }
      </div>
      <div>
        {props.children}
      </div>
    </div>);
};

Checkbox.propTypes = {
  children: PropTypes.any,
  checked: PropTypes.bool,
  onChanged: PropTypes.func.isRequired,
};
export default Checkbox;
