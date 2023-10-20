/* eslint-disable react/no-children-prop */
"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DatabaseEntry } from "@framework/firebase.utils";
import { Text } from "@chakra-ui/react";
import { Location } from "@components/dashboard/locations/model";
import { getClientTranslator } from "@framework/i18n.client.utils";
import ReactMarkdown from "react-markdown";
import ArrowLeftIcon from "@framework/icons/basic/ArrowLeftIcon";
import MapIcon from "@framework/icons/basic/MapIcon";
import ShareIcon from "@framework/icons/basic/ShareIcon";
import remarkGfm from "remark-gfm";
import { Picture } from "@components/dashboard/pictures/model";

const PartnerBlock = async (props: any) => {
  const t = getClientTranslator();
  const [location] = useState<DatabaseEntry<Location | undefined>>(
    props?.location
  );
  const [images, setImages] = useState<DatabaseEntry<Picture>[]>([]);

  useEffect(() => {
    console.log("PartnerBlock useEffect", props);
    if (props.images) {
      const actImages = props.images as DatabaseEntry<Picture>[];
      actImages.sort((a, b) => {
        return a.data.width - b.data.width;
      });
      setImages(actImages);
    }
  }, []);

  const renderImages = () => {
    if (images.length < 1) {
      return <></>;
    }
    return (
      <div className="__vstack __w-full __gap-16px">
        <div className="__main-image-div">
          <img className="__main-image" src={`${images[0].data.imageURL}`} />
        </div>
        <div className="__hstack __w-full __top __gap-16px">
          {images.map((image: DatabaseEntry<Picture>, index: number) => (
            <img src={`${image.data.previewURL}`} key={`ip-${index}`} />
          ))}
        </div>
      </div>
    );
  };
  // @ts-ignore
  const renderData = () => (
    <div className="__hstack __top __w-full">
      <div className="__left-block __vstack __left">
        <Text className="__partner-name">{location.data?.name}</Text>
        <div className="__partner-text">
          {location.data?.type.map((type: string, index: number) => (
            <Text key={`t-${index}`}>
              {t(`app.location.types.singular.${type}`)}
            </Text>
          ))}
        </div>
        <div className="__hstack __gap-8px __button-row">
          <a className="__button __black" href="#">
            <ArrowLeftIcon /> <span>Show on map</span>
          </a>
          <a className="__button __secondary" href="#">
            <span>Route</span> <MapIcon />
          </a>
          <a className="__button" href="#">
            <ShareIcon />
          </a>
        </div>
        <Text className="__partner-text">
          {location.data?.address.street} {location.data?.address.street_number}
          , {location.data?.address.postal_code} {location.data?.address.city},{" "}
          {location.data?.address.country}
        </Text>
        <Text className="__partner-text __partner-description">
          {location.data?.description}
        </Text>
        <div id="md">
          {/*// @ts-ignore*/}
          {/*<ReactMarkdown>{location.data?.text}</ReactMarkdown>*/}
          <ReactMarkdown
            children={location.data?.text ?? ""}
            remarkPlugins={[remarkGfm]}
          />
          ,
        </div>
      </div>
      <div className="__right-block">{renderImages()}</div>
    </div>
  );

  return location ? renderData() : <></>;
};

PartnerBlock.propTypes = {
  locale: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
};
export default PartnerBlock;
