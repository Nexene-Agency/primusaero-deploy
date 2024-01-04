"use client";
import Share from "@components/icons/Share";
import React from "react";
import {ChakraProvider, Menu, MenuButton, MenuItem, MenuList, theme} from "@chakra-ui/react";

interface ShareIconProps {
  url?: string;
  title: string;
  description?: string;
}

const ShareIcon = (props: ShareIconProps) => {
  const origin = typeof window !== "undefined" && window.location ? window.location.toString() : "";
  const URL = props.url && (props.url.trim() !== "") ? props.url : origin;

  console.log("URL IS", URL);

  const facebookClick = () => {
    window.open(`http://www.facebook.com/sharer.php?s=100&amp;p[title]=${encodeURIComponent(props.title)}&amp;p[url]=${encodeURIComponent(URL)}&amp;p[images][0]=&amp;p[summary]=${encodeURIComponent(props.description ?? props.title)}`,
      "sharer", "toolbar=0,status=0,width=620,height=280");
  };

  const renderFacebookShare = () => (
    <a href="#" onClick={facebookClick}><img src="/assets/facebook-logo.svg" className="h-6"/></a>
  );

  const twitterClick = () => {
    const status = encodeURIComponent(encodeURIComponent(props.description ?? props.title) + " " + URL);
    const popUp = window.open(`https://twitter.com/home?status=${status}`, "popupwindow", "scrollbars=yes,width=800,height=400");
    popUp?.focus();
    return false;
  };

  const renderTwitterShare = () => (
    <a href="#" onClick={twitterClick}><img src="/assets/x-logo-black.png" className="h-6"/></a>
  );


  const linkedInClick = () => {
    const popUp = window.open(`https://linkedin.com/shareArticle?mini=true&amp;url=${encodeURIComponent(URL)}&amp;title=${encodeURIComponent(props.title)}`,
      "popupwindow", "scrollbars=yes,width=800,height=400");
    popUp?.focus();
    return false;
  };

  const renderLinkedInShare = () => (
    <a href="#" onClick={linkedInClick}><img src="/assets/LI-In-Bug.png" className="h-6"/></a>
  );

  return (
    <ChakraProvider theme={theme}>
      <Menu>
        <MenuButton><Share className="text-black cursor-pointer"/></MenuButton>
        <MenuList>
          <MenuItem>{renderFacebookShare()}</MenuItem>
          <MenuItem>{renderTwitterShare()}</MenuItem>
          <MenuItem>{renderLinkedInShare()}</MenuItem>
        </MenuList>
      </Menu>
    </ChakraProvider>
  );
};

export default ShareIcon;