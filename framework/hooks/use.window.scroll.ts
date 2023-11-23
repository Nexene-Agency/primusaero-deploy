import {useCallback, useLayoutEffect, useState} from "react";

export interface WindowPosition {
  x: number;
  y: number;
  behavior?: ScrollBehavior;
}

export const useWindowScroll = (): [WindowPosition, ((param: WindowPosition) => void)] => {
  const [state, setState] = useState<WindowPosition>({x: 0, y: 0});

  const scrollTo = useCallback((param: WindowPosition) => {
    if (Reflect.has(param as object, "x") && Reflect.has(param as object, "y")) {
      window.scrollTo({left: param.x, top: param.y, behavior: param.behavior} as ScrollToOptions);
    }
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setState({x: window.scrollX, y: window.scrollY});
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [state, scrollTo];
};
