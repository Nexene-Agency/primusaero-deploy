"use client";
/* eslint-disable react/no-children-prop */
import { DatabaseEntry } from "@framework/firebase.utils";
import { Location } from "@components/dashboard/locations/model";
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./search.result.block.css";
import { getClientTranslator } from "@framework/i18n.client.utils";
import MapIcon from "@framework/icons/basic/MapIcon";
import { Picture } from "@components/dashboard/pictures/model";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { asMapMarker } from "@framework/googlemaps/model";
import Gallery from "@components/gallery/gallery";
import { ListContent } from "@framework/list/list.definition";
import { DeviceType, useWindowSize } from "@framework/hooks/use.window.size";
import AppShare from "@components/icons/obsolete/AppShare";
import AppInfo from "@components/icons/obsolete/AppInfo";

const SearchResultBlock = (props: any) => {
  const t = getClientTranslator();
  const selected = useRef<DatabaseEntry<Location> | undefined>(undefined);
  const [pictures, setPictures] = useState<ListContent<DatabaseEntry<Picture>>>(
    {
      data: [],
      pageSize: 32,
    }
  );
  const [refresh, setRefresh] = useState<number>(0);
  const windowSize = useWindowSize();

  const partnerSelected = (location: DatabaseEntry<Location>) => {
    selected.current = location;
    props.onSelected(asMapMarker(location.id!, location.data.address));
    setPictures({ data: [], pageSize: 32 });
    axios.get(`api/images/${location.data.imageTag}`).then((response) => {
      setPictures(response.data);
    });
  };

  const renderHitBlock = (location: DatabaseEntry<Location>) => {
    return (
      <div
        className="flex w-full items-start __hit-block"
        onClick={() => partnerSelected(location)}
        key={Math.random()}
      >
        <div className="flex flex-col items-start w-full __hit-name __left">
          <div className="__hit-title">{location.data.name}</div>
          <div className="__hit-types">
            {location.data?.type
              .map((type: string, index: number) => {
                return t(`app.location.types.singular.${type}`);
              })
              .join(", ")}
          </div>
        </div>
        <div className="__hit-image">
          <img src={location.data.signaturePreview} />
        </div>
      </div>
    );
  };

  const renderHits = () => {
    if (props.locations.length === 0) {
      return <></>;
    } else {
      return (
        <>
          {windowSize.device === DeviceType.DESKTOP ? (
            <div className="__top-placeholder"></div>
          ) : null}
          <div className="__hit-list">
            {props.locations.map((location: DatabaseEntry<Location>) =>
              renderHitBlock(location)
            )}
          </div>
        </>
      );
    }
  };

  const renderSelected = () => (
    <div className="__single-hit">
      <div className="flex flex-col w-full">
        <img
          className="__signature-picture"
          src={selected.current?.data.signaturePicture}
        />
        <div className="__top-section">
          <div className="__partner-name ">{selected.current?.data?.name}</div>
          <div className="__partner-text gap-2 flex">
            {selected.current?.data?.type
              .map((type: string, index: number) => {
                return t(`app.location.types.singular.${type}`);
              })
              .join(", ")}
          </div>
          <div className="flex __partner-buttons">
            <a
              className="__button __secondary"
              target="_blank"
              href={`https://www.google.com/maps/dir/?api=1&destination=${selected.current?.data.address.address}`}
            >
              <span>{t("app.location.route")}</span> <MapIcon />
            </a>
            <a href="#">
              <AppShare className="__partner-icon" />
            </a>
            <a href={`/partner-info/${selected.current?.id}`}>
              <AppInfo className="__partner-icon" />
            </a>
          </div>
          <div className="__partner-text ">
            {selected.current?.data?.address.street}{" "}
            {selected.current?.data?.address.street_number},{" "}
            {selected.current?.data?.address.postal_code}{" "}
            {selected.current?.data?.address.city},{" "}
            {selected.current?.data?.address.country}
          </div>
          <div className="__partner-text font-bold">
            {selected.current?.data?.description}
          </div>
        </div>
      </div>

      <div id="md">
        <ReactMarkdown
          children={selected.current?.data?.text ?? ""}
          remarkPlugins={[remarkGfm]}
        />
      </div>

      <div className="__images-block">
        {/*{pictures.items.map((picture: DatabaseEntry<Picture>) => (*/}
        {/*  <img*/}
        {/*    key={picture.id}*/}
        {/*    src={picture.data.previewURL}*/}
        {/*    className="__preview-thumbnail"*/}
        {/*  />*/}
        {/*))}*/}
        <Gallery locale={props.locale} images={pictures.data} />
      </div>
    </div>
  );

  const renderSelectedMobile = () => (
    <div className="__single-hit">
      <div className="__top-section flex flex-col items-start w-full">
        <div className="__partner-name">{selected.current?.data?.name}</div>
        <div className="__partner-text">
          {selected.current?.data?.type
            .map((type: string, index: number) => {
              return t(`app.location.types.singular.${type}`);
            })
            .join(", ")}
        </div>
        <div className="flex __partner-buttons">
          <a
            className="__button __secondary"
            target="_blank"
            href={`https://www.google.com/maps/dir/?api=1&destination=${selected.current?.data.address.address}`}
          >
            <span>{t("app.location.route")}</span> <MapIcon />
          </a>
          <a href="#">
            <AppShare className="__partner-icon" />
          </a>
          <a href={`/partner-info/${selected.current?.id}`}>
            <AppInfo className="__partner-icon" />
          </a>
        </div>
        <div className="__partner-text ">
          {selected.current?.data?.address.street}{" "}
          {selected.current?.data?.address.street_number},{" "}
          {selected.current?.data?.address.postal_code}{" "}
          {selected.current?.data?.address.city},{" "}
          {selected.current?.data?.address.country}
        </div>
        <div className="__partner-text font-bold">
          {selected.current?.data?.description}
        </div>
      </div>

      {/*FIXME: accessibility options come here*/}

      <div className="__images-block">
        <Gallery locale={props.locale} images={pictures.data} />
      </div>
    </div>
  );

  const renderNull = () => {
    if (selected.current) {
      selected.current = undefined; // a little trick to clear the single selected item
      props.onSelected(undefined);
    }
    return null;
  };

  return (
    <div className="__hits-overlay">
      {props.locations.length > 0
        ? selected.current
          ? windowSize.device === DeviceType.DESKTOP
            ? renderSelected()
            : renderSelectedMobile()
          : renderHits()
        : renderNull()}
    </div>
  );
};

SearchResultBlock.propTypes = {
  locations: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};
export default SearchResultBlock;
