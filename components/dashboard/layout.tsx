"use client";
import {ChakraProvider} from "@chakra-ui/react";
import DashboardHeader from "@components/dashboard/header";
import DashboardMenu from "@components/dashboard/menu";
import React from "react";
import {NextAuthProvider} from "@components/firebase/provider";
import {theme} from "@components/chakra/theme";
import ContextProviders from "@framework/context/context.providers";

const DashboardLayout = (props: any) => {
  return (
    <ChakraProvider theme={theme}>
      <NextAuthProvider>
        <ContextProviders>
          <div className="flex flex-col w-full">
            <DashboardHeader/>
            <div className="flex flex-row w-full items-start">
              <DashboardMenu/>
              <div className="flex w-full">{props.children}</div>
            </div>
          </div>
        </ContextProviders>
      </NextAuthProvider>
    </ChakraProvider>
  );
};

export default DashboardLayout;
