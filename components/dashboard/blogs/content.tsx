"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@components/chakra/theme";
import { NextAuthProvider } from "@components/firebase/provider";
import ContextProviders from "@framework/context/context.providers";
import PropTypes from "prop-types";
import BlogContentEditor from "./content/content";

const BlogContentEditorPage = (props: any) => {
  return (
    <ChakraProvider theme={theme}>
      <NextAuthProvider>
        <ContextProviders>
          <BlogContentEditor id={props.id} />
        </ContextProviders>
      </NextAuthProvider>
    </ChakraProvider>
  );
};

BlogContentEditorPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BlogContentEditorPage;
