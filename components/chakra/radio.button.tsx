import PropTypes from "prop-types";
import RadioButtonChecked from "@components/icons/RadioButtonChecked";
import RadioButtonUnchecked from "@components/icons/RadioButtonUnchecked";

const CustomRadioButton = (props: any) => {

  const doSelect = () => {
    props.select(props.value);
  };

  return (
    <div className={`flex items-center gap-4 cursor-pointer ${props.customClass}`} onClick={doSelect}>
      {props.selected === props.value ? (<RadioButtonChecked/>) : (<RadioButtonUnchecked className="__radio-button"/>)}
      <div>
        {props.children}
      </div>
    </div>
  );
};

CustomRadioButton.propTypes = {
  customClass: PropTypes.string,
  value: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  children: PropTypes.any,
};
export default CustomRadioButton;