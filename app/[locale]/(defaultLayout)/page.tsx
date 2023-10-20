"use client";
import React from "react";
import "./home.css";
import { flatten, getMessages, translator } from "@framework/i18n.utils";
import MESSAGES from "./home.messages";
import ArrowThinRightIcon from "@framework/icons/basic/ArrowThinRightIcon";
import AppMap from "@components/icons/AppMap";
import Link from "next/link";

interface HomeProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home = ({ params, searchParams }: HomeProps) => {
  const t = translator(flatten(getMessages(params.locale, MESSAGES)));

  return (
      <div className="__main-page">
        <div>{t("signature")}</div>
        <div>{t("description")}</div>
        <div>This is the default layout</div>
        <Link href="/custom-demo">Click here for a custom layout page</Link>
      </div>
  );
};
export default Home;
