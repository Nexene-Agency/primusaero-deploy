"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { AppEvent, AppEventType, CommandPayload } from "@/framework/events";
import { Subject } from "rxjs";

interface EventContext {
  eventBus: Subject<AppEvent>;
  sendCommand: (payload: CommandPayload) => void;
  sendEvent: (event: AppEvent) => void;
}

export const EventContext = createContext<EventContext>({} as EventContext);

export const EventContextProvider = (props: any) => {
  // const toInitialize = useRef<boolean>(process.env.NEXT_PUBLIC_DEVELOPMENT === "true");
  const [eventBus] = useState<Subject<AppEvent>>(new Subject<AppEvent>());
  const [timeStamp, setTimeStamp] = useState<number>(new Date().getTime());

  useEffect(() => {
    console.log("creating event context", timeStamp);
  }, []);

  const sendCommand = (payload: CommandPayload) => {
    console.log("sending command", timeStamp, payload);
    eventBus.next({ type: AppEventType.COMMAND, payload });
  };
  const sendEvent = (event: AppEvent) => {
    console.log("sending event", timeStamp, event);
    eventBus.next(event);
  };

  const value = useMemo(
    () => ({
      eventBus,
      sendCommand,
      sendEvent,
    }),
    []
  );

  return (
    <EventContext.Provider value={value}>
      {props.children}
    </EventContext.Provider>
  );
};
