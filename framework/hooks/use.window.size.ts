import {useLayoutEffect, useState} from "react";

export enum DeviceType {
  MOBILE,
  TABLET,
  DESKTOP,
}

export interface WindowSize {
  width: number;
  height: number;
  device: DeviceType;
}

export const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    device: DeviceType.TABLET,
  });

  const getDevice = (width: number): DeviceType => {
    let result = DeviceType.MOBILE;
    if (width > 640) {
      result = DeviceType.TABLET;
    }
    if (width > 1040) {
      result = DeviceType.DESKTOP;
    }
    return result;
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      console.log("setting new size");
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        device: getDevice(window.innerWidth),
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};
