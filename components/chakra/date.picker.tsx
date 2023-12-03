import Calendar from "react-calendar";
import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import "react-calendar/dist/Calendar.css";
import "./date.picker.css";
import {getClientTranslator, getCurrentLocale, getFormattedDate} from "@framework/i18n.client.utils";
import CalendarIcon from "@components/icons/CalendarIcon";
import ArrowButtonLeft from "@components/icons/ArrowButtonLeft";
import ArrowButtonRight from "@components/icons/ArrowButtonRight";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker = (props: any) => {
  const t = getClientTranslator();
  const locale = getCurrentLocale();
  const [value, setValue] = useState<Value>(props.value);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    console.log("date selected", value);
    props.select(value);
    setOpen(false);
  }, [value]);

  const switchCalendar = () => {
    setOpen(!open);
  };

  return (
    <div ref={componentRef}>
      <button
        className="flex item-center pb-[3px] w-full text-neutral-500 focus:text-stone-950 focus:outline-none border-b border-stone-950 justify-between"
        onClick={switchCalendar}>
        <div className={`${open ? "text-black" : ""} text-lg font-normal`}>{getFormattedDate(value as Date)}</div>
        <CalendarIcon/>
      </button>
      <div className={`${open ? "visible" : "hidden"} absolute z-index-[2000]`}>
        <Calendar onChange={setValue} locale={locale} value={value} minDate={props.minDate} next2Label={null}
                  prevLabel={<ArrowButtonLeft/>} nextLabel={<ArrowButtonRight/>}
                  tileDisabled={({date}) => [0].includes(date.getDay())}
                  prev2Label={null} view="month" minDetail="month" maxDetail="month"/>
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  value: PropTypes.any,
  select: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
};


export default DatePicker;