import PropTypes from "prop-types";
import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "@components/chakra/theme";
import FileContentEditor from "@components/dashboard/contents/editor/editor";
import {NextAuthProvider} from "@components/firebase/provider";
import ContextProviders from "@framework/context/context.providers";

const FileContentEditorPage = (props: any) => {
  return (
    <ChakraProvider theme={theme}>
      <NextAuthProvider>
        <ContextProviders>
          <FileContentEditor id={props.id}/>
        </ContextProviders>
      </NextAuthProvider>
    </ChakraProvider>
  );
};

FileContentEditorPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FileContentEditorPage;
