import {Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, useDisclosure,} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {SelectableProperty} from "@framework/utils";
import {Selectable} from "@framework/model";
import {KeyboardEvent, useEffect, useRef, useState} from "react";
import TimesIcon from "@framework/icons/basic/TimesIcon";
import {debounce, interval, Subject} from "rxjs";

export type SearchFunction = (search: string) => Selectable[];

const ChipsComponent = (props: any) => {
  const minLength = props.minLength ?? 3;
  const debounceTime = props.debounceTime ?? 500;
  const reload: SearchFunction | undefined = props.reload;
  const [values, setValues] = useState<Selectable[]>(props.values || []);
  const [actualChoices, setActualChoices] = useState<Selectable[]>([]);
  const [typed] = useState<Subject<string>>(new Subject<string>());
  const [lastSearch, setLastSearch] = useState<string>("");
  const [lastInput, setLastInput] = useState<string>("");
  const {isOpen, onOpen, onClose} = useDisclosure();
  // the openedCount needed to keep track of the popup open/close events, otherwise see the useEffect below
  const [openedCount, setOpenedCount] = useState<number>(0);
  const initialRef = useRef<any>();
  const inputRef = useRef<any>();

  /**
   * The debounce for the typed. It is used to prevent event throttle.
   */
  useEffect(() => {
    const subscription = typed
      .pipe(debounce((i) => interval(debounceTime)))
      .subscribe((value: string) => {
        setLastSearch(value);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * When the chips change, the parent must be notified.
   */
  useEffect(() => {
    props.onChange(values);
  }, [values]);

  /**
   * Removes a chip.
   * @param chip The chip to remove
   */
  const remove = (chip: Selectable) => {
    setValues((current) =>
      current.filter((item: Selectable) => item.id !== chip.id)
    );
  };

  /**
   * When the popup closes, the input should regain focus.
   */
  useEffect(() => {
    if (!isOpen && openedCount > 0) {
      // we can focus only if the popup was opened at least once, otherwise every form load would focus the input
      inputRef.current.focus();
    }
  }, [isOpen]);

  /**
   * When the user selects a value from the popup, it must be added to the list if it is not there yet.
   * @param chosen
   */
  const selected = (chosen: Selectable) => {
    const found = values.find((item: Selectable) => item.id === chosen.id);
    if (!found) {
      setValues((current) => [...current, chosen]);
    }
    setLastSearch("");
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  useEffect(() => {
    if (props.reload) {
      // if in dynamic load mode
      if (lastSearch !== "") {
        setActualChoices(props.reload(lastSearch));
      } else {
        setActualChoices([]);
      }
    }
  }, [lastSearch]);

  /**
   * When the actual choices changes, then must open/close the popup.
   */
  useEffect(() => {
    if (actualChoices.length > 0) {
      setOpenedCount((current) => current + 1);
      onOpen();
    } else {
      onClose();
    }
  }, [actualChoices]);

  /**
   * Displays a simple chip.
   * @param chip The chip to display
   */
  const displayChip = (chip: Selectable) => {
    return (
      <div className="__chips-list-item" key={chip.id}>
        {chip.name}
        <span onClick={() => remove(chip)}>
          <TimesIcon className="__chips-remove-icon"/>
        </span>
      </div>
    );
  };

  /**
   * When the user types in something, then:
   * - if in reload mode: when longer then the minimum length, then it will be trigger a reload
   * - if in static mode: simple written to the lastInput
   * @param event
   */
  const changed = (event: any) => {
    if (reload) {
      if (event.target.value && event.target.value.length >= minLength) {
        typed.next(event.target.value);
      }
    }
    setLastInput(event.target.value);
  };

  /**
   * When not in reload mode, then the user can press (any) enter to add the lastInput to the list.
   * @param event The keyboard event
   */
  const inputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (["Enter", "NumpadEnter"].includes(event.code)) {
      event.stopPropagation();
      event.preventDefault();
      if (props.reload) {
        if (!props.enableNew) {
          return;
        }
      }
      const element = {id: lastInput, name: lastInput} as Selectable;
      const alreadyExists = values.find(
        (item: Selectable) => item.id === element.id
      );
      if (!alreadyExists) {
        setValues((current) => [...current, element]);
      }
      inputRef.current.value = "";
      if (props.reload) {
        setLastInput("");
      }
    }
  };

  const buttonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp"].includes(event.code)) {
      event.preventDefault();
      event.stopPropagation();
      const buttonIdx = parseInt(
        (event.target as HTMLButtonElement).dataset.index ?? "0"
      );
      let newButtonIdx =
        event.code === "ArrowUp" ? buttonIdx - 1 : buttonIdx + 1;
      if (newButtonIdx < 0) {
        newButtonIdx = actualChoices.length - 1;
      }
      if (newButtonIdx >= actualChoices.length) {
        newButtonIdx = 0;
      }
      const newButton = document.querySelector(
        `.__chips-popup-item[data-index="${newButtonIdx}"]`
      );
      if (newButton) {
        (newButton as HTMLButtonElement).focus();
      }
    }
  };

  return (
    <div className="__chips">
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom-start"
        closeOnBlur={false}
        initialFocusRef={initialRef}
        // style={{zIndex: 3000}} FIXME!!!
      >
        <PopoverTrigger>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="__chips-input"
            onChange={changed}
            onKeyDown={inputKeyDown}
            borderColor={props.hasError ? "red" : "inherit"}
          />
        </PopoverTrigger>
        <Portal>
          <div className="__chips-popover-elevate">
            <PopoverContent className="__chips-popup">
              <PopoverBody>
                <div className="__chips-popup-list">
                  {actualChoices.map((item: Selectable, index: number) => (
                    <button
                      onClick={() => selected(item)}
                      onKeyDown={buttonKeyDown}
                      key={item.id}
                      className="__chips-popup-item"
                      tabIndex={0}
                      data-index={index}
                      ref={index === 0 ? initialRef : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </PopoverBody>
            </PopoverContent>
          </div>
        </Portal>
      </Popover>
      <div className="__chips-list">
        {values.map((value: Selectable) => displayChip(value))}
      </div>
    </div>
  );
};

ChipsComponent.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape(SelectableProperty)).isRequired,
  reload: PropTypes.func,
  enableNew: PropTypes.bool,
  popupSize: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  minLength: PropTypes.number,
  debounceTime: PropTypes.number,
  hasError: PropTypes.any,
};

export default ChipsComponent;
