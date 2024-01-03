import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import KeyValuePair from "@framework/components/key.value.pair";

const KeyValueList = (props: any) => {
  const [payload, setPayload] = useState<Record<string, string>>(props.payload ?? {});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const changed = (identifier: string, value: string, error: boolean) => {
    setPayload((prev) => ({...prev, [identifier]: value}));
    setErrors((prev) => ({...prev, [identifier]: error}));
  };

  useEffect(() => {
    props.onChanged(payload, errors);
  }, [payload, errors]);

  return (
    <div className={props.listContainerClass}>
      {Object.keys(payload).map((key) => (
        <KeyValuePair key={key} identifier={key} onChanged={changed} value={payload[key]}
                      containerClass={props.containerClass} identifierClass={props.identifierClass}
                      inputClass={props.inputClass}
                      maxLen={props.maxLen}></KeyValuePair>
      ))}
    </div>
  );
};

KeyValueList.propTypes = {
  listContainerClass: PropTypes.string,
  containerClass: PropTypes.string,
  identifierClass: PropTypes.string,
  inputClass: PropTypes.string,
  payload: PropTypes.object.isRequired,
  onChanged: PropTypes.func.isRequired,
  maxLen: PropTypes.number,
};

export default KeyValueList;