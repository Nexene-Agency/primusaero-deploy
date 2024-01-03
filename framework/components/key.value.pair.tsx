import PropTypes from "prop-types";
import {useEffect, useMemo, useState} from "react";
import {Input} from "@chakra-ui/react";

const KeyValuePair = (props: any) => {
  const identifier = useMemo<string>(() => props.identifier, []);
  const [value, setValue] = useState<string>(props.value ?? "");
  const [maxLen] = useState<number>(props.maxLen ?? 512);
  const [error, setError] = useState<boolean>(false);

  const changed = (event: any) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setError(value.trim().length > maxLen);
    props.onChanged(identifier, value, error);
  }, [value]);

  return (
    <div className={props.containerClass}>
      <div className={props.identifierClass}>{identifier}</div>
      <Input className={props.inputClass} id={`input-${identifier}`} defaultValue={value} onChange={changed}
             borderColor={error ? "red" : "inherit"}></Input>
    </div>
  );
};

KeyValuePair.propTypes = {
  containerClass: PropTypes.string,
  identifierClass: PropTypes.string,
  inputClass: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChanged: PropTypes.func.isRequired,
  maxLen: PropTypes.number
};
export default KeyValuePair;
