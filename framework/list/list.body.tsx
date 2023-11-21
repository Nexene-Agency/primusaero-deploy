"use client";
import {Button, Flex, Menu, MenuButton, MenuItem, MenuList, Table, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useMemo, useState} from "react";
import {ListColumnDefinition, ListDefinition, ListDefinitionProperty,} from "./list.definition";
import {classNames, DatabaseEntryProperty} from "@framework/utils";
import {Selectable} from "@framework/model";
import {LIST_ITEM_DETAILS} from "@/framework/constants";
import MoreVerticalIcon from "@framework/icons/basic/MoreVerticalIcon";
import {getClientTranslator} from "@framework/i18n.client.utils";

const ListBody = (props: any) => {
  const t = getClientTranslator();
  const [id] = useState<string>(props.id);
  const definition = useMemo<ListDefinition<any>>(() => {
    return props.definition;
  }, []);

  const renderAction = (action: Selectable, row: any) => {
    if (!props.hasRoles(action, row)) {
      return null;
    }
    return (
      <MenuItem key={action.name} onClick={() => props.onAction(action, row)}>
        <Flex gap={2} alignItems="center">
          <span>{action.icon ? action.icon : null}</span>
          <span>{t(action.name)}</span>
        </Flex>
      </MenuItem>
    );
  };

  const renderMenu = (row: any) => {
    return (
      <Menu preventOverflow={true}>
        <MenuButton>
          <MoreVerticalIcon className="__menu-icon"/>
        </MenuButton>
        <MenuList>
          {definition.operations?.map((current: Selectable) =>
            renderAction(current, row)
          )}
        </MenuList>
      </Menu>
    );
  };

  const renderDetailsAction = (row: any) => (
    <Button onClick={() => props.onAction(LIST_ITEM_DETAILS, row)}>
      {LIST_ITEM_DETAILS.icon}
    </Button>
  );

  const getColumnNumbers = () => {
    return definition.columns.length + (definition.operations ? 1 : 0);
  };

  return (
    <div className="w-full">
      <Table>
        <Thead>
          <Tr className={classNames("__list-header", id)}>
            {definition.columns.map((current: ListColumnDefinition<any>) => (
              <Th
                key={`list-${id}-${current.name}`}
                className={classNames(
                  "__list-header-cell",
                  id,
                  current.name,
                  current.getClass(current)
                )}
              >
                {/* @ts-ignore*/}
                {t(current.title)}
              </Th>
            ))}
            {definition.operations ? <Th>&nbsp;</Th> : null}
          </Tr>
        </Thead>
        <Tbody>
          {props.content.length < 1 ? (
            <Tr>
              <Td colSpan={getColumnNumbers()}>{t("errors.list.empty")}</Td>
            </Tr>
          ) : (
            props.content.map((row: any) => (
              <Tr
                key={`row-${row.id}`}
                className={classNames("__list-data-row align-top", id, row.id)}
              >
                {definition.columns.map(
                  (current: ListColumnDefinition<any>) => (
                    <Td
                      className={classNames(
                        current.getClass(current, row),
                        "__list-data-cell",
                        id,
                        current.name
                      )}
                      key={`col-${current.getRowId(row)}-${current.name}`}
                    >
                      <>{current.getValue(current, row)}</>
                    </Td>
                  )
                )}
                {definition.operations ? <Td>{renderMenu(row)}</Td> : null}
                {definition.detailsAction ? (
                  <Td>{renderDetailsAction(row)}</Td>
                ) : null}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
};

ListBody.propTypes = {
  id: PropTypes.string.isRequired,
  definition: PropTypes.shape(ListDefinitionProperty).isRequired,
  content: PropTypes.arrayOf(PropTypes.shape(DatabaseEntryProperty)).isRequired,
  parentId: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  hasRoles: PropTypes.func.isRequired,
};

export default ListBody;
