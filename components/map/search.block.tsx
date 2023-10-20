"use client";
import React, { KeyboardEvent, useEffect, useRef } from "react";
import "./search.block.css";
import { DatabaseEntry } from "@framework/firebase.utils";
import { Location } from "@components/dashboard/locations/model";
import { getClientTranslator } from "@framework/i18n.client.utils";
import axios from "axios";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import SearchIcon from "@framework/icons/basic/SearchIcon";
import PropTypes from "prop-types";
import { MapSearchFilters } from "@components/map/interfaces";
import { ListContent } from "@framework/list/list.definition";

const SearchBlock = (props: any) => {
  const toSearch = useRef<string>("");
  const t = getClientTranslator();
  const inputRef = useRef<HTMLInputElement>(null);
  const filters = props.filters as MapSearchFilters;
  const lastHits = useRef<DatabaseEntry<Location>[] | undefined>(undefined);
  const toast = useToast();
  const textChanged = (event: any) => {
    toSearch.current = event.target.value;
  };

  const filterAsType = (): string[] => {
    const result: string[] = [];
    if (filters.rentals) {
      result.push("rental");
    }
    if (filters.garages) {
      result.push("garage");
    }
    if (filters.magazinStores) {
      result.push("magazinStore");
    }
    if (filters.shops) {
      result.push("shop");
    }
    if (filters.campgrounds) {
      result.push("campground");
    }

    return result;
  };

  useEffect(() => {
    if (lastHits.current || toSearch.current !== "") {
      doSearch();
    }
  }, [filters]);

  const doSearch = () => {
    axios
      .get(
        `/api/locations?text=${toSearch.current}&types=${filterAsType().join(
          ","
        )}`
      )
      .then((result) => {
        const found = result.data as ListContent<Location>;
        if (found.data.length < 1) {
          lastHits.current = undefined;
          toast({
            status: "warning",
            title: t("app.location.errors.notFound"),
            isClosable: true,
            duration: 2000, // FIXME: add to environment
          });
        } else {
          props.onResult(found.data);
          lastHits.current = found.data;
        }
      })
      .catch((error) => {
        console.log(error);
        // sendEvent(asError("app.location.errors.cannotSearch", ""));
        toast({
          status: "error",
          title: t("app.location.errors.cannotSearch"),
          isClosable: true,
          duration: 2000, // FIXME: add to environment
        });
        props.onResult([]);
      });
  };

  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "NumpadEnter"].includes(event.code)) {
      event.preventDefault();
      event.stopPropagation();
      doSearch();
    }
  };

  const clearSearch = () => {
    lastHits.current = undefined;
    toSearch.current = "";
    inputRef.current!.value = "";
    inputRef.current!.focus();
    props.onResult([]);
  };

  return (
    <div className="__search-overlay">
      <div className={`__vstack __w-full`}>
        <InputGroup
          className={`__search-input-group ${
            lastHits.current && lastHits.current?.length > 0 ? "results" : ""
          }`}
        >
          <InputLeftElement className="__search-container">
            <SearchIcon
              className="__menu-icon cursor-pointer"
              onClick={doSearch}
            />
          </InputLeftElement>
          <Input
            placeholder="search...."
            className="__search-input"
            ref={inputRef}
            onSelect={textChanged}
            onKeyDown={onKeyDown}
          ></Input>
          <InputRightElement className="__clear-search-container">
            <MenuCloseIcon
              onClick={clearSearch}
              className={`__menu-icon __clear-search-icon`}
            />
          </InputRightElement>
        </InputGroup>
      </div>
    </div>
  );
};

SearchBlock.propTypes = {
  onResult: PropTypes.func.isRequired,
  filters: PropTypes.any.isRequired,
};

export default SearchBlock;
