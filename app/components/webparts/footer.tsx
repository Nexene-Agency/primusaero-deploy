import Link from "next/link";
import React from "react";
import "./footer.css";
import { flatten, getMessages, translator } from "@framework/i18n.utils";

import MESSAGES from "@app/components/webparts/footer.messages";

type FooterProps = {
  locale: string;
};

const Footer = (props: FooterProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  return (
    <div className="__footer">
      {t("signature")}
    </div>
  );
};

export default Footer;
