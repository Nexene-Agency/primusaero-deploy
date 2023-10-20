"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@chakra-ui/react";

export const Checkbox = (props: any) => {
  const [checked, setChecked] = useState(props.checked);
  const theme = useTheme();

  const clicked = (event: any) => {
    setChecked((current: boolean) => {
      return !current;
    });
  };

  useEffect(() => {
    props.onChanged(checked);
  }, [checked]);

  return (
    <div
      className={`__checkbox ${checked ? "__checked" : "__unchecked"}`}
      onClick={clicked}
    />
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChanged: PropTypes.func.isRequired,
};
export default Checkbox;
