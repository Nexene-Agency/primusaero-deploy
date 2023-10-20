"use client";
import { DatabaseEntry } from "@framework/firebase.utils";
import { Picture } from "@components/dashboard/pictures/model";
import React, { KeyboardEvent, MouseEvent } from "react";
import PropTypes from "prop-types";
import ArrowLeftIcon from "@framework/icons/basic/ArrowLeftIcon";
import ArrowRightIcon from "@framework/icons/basic/ArrowRightIcon";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import "./gallery.css";

const Gallery = (props: any) => {
  const images = props.images as DatabaseEntry<Picture>[];
  const [selected, setSelected] = React.useState<number>(-1);

  const renderImages = () => {
    return images.map((image: DatabaseEntry<Picture>, index: number) => (
      <div className="__gallery-img-container" key={`ipd-${index}`}>
        <img
          src={`${image.data.previewURL}`}
          className="__gallery-img"
          onClick={() => setSelected(index)}
        />
      </div>
    ));
  };

  const prevImage = () => {
    if (selected > 0) {
      setSelected(selected - 1);
    } else {
      setSelected(images.length - 1);
    }
  };

  const nextImage = () => {
    if (selected < images.length - 1) {
      setSelected(selected + 1);
    } else {
      setSelected(0);
    }
  };

  const close = (event: MouseEvent<HTMLElement>) => {
    const id = Reflect.get(event.target, "id");
    if (["backdrop", "menu-close", "close-button", "close-icon"].includes(id)) {
      event.preventDefault();
      event.stopPropagation();
      setSelected(-1);
    }
  };

  const keyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.code === "Escape") {
      event.stopPropagation();
      event.preventDefault();
      setSelected(-1);
    }
  };

  const renderBigImage = () => {
    return (
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
        onClick={close}
      >
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-2"
          id="backdrop"
          onKeyDown={keyDown}
        >
          <div>
            <button className="bg-white rounded-full p-2" onClick={prevImage}>
              <ArrowLeftIcon className="__menu-icon" />
            </button>
          </div>
          <div className="relative">
            <div className="absolute top-2 right-2">
              <button
                id="close-button"
                className="bg-white rounded-full p-2"
                onClick={close}
              >
                <MenuCloseIcon id="close-icon" className="__menu-icon" />
              </button>
            </div>
            <img
              src={`${images[selected].data.imageURL}`}
              className="__max-w-80vw __max-h-80vh"
            />
          </div>
          <button className="bg-white rounded-full p-2" onClick={nextImage}>
            <ArrowRightIcon className="__menu-icon" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderImages()}
      {selected > -1 ? renderBigImage() : null}
    </>
  );
};

Gallery.propTypes = {
  locale: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default Gallery;
