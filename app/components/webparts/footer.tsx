import React from "react";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import {LEGAL_MENU_ITEMS, SOCIALS_MENU_ITEMS, TESTIMONIALS_MENU_ITEMS} from "@app/components/data/menus";

type FooterProps = {
  locale: string;
};

const Footer = (props: FooterProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  return (
    <div className="w-full bg-stone-950">
      <div className="__restricted-width flex flex-col lg:flex-row gap-12 lg:gap-32 bg-stone-950 py-16 px-6 lg:p-16">
        <div className="flex-col justify-start items-start gap-6 inline-flex">
          <div className="text-neutral-400 text-lg font-normal mb-2">{t("footer.contact.title")}</div>
          <div className="text-white text-lg font-normal">{t("footer.contact.name")}</div>
          <div className="text-white text-lg font-normal"
               dangerouslySetInnerHTML={{__html: t("footer.contact.address") as any}}></div>
          <a className="text-white text-lg font-normal"
             href={`mailto:${t("footer.contact.email")}`}>{t("footer.contact.email")}</a>
          <div className="text-white text-lg font-normal">{t("footer.contact.phone")}</div>
        </div>

        <div className="flex-col justify-start items-start gap-6 inline-flex">
          <div className="text-neutral-400 text-lg font-normal mb-2">{t("footer.legal.title")}</div>
          {LEGAL_MENU_ITEMS.map((item) =>
            (<a className="text-white text-lg font-normal" key={item.id} href={item.target}>{t(item.name)}</a>))
          }
        </div>

        <div className="flex-col justify-start items-start gap-6 inline-flex">
          <div className="text-neutral-400 text-lg font-normal mb-2">{t("footer.testimonials.title")}</div>
          {TESTIMONIALS_MENU_ITEMS.map((item) =>
            (<a className="text-white text-lg font-normal" key={item.id} href={item.target}>{t(item.name)}</a>))
          }
        </div>

        <div className="flex-col justify-start items-start gap-6 inline-flex">
          <div className="text-neutral-400 text-lg font-normal mb-2">{t("footer.socials.title")}</div>
          <div className="flex flex-row lg:flex-col gap-6">
            {SOCIALS_MENU_ITEMS.map((item) =>
              (<a className="text-white text-lg font-normal" key={item.id} href={item.target}>{t(item.name)}</a>))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
