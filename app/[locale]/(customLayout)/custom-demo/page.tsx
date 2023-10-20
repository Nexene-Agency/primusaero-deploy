import React from "react";
import { flatten, getMessages, translator } from "@framework/i18n.utils";
import MESSAGES from "./custom-demo.messages";
import "./custom-demo.css";
import Link from "next/link";

interface CustomDemoProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const CustomDemo = ({ params, searchParams }: CustomDemoProps) => {
  const t = translator(flatten(getMessages(params.locale, MESSAGES)));
  return (
    <div className="__cd-container">
      <div>This is a custom layout page.</div>
      <div>
        <Link href="/">Back to main page</Link>
      </div>
    </div>
  );
};

export default CustomDemo;
