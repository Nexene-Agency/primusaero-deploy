"use client";
import { EnvironmentContextProvider } from "./environment.context";
import { EventContextProvider } from "./event.context";
import Toasts from "@framework/toasts";

const ContextProviders = async (props: any) => {
  return (
    <EventContextProvider>
      <EnvironmentContextProvider>{props?.children}</EnvironmentContextProvider>
      <Toasts />
    </EventContextProvider>
  );
};

export default ContextProviders;
