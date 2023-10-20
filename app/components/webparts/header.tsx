import React, { Suspense } from "react";
import "./header.css";
import { flatten, getMessages, translator } from "@framework/i18n.utils";
import MESSAGES from "./header.messages";

interface MainPageProps {
  locale: string;
}

const Header = (props: MainPageProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  return (
    <div className="__header">
      {t("signature")}
    </div>
  );
};
export default Header;
