"use client";
import PropTypes from "prop-types";
import ListHeader from "@/framework/list/list.header";
import ListBody from "@/framework/list/list.body";
import {
  ListDefinitionProperty,
  ListHeaderDefinitionProperty,
} from "@/framework/list/list.definition";
import { VStack } from "@chakra-ui/react";
import { DatabaseEntryProperty } from "@framework/utils";

const FullList = (props: any) => {
  return (
    <VStack className={`${props.id} __w-full`}>
      {props.headerVisible ? (
        <ListHeader
          id={`${props.id}.header`}
          parentId={props.id}
          definition={props.header}
          onAction={props.headerAction}
          hasRoles={props.hasRoles}
        />
      ) : null}
      <ListBody
        id={`${props.id}.header`}
        parentId={props.id}
        definition={props.list}
        content={props.content}
        onAction={props.listAction}
        hasRoles={props.hasRoles}
      />
    </VStack>
  );
};

FullList.propTypes = {
  id: PropTypes.string.isRequired,
  header: PropTypes.shape(ListHeaderDefinitionProperty).isRequired,
  list: PropTypes.shape(ListDefinitionProperty).isRequired,
  content: PropTypes.arrayOf(PropTypes.shape(DatabaseEntryProperty)).isRequired,
  headerAction: PropTypes.func.isRequired,
  listAction: PropTypes.func.isRequired,
  headerVisible: PropTypes.bool.isRequired,
  hasRoles: PropTypes.func.isRequired,
};
export default FullList;
