"use client";
import BurgerMenu from "@components/icons/BugerMenu";
import React, {useEffect, useState} from "react";
import {motion, useAnimation} from "framer-motion";
import Logo from "@components/icons/Logo";
import PrimusAero from "@components/icons/PrimusAero";
import {MENU_ITEMS, SOCIALS_MENU_ITEMS} from "@app/components/data/menus";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import ArrowRight from "@components/icons/ArrowRight";
import Close from "@components/icons/Close";
import {ignorePromise} from "@framework/utils";
import DownArrow from "@components/icons/DownArrow";

interface MenuProps {
  locale: string;
}

const MenuBlock = (props: MenuProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));
  const controls = useAnimation();
  const iconControls = useAnimation();
  const [closing, setClosing] = useState<boolean>(false);
  const [opening, setOpening] = useState<boolean>(false);
  const [subMenuVisible, setSubMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    if (opening) {
      ignorePromise(controls.start({height: "100vh"}));
      iconControls.start({scaleY: 1}).then(() => {
        setOpening(false);
      });
    }
  }, [opening]);

  useEffect(() => {
    if (closing) {
      ignorePromise(controls.start({height: 0}));
      iconControls.start({scaleY: 0}).then(() => {
        setClosing(false);
      });
    }
  }, [closing]);

  const closeMenu = () => {
    setClosing(true);
  };

  const openMenu = () => {
    setOpening(true);
  };

  const changeMenu = () => {
    setSubMenuVisible(prev => !prev);
  };
  const renderMenuItem = (item) => {
    if (item.children) {
      return (
        <>
          <div className="flex" key={item.id}>
            <button className="text-stone-950 text-lg font-normal" onClick={changeMenu}>
              <div className="flex gap-2 items-center">
                <span>{t(item.name)}</span> <sup>({item.children.length})</sup> <DownArrow/>
              </div>
            </button>
            <div className="flex-grow">&nbsp;</div>
          </div>
          {subMenuVisible && <div className="ml-12 flex flex-col gap-12">
            {item.children.map((child) => renderMenuItem(child))}
          </div>}
        </>
      );
    } else {
      return (
        <a href={item.target} key={item.id} className="text-stone-950 text-lg font-normal">
          {t(item.name)}
        </a>
      );
    }
  };

  return (
    <>
      <div style={{cursor: "pointer"}} onClick={openMenu}>
        <BurgerMenu/>
      </div>
      <motion.div
        initial={{height: 0}}
        animate={controls}
        transition={{duration: 0.5}}
        style={{
          background: "rgba(255, 255, 255, 0.80)",
          backdropFilter: "blur(20px)",
          // background: "blue", // You can customize the background color
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          overflow: "hidden",
        }}
      >
        <div className="flex w-full bg-white items-center pt-[80px] px-6 justify-between">
          <div className="flex items-center gap-2">
            <Logo/>
            <PrimusAero/>
          </div>
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
          ><Close/></motion.div>
        </div>
        <div className="flex flex-col mt-12 ml-6 gap-12">
          {MENU_ITEMS.map((item) => renderMenuItem(item))}
          <div className="flex">
            <a href="#"
               className="pl-6 pr-4 pt-3.5 pb-3.5 bg-stone-950 rounded-3xl justify-start items-center gap-2.5 flex flex-row">
              <div className="text-white text-lg font-normal">{t("menu.becomeOurPartner")}</div>
              <div className="fill-white"><ArrowRight/></div>
            </a>
            <div className="flex-grow"/>
          </div>
        </div>
        <div className="h-48">&nbsp;</div>
        <div className="flex-col justify-start items-start gap-6 inline-flex ml-6">
          <div className="text-neutral-400 text-lg font-normal mb-2">{t("footer.socials.title")}</div>
          {SOCIALS_MENU_ITEMS.map((item) =>
            (<a className="text-stone-950 text-lg font-normal" key={item.id} href={item.target}>{t(item.name)}</a>))
          }
        </div>
      </motion.div>
    </>
  );
};

export default MenuBlock;