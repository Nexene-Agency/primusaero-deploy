"use client";
import { Box, ChakraProvider, HStack, VStack } from "@chakra-ui/react";
import DashboardHeader from "@components/dashboard/header";
import DashboardMenu from "@components/dashboard/menu";
import React from "react";
import { NextAuthProvider } from "@components/firebase/provider";
import { theme } from "@components/chakra/theme";
import ContextProviders from "@framework/context/context.providers";

const DashboardLayout = (props: any) => {
  return (
    <ChakraProvider theme={theme}>
      <NextAuthProvider>
        <ContextProviders>
          <VStack className="__w-full">
            <DashboardHeader />
            <HStack className="__w-full" alignItems="start">
              <DashboardMenu />
              <Box className="__w-full">{props.children}</Box>
            </HStack>
          </VStack>
        </ContextProviders>
      </NextAuthProvider>
    </ChakraProvider>
  );
};

export default DashboardLayout;
