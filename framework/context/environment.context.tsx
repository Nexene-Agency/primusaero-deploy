"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ENVIRONMENT_KEYS } from "@framework/model";
import { fromLocalStorage, toLocalStorage } from "@framework/utils";

export interface Environment {
  currentLanguage: string;
  currentLocale: string;
  currentListSize: number;
}

interface EnvironmentContext {
  environment: Environment;
  setEnvironment: Dispatch<SetStateAction<Environment>>;
}

export const EnvironmentContext = createContext<EnvironmentContext>(
  {} as EnvironmentContext
);

export const EnvironmentContextProvider = (props: any) => {
  const [environment, setEnvironment] = useState<Environment>({
    currentLanguage: fromLocalStorage(
      ENVIRONMENT_KEYS.CURRENT_LANGUAGE,
      "en"
    ) as string,
    currentLocale: fromLocalStorage(
      ENVIRONMENT_KEYS.CURRENT_LOCALE,
      "en-gb"
    ) as string,
    currentListSize: parseInt(
      fromLocalStorage(ENVIRONMENT_KEYS.CURRENT_LIST_SIZE, "10") as string
    ),
  });
  const [timeStamp, setTimeStamp] = useState<number>(new Date().getTime());

  useEffect(() => {
    console.log("creating environment context", timeStamp);
  }, []);

  useEffect(() => {
    console.log("setting environment to local storage", environment);
    toLocalStorage(
      ENVIRONMENT_KEYS.CURRENT_LANGUAGE,
      environment.currentLanguage
    );
    // i18n.changeLanguage(environment.currentLanguage);
    toLocalStorage(ENVIRONMENT_KEYS.CURRENT_LOCALE, environment.currentLocale);
  }, [environment]);

  const value = useMemo(
    () => ({
      environment,
      setEnvironment,
    }),
    [environment]
  );

  return (
    <EnvironmentContext.Provider value={value}>
      {props.children}
    </EnvironmentContext.Provider>
  );
};
