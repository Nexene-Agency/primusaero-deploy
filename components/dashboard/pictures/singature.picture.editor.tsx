import React, { ChangeEvent } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import {
  Picture,
  PICTURES_COLLECTION,
} from "@components/dashboard/pictures/model";
import { DatabaseEntry, dbUrl } from "@framework/firebase.utils";
import "./signature.picture.editor.css";
import { queryBuilder } from "@framework/query.builder";
import { ListContent } from "@framework/list/list.definition";

const SignaturePictureEditorTab = (props: any) => {
  const [searchText, setSearchText] = React.useState<string>(props.imageTag);
  const [hits, setHits] = React.useState<ListContent<Picture>>({
    data: [],
    pageSize: 32,
  });
  const [selected, setSelected] = React.useState<string>(props.imageTag);

  const doSearch = () => {
    console.log(searchText);
    const query = queryBuilder()
      .filterBy("name", ">=", searchText)
      .filterBy("name", "<=", searchText + "\uf8ff")
      .limit(32)
      .build();
    axios.post(dbUrl(PICTURES_COLLECTION), query).then((response) => {
      setHits(response.data);
    });
  };

  const changed = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const imageSelected = (item: DatabaseEntry<Picture>) => {
    setSelected(item.id!);
    props.onSelected([item.data.imageURL, item.data.previewURL]);
  };

  // TODO: create a normal search component, with inputgroup
  return (
    <div className="__vstack __gap-8px __w-full">
      <div className="__hstack __gap-8px __w-full">
        <Input
          id="searchText"
          defaultValue={searchText}
          onChange={changed}
          autoFocus={true}
        />
        <Button onClick={doSearch}>search</Button>
      </div>
      <div className="__hstack __gap-16px __wrap __preview-pictures __padding-5">
        {hits.data.map((item) => (
          <div
            key={item.id}
            className={`__vstack __preview-picture ${
              item.id === selected ? "selected" : "not-selected"
            }`}
            onClick={() => imageSelected(item)}
          >
            <img src={item.data.previewURL} />
            <div>{item.data.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

SignaturePictureEditorTab.propTypes = {
  imageTag: PropTypes.string,
  onSelected: PropTypes.func.isRequired,
};
export default SignaturePictureEditorTab;
