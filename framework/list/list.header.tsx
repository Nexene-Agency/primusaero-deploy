"use client";
import {Button, Flex, Input, Select} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useEffect, useMemo, useState} from "react";
import {
  ListFilterDefinition,
  ListFilterValue,
  ListHeaderDefinition,
  ListHeaderDefinitionProperty,
} from "./list.definition";
import {AppCommandType, Command, listOperationCommand,} from "@framework/events";
import SearchIcon from "@/framework/icons/basic/SearchIcon";
import {Selectable} from "@framework/model";
import {classNames} from "@framework/utils";
import {getClientTranslator} from "@framework/i18n.client.utils";

/**
 * A simple list header control.
 *
 * <p>
 *   Displays a toolbar.
 *
 * @param props The properties
 * @constructor
 */
const ListHeader = (props: any) => {
  const t = getClientTranslator();
  const [id] = useState<string>(props.id);
  const definition = useMemo<ListHeaderDefinition>(() => {
    return props.definition;
  }, []);
  const [disabledOperations, setDisabledOperations] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<ListFilterValue>({
    fieldName: "name",
    value: "",
    type: "string",
  });
  const [command, setCommand] = useState<Command>(props.command);

  useEffect(() => {
    if (!command) {
      return;
    }
    switch (command.command) {
      case AppCommandType.DISABLE_OPERATIONS: {
        setDisabledOperations(command.payload as string[]);
        break;
      }
    }
  }, [command]);

  const renderOperation = (item: Selectable) => {
    return (
      <Button
        variant="outline"
        onClick={() =>
          props.onAction(
            listOperationCommand({
              ...item,
              context: props.context,
            })
          )
        }
        className={`${definition.className ?? ""} __list-header-button ${id} ${
          item.id
        }`}
        isDisabled={disabledOperations.includes(item.id)}
        key={item.name}
        title={t(item.name)!}
      >
        {/*// @ts-ignore*/}
        {item.icon}
      </Button>
    );
  };

  const renderOperations = (operations: Selectable[]) => {
    return (
      <>
        {operations
          .filter((current) => props.hasRoles(current))
          .map((current: Selectable) => renderOperation(current))}
      </>
    );
  };

  const newFilterValue = (event: any) => {
    setFilterValue({...filterValue, value: event.target.value});
  };

  const newFilterFieldName = (event: any) => {
    setFilterValue({...filterValue, fieldName: event.target.value});
  };

  useEffect(() => {
    console.log("Filter value changed: ", filterValue);
  }, [filterValue]);

  const renderFilter = () => {
    // FIXME: test it
    if (
      definition.filterDefinitions &&
      definition.filterDefinitions.length > 0
    ) {
      return (
        <Flex gap="1em">
          <Select value={filterValue.fieldName} onChange={newFilterFieldName}>
            {definition.filterDefinitions.map(
              (current: ListFilterDefinition) => (
                <option key={current.fieldName}>{t(current.label)}</option>
              )
            )}
          </Select>
          <Input
            className={classNames(
              definition.className || "",
              "list-header-filter-input" // FIXME
            )}
            value={filterValue.value as string}
            onChange={newFilterValue}
          ></Input>
          <Button
            variant="outline"
            title={t("actions.search")!}
            isDisabled={(filterValue.value as string).length < 3}
            className={classNames(
              definition.className || "",
              "list-header-operation filter-button", // FIXME
              id
            )}
          >
            <SearchIcon className="list-header-operation-icon"/>
          </Button>
        </Flex>
      );
    }
    return null;
  };

  return (
    <div
      className={`${definition.className} flex flex-row w-full ${id} items-center p-2`}
    >
      {definition.operations ? renderOperations(definition.operations) : null}
      {renderFilter()}
      <div className="flex-grow"/>
    </div>
  );
};

ListHeader.propTypes = {
  definition: PropTypes.shape(ListHeaderDefinitionProperty),
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  context: PropTypes.any,
  command: PropTypes.any,
  onAction: PropTypes.func.isRequired,
  hasRoles: PropTypes.func.isRequired,
};

export default ListHeader;
