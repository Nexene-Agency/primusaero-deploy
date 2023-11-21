"use client";
import React from "react";
import {AppCommandType, Command} from "@framework/events";
import {Selectable} from "@framework/model";
import {DatabaseEntry} from "@framework/firebase.utils";
import ContextProviders from "@framework/context/context.providers";
import {loading} from "@components/fragments";

import {getClientTranslator} from "@framework/i18n.client.utils";
import {useSession} from "next-auth/react";
import {Testimonial} from "@components/dashboard/testimonials/model";
import TestimonialList from "@components/dashboard/testimonials/list";

const TestimonialsManager = (props: any) => {
  const t = getClientTranslator();
  const {data} = useSession();

  const listAction = (command: Command) => {
    if (command.command === AppCommandType.LIST_ROW_ACTION) {
      const {action, row} = command.payload as {
        action: Selectable;
        row: DatabaseEntry<Testimonial>;
      };
    }
  };

  return data?.user ? (
    <ContextProviders>
      <div className="flex flex-col w-full content-left">
        <div className="font-bold text-2xl">
          {t("app.testimonial.plural")}
        </div>
        {data ? <TestimonialList onAction={listAction}/> : loading(t)}
      </div>
    </ContextProviders>
  ) : null;
};

export default TestimonialsManager;
