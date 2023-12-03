import CustomRadioButton from "@components/chakra/radio.button";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getClientTranslator} from "@framework/i18n.client.utils";

export const CustomRadioButtons = (props: any) => {
  const t = getClientTranslator();
  const [options] = useState<string[]>(props.options);
  const [selected, setSelected] = useState<string>(props.selected);
  const [buttonClass, setButtonClass] = useState<string>(props.buttonClass ?? "");

  const doSelect = (value: string) => {
    setSelected(value);
  };

  useEffect(() => {
    props.select(selected);
  });

  return (
    <div className={props.class}>
      {options.map((value) => {
        return (
          <CustomRadioButton key={value} value={value} select={doSelect} selected={selected}
                             customClass={buttonClass}>
            {t(`${props.translatePrefix}.${value}`)}
          </CustomRadioButton>
        );
      })}
    </div>
  );
};

CustomRadioButtons.propTypes = {
  translatePrefix: PropTypes.string.isRequired,
  class: PropTypes.string,
  buttonClass: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  children: PropTypes.any,
};
export default CustomRadioButtons;