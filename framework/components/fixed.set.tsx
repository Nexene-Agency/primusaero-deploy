import PropTypes from "prop-types";
import { Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getClientTranslator } from "@framework/i18n.client.utils";

const FixedSet = (props: any) => {
  const t = getClientTranslator();
  const [choices] = useState<string[]>(props.choices);
  const [values, setValues] = useState<string[]>(props.values);

  const change = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];
    setValues(newValues);
  };

  useEffect(() => {
    props.onChange(values);
  }, [values]);

  const renderElement = (value: string) => {
    return (
      // @ts-ignore
      <Switch
        key={`fs-${value}`}
        isChecked={values.includes(value)}
        onChange={() => change(value)}
      >
        {t(`${props.textKey}.${value}`)}
      </Switch>
    );
  };

  return (
    <div className={`__fixed-set ${props.id}`}>
      {choices.map((current: string) => renderElement(current))}
    </div>
  );
};

FixedSet.propTypes = {
  id: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  textKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FixedSet;
