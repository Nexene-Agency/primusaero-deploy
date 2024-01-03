"use client";
import BurgerMenu from "@components/icons/BurgerMenu";
import React, {useEffect, useState} from "react";
import {motion, useAnimation} from "framer-motion";
import PrimusAero from "@components/icons/PrimusAero";
import {MENU_ITEMS, SOCIALS_MENU_ITEMS} from "@app/components/data/menus";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import ArrowRight from "@components/icons/ArrowRight";
import Close from "@components/icons/Close";
import {ignorePromise} from "@framework/utils";
import DownArrow from "@components/icons/DownArrow";
import {Selectable} from "@framework/model";
import LogoBlackAndWhite from "@components/icons/LogoBlackAndWhite";
import {useWindowScroll} from "@framework/hooks/use.window.scroll";
import Logo from "@components/icons/Logo";

interface MenuProps {
  locale: string;
  inactive?: boolean;
}

interface ColorSet {
  fill: string;
  text: string;
  background: string;
  isLight?: boolean;
}

const DARK = {
  fill: "fill-white",
  text: "text-white",
  background: "bg-stone-950",
} as ColorSet;

const LIGHT = {
  fill: "fill-stone-950",
  text: "text-stone-950",
  background: "bg-white",
  isLight: true,
} as ColorSet;

const colorSetAsCss = (colorSet: ColorSet, withFill = false) => {
  const fill = withFill ? `fill-current ${colorSet.fill}` : "";
  return `${fill} ${colorSet.text} ${colorSet.background}`;
};

const MenuBlock = (props: MenuProps) => {
  const [position, _] = useWindowScroll();
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));
  const controls = useAnimation();
  const iconControls = useAnimation();
  const [closing, setClosing] = useState<boolean>(false);
  const [opening, setOpening] = useState<boolean>(false);
  const [subMenuVisible, setSubMenuVisible] = useState<boolean>(false);
  const [colorSet, setColorSet] = useState<ColorSet>(DARK);
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    if (position.y > 520 && !colorSet.isLight) {
      setColorSet(LIGHT);
    }
    if (position.y <= 520 && colorSet.isLight) {
      setColorSet(DARK);
    }
  }, [position]);

  useEffect(() => {
    if (opening) {
      ignorePromise(controls.start({height: "100vh"}));
      iconControls.start({scaleY: 1}).then(() => {
        setOpening(false);
        setOpened(true);
      });
    }
  }, [opening]);

  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : "auto";
  }, [opened]);

  useEffect(() => {
    if (closing) {
      ignorePromise(controls.start({height: 0}));
      iconControls.start({scaleY: 0}).then(() => {
        setClosing(false);
        setOpened(false);
      });
    }
  }, [closing]);

  const withColorSet = (data: string, withFill = false): string => {
    return colorSetAsCss(colorSet, withFill) + " " + data;
  };

  const closeMenu = () => {
    setClosing(true);
  };

  const openMenu = () => {
    setOpening(true);
  };

  const changeMenu = () => {
    setSubMenuVisible(prev => !prev);
  };

  const renderMenuItem = (item: Selectable) => {
    if (item.children) {
      return (
        <div key={item.id}>
          <div className="flex text-lg font-normal">
            <button className={colorSet.text} onClick={changeMenu}>
              <div className="flex gap-2 items-center">
                <span>{t(item.name)}</span> <sup>({item.children.length})</sup> <DownArrow/>
              </div>
            </button>
            <div className="flex-grow">&nbsp;</div>
          </div>
          {subMenuVisible && <div className="ml-12 flex flex-col gap-12">
            {item.children.map((child) => renderMenuItem(child))}
          </div>}
        </div>
      );
    } else {
      return (
        <a href={item.target} key={item.id} className={`text-lg font-normal ${colorSet.text}`}>
          {t(item.name)}
        </a>
      );
    }
  };

  const renderMenuBlock = () => (
    <>
      <div style={{cursor: "pointer"}} onClick={openMenu}>
        <BurgerMenu className={colorSet.fill}/>
      </div>
      <motion.div
        initial={{height: 0}}
        animate={controls}
        transition={{duration: 0.5}}
        style={{
          backgroundColor: colorSet.isLight ? "rgba(255, 255, 255, 0.80)" : "rgba(15, 15, 15, 0.80)",
          backdropFilter: "blur(20px)",
          // background: "blue", // You can customize the background color
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          overflow: "scroll",
        }}
      >
        <div>
          <div className={withColorSet("flex w-full items-center pt-[80px] px-6 pb-[21px] justify-between")}>
            <a href="/" className="flex items-center gap-2">
              {colorSet.isLight ? <Logo/> : <LogoBlackAndWhite/>}
              <PrimusAero className={colorSet.fill}/>
            </a>
            <motion.div
              initial={{scaleY: 1}}
              animate={iconControls}
              transition={{duration: 0.4}}
              style={{
                height: "25px",
                originY: 0.5, // Set the vertical origin to the center
                transformOrigin: "center",
                cursor: "pointer"
              }}
              onClick={closeMenu}
            ><Close className={colorSet.fill}/></motion.div>
          </div>
          <div className={"flex flex-col mt-12 ml-6 gap-12"}>
            {MENU_ITEMS.map((item) => renderMenuItem(item))}
            <div className="flex">
              <a href="#"
                 className={`pl-6 pr-4 pt-3.5 pb-3.5 text-lg font-normal rounded-3xl justify-start items-center gap-2.5 flex flex-row`}>
                <div>{t("menu.becomeOurPartner")}</div>
                <div className={colorSet.fill}><ArrowRight/></div>
              </a>
              <div className="flex-grow"/>
            </div>
          </div>
          <div className="h-48">&nbsp;</div>
          <div className="flex-col justify-start items-start gap-6 inline-flex ml-6 text-lg font-normal">
            <div className="text-neutral-400 mb-2">{t("footer.socials.title")}</div>
            {SOCIALS_MENU_ITEMS.map((item) =>
              (<a className={colorSet.text} key={item.id} href={item.target}>{t(item.name)}</a>))
            }
          </div>
        </div>
      </motion.div>
    </>
  );

  return (
    <div
      className={withColorSet("flex w-full lg:hidden items-center pt-[80px] px-6 pb-[21px] justify-between fixed z-[100] top-0")}>
      {props.inactive ? <div className="w-full h-[129px] fixed top-0 bg-opacity-50 z-[200]"></div> : null}
      <a href="/" className="flex items-center gap-2">
        {colorSet.isLight ? <Logo/> : <LogoBlackAndWhite/>}
        <PrimusAero className={colorSet.fill}/>
      </a>
      {renderMenuBlock()}
    </div>
  );
};

export default MenuBlock;