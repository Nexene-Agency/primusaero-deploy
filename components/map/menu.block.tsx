"use client";
import React, { useEffect, useState } from "react";
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import "./menu.block.css";
import { getClientTranslator } from "@framework/i18n.client.utils";
import PropTypes from "prop-types";
import { DeviceType, useWindowSize } from "@framework/hooks/use.window.size";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import MoreIcon from "@framework/icons/basic/MoreIcon";

const MenuBlock = (props: any) => {
  const t = getClientTranslator();
  const [rentals, setRentals] = useState<boolean>(true);
  const [garages, setGarages] = useState<boolean>(false);
  const [shops, setShops] = useState<boolean>(false);
  const [magazinStores, setMagazinStores] = useState<boolean>(false);
  const [campgrounds, setCampgrounds] = useState<boolean>(false);
  const windowSize = useWindowSize();

  const switchRentals = () => {
    setRentals((current) => !current);
  };

  const switchGarages = () => {
    setGarages((current) => !current);
  };

  const switchShops = () => {
    setShops((current) => !current);
  };
  const switchCampgrounds = () => {
    setCampgrounds((current) => !current);
  };

  const switchMagazinStores = () => {
    setMagazinStores((current) => !current);
  };

  useEffect(() => {
    props.onFilterChanged({
      rentals,
      garages,
      shops,
      magazinStores,
      campgrounds,
    });
  }, [shops, magazinStores, rentals, garages, campgrounds]);

  const distributeMagazine = () => {
    alert("Distribute magazine");
  };

  const shareThisMap = () => {
    alert("Share this map");
  };

  const iNeedHelp = () => {
    alert("I need help");
  };

  const renderQuickActions = () => (
    <Menu
      placement={
        windowSize.device === DeviceType.DESKTOP ? "bottom-end" : "bottom"
      }
    >
      <MenuButton className="__button __white __menu-button">
        <MoreIcon className={"__menu-icon"} />
      </MenuButton>
      <MenuList className="__menu-list" zIndex={4000}>
        <div className="__menu-item">
          <a href="/post-location">{t("app.location.addYourService")}</a>
        </div>
        <div className="__menu-item" onClick={distributeMagazine}>
          {t("app.location.distributeMagazine")}
        </div>
        <div className="__menu-item" onClick={shareThisMap}>
          {t("app.location.shareThisMap")}
        </div>
        <div className="__menu-item" onClick={iNeedHelp}>
          {t("app.location.iNeedHelp")}
        </div>
      </MenuList>
    </Menu>
  );

  const renderLeaveMap = () => (
    <a className="__button __secondary __menu-button" href="/">
      {windowSize.device === DeviceType.DESKTOP
        ? t("app.location.leaveMap")
        : null}
      <MenuCloseIcon />
    </a>
  );

  const renderTypeButtons = () => (
    <>
      <Button
        className={`__button ${rentals ? "__secondary" : "__white"}`}
        onClick={switchRentals}
      >
        {t("app.location.types.plural.rental")}
      </Button>
      <Button
        className={`__button ${garages ? "__secondary" : "__white"}`}
        onClick={switchGarages}
      >
        {t("app.location.types.plural.garage")}
      </Button>
      <Button
        className={`__button ${shops ? "__secondary" : "__white"}`}
        onClick={switchShops}
      >
        {t("app.location.types.plural.shop")}
      </Button>
      <Button
        className={`__button ${magazinStores ? "__secondary" : "__white"}`}
        onClick={switchMagazinStores}
      >
        {t("app.location.types.plural.magazine_store")}
      </Button>
      <Button
        className={`__button ${campgrounds ? "__secondary" : "__white"}`}
        onClick={switchCampgrounds}
      >
        {t("app.location.types.plural.campground")}
      </Button>
    </>
  );

  const renderDesktopMenu = () => (
    <div className="flex w-full __menu-block">
      <div className="__left-space" />
      <div className="__menu-types flex">{renderTypeButtons()}</div>
      <div className="__spacer"></div>
      {renderQuickActions()}
      {renderLeaveMap()}
    </div>
  );

  const renderMobileMenu = () => (
    <div className="flex flex-col w-full __menu-block">
      <div className="flex w-full __menu-button-row">
        <div className="__left-space" />
        <div className="flex-grow" />
        {renderQuickActions()}
        {renderLeaveMap()}
      </div>
      <div className="flex w-full __menu-types">{renderTypeButtons()}</div>
    </div>
  );

  return (
    <div className="__menu-overlay">
      {windowSize.device === DeviceType.DESKTOP
        ? renderDesktopMenu()
        : renderMobileMenu()}
    </div>
  );
};

MenuBlock.propTypes = {
  onFilterChanged: PropTypes.func.isRequired,
};
export default MenuBlock;
