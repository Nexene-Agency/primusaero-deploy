"use client";
import {
  Box,
  ChakraProvider,
  FormControl,
  FormLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ArrowLeftIcon from "@framework/icons/basic/ArrowLeftIcon";
import ArrowRightIcon from "@framework/icons/basic/ArrowRightIcon";
import { theme } from "@components/chakra/theme";
import { Checkbox } from "@components/chakra/checkbox";
import SearchIcon from "@framework/icons/basic/SearchIcon";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import CircleEmptyInfoIcon from "@framework/icons/basic/CircleEmptyInfoIcon";
import NavigationElement from "@components/chakra/navigation.element";
import { Step, Stepper } from "@components/chakra/stepper";

const defaultSteps: Step[] = [
  { index: 1, caption: "1", status: "complete" },
  { index: 2, caption: "2", status: "current" },
  { index: 3, caption: "3", status: "incomplete" },
];

const DesignSpecification = () => {
  const [checkBoxState, setCheckBoxState] = useState(false);
  const [steps] = useState<Step[]>(defaultSteps);
  const [selected, setSelected] = useState<Step>(defaultSteps[1]);
  const [searched, setSearched] = useState<string>("");
  const stepperChanged = (step: Step) => {
    setSelected(step);
  };
  return (
    <ChakraProvider theme={theme}>
      <Box p={4} backgroundColor="#E6E4DF">
        <h1>Client-side components</h1>
        <div>
          These components are the fully functional components, some done with
          Chakra, some not. Any code containing a component like this (or the
          component itself) must be encapsulated in a<b>Suspense</b> block on
          server-side pages.
        </div>
        <HStack p={4} alignItems="start">
          <VStack p={4}>
            <button
              onClick={() => console.log("white button clicked")}
              className="__button __white"
            >
              Button
              <ArrowRightIcon />
            </button>
            <button
              onClick={() => console.log("primary button clicked")}
              className="__button __primary __icon-left"
            >
              Button
              <ArrowLeftIcon />
            </button>
            <button
              onClick={() => console.log("secondary button clicked")}
              className="__button __secondary"
            >
              Button
              <ArrowRightIcon />
            </button>
            <button
              onClick={() => console.log("black clicked")}
              className="__button __black __icon-left"
            >
              Button
              <ArrowLeftIcon />
            </button>
            <button
              onClick={() => console.log("icon only button clicked")}
              className="__button __white __icon-only"
            >
              <ArrowRightIcon />
            </button>
            <button
              onClick={() => console.log("round with border clicked")}
              className="__button __round __white __with-border"
            >
              <ArrowRightIcon />
            </button>
            <HStack>
              <Checkbox checked={checkBoxState} onChanged={setCheckBoxState} />
              <Text width={"100px"}>{checkBoxState ? "TRUE" : "FALSE"}</Text>
            </HStack>
          </VStack>
          <VStack p={4} width={"500px"}>
            <FormControl>
              <FormLabel>Input title</FormLabel>
              <input
                type="text"
                placeholder="Input control"
                className="__text-input"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Input title</FormLabel>
              <div className="__input-group">
                <div>
                  <SearchIcon className="__icon" />
                </div>
                <input
                  type="text"
                  className="__text-input"
                  placeholder="Input control"
                  value={searched}
                  onChange={(e) => setSearched(e.target.value)}
                />
                <div onClick={() => setSearched("")}>
                  <MenuCloseIcon className="__icon __on-focus" />
                </div>
              </div>
            </FormControl>
            <NavigationElement
              text="More information"
              url="/design"
              icon={<CircleEmptyInfoIcon />}
            />
            <div>
              <a className="__text-link" href="/design">
                Text Link
              </a>
            </div>
            <div className="__w-full">
              <Stepper steps={steps} onChanged={stepperChanged}></Stepper>
            </div>
            <div className="__w-full">
              <pre>{JSON.stringify(selected)}</pre>
            </div>
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default DesignSpecification;
