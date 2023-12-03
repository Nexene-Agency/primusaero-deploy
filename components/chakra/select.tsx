import {KeyboardEvent, useEffect, useRef, useState} from "react";
import {Selectable} from "@framework/model";
import {SelectableProperty} from "@framework/utils";
import PropTypes from "prop-types";
import {getClientTranslator} from "@framework/i18n.client.utils";

const CustomSelect = (props: any) => {
  const t = getClientTranslator();
  const [options, setOptions] = useState<Selectable[]>(props.options || []);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Selectable | undefined>(props.selected);
  const buttonRef = useRef<any>();
  const elementRefs = useRef<any>([]);
  const [popupWidth, setPopupWidth] = useState(0);
  const componentRef = useRef<any>();

  const listener = (event: Event) => {
    // Do nothing if clicking ref's element or descendent elements
    if (!componentRef.current || componentRef.current.contains(event.target as any)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);

  const switchOpen = () => {
    if (buttonRef.current) {
      setPopupWidth(buttonRef.current.getBoundingClientRect().width);
    }
    setOpen(!open);
  };

  const select = (option: Selectable) => {
    setSelected(option);
    setOpen(false);
    buttonRef.current.focus();
    props.select(option);
  };

  const buttonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      setOpen(true);
      setPopupWidth(buttonRef.current.getBoundingClientRect().width);
      console.log(elementRefs.current[0]);
      setTimeout(() => elementRefs.current[0].focus(), 100);
    }
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const optionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, option: Selectable, index: number) => {
    event.preventDefault();
    if (event.key === "ArrowDown" || event.key === "Tab") {
      if (index < options.length - 1) {
        elementRefs.current[index + 1].focus();
      } else {
        elementRefs.current[0].focus();
      }
    }
    if (event.key === "ArrowUp") {
      if (index > 0) {
        elementRefs.current[index - 1].focus();
      } else {
        elementRefs.current[options.length - 1].focus();
      }
    }
    if (event.key === "Escape") {
      buttonRef.current.focus();
      setOpen(false);
    }
    if (event.key === "Enter" || event.key === " " || event.key === "NumPadEnter") {
      select(option);
    }
  };

  return (
    <div className={`${props.containerClass}`} ref={componentRef}>
      <button ref={buttonRef} className={`${props.buttonClass}`}
              onClick={switchOpen} onKeyDown={buttonKeyDown} tabIndex={0}>
        <div>{selected ? (props.noTranslate ? selected.name : t(selected.name)) : t(props.placeholder)}</div>
        {props.icon ? props.icon : null}
      </button>
      <ul className={`${open ? "visible" : "hidden"} absolute z-index-[1000] bg-white ${props.dropDownClass}`}
          style={{width: `${popupWidth}px`}}>
        {options.map((option, index) => (
          <li key={index}>
            <button className={props.optionClass} onClick={() => select(option)}
                    onKeyDown={(event) => optionKeyDown(event, option, index)}
                    ref={el => elementRefs.current[index] = el}
                    tabIndex={0}>{props.noTranslate ? option.name : t(option.name)}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

CustomSelect.propTypes = {
  containerClass: PropTypes.string,
  buttonClass: PropTypes.string,
  optionClass: PropTypes.string,
  dropDownClass: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(SelectableProperty)).isRequired,
  selected: PropTypes.shape(SelectableProperty),
  icon: PropTypes.element,
  select: PropTypes.func.isRequired,
  noTranslate: PropTypes.bool
};

export default CustomSelect;