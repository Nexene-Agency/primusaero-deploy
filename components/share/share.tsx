"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./share.css";
import { getClientTranslator } from "@framework/i18n.client.utils";
import AppShare from "@components/icons/AppShare";

const Share = (props: any) => {
  const t = getClientTranslator();
  const [prefix] = useState<string>(props.cssPrefix || "default");

  const share = () => {
    console.log("must share", props.url);
  };

  return (
    <div className={`flex flex-col items-center __${prefix}-share-block`}>
      <div className="cursor-pointer" onClick={share}>
        <AppShare className={`__${prefix}-share-icon`} />
      </div>
      <div className={`__${prefix}-share-text`}>{t("app.actions.share")}</div>
    </div>
  );
};

Share.propTypes = {
  url: PropTypes.string.isRequired,
  cssPrefix: PropTypes.string,
};

export default Share;
