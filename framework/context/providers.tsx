"use client";
import { useContext } from "react";
import { EventContext } from "@framework/context/event.context";
import { EnvironmentContext } from "@framework/context/environment.context";

export const useEventContext = () => useContext(EventContext);
export const useEnvironmentContext = () => useContext(EnvironmentContext);
