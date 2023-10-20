"use client";

import { useEventContext } from "@framework/context/providers";
import { useToast } from "@chakra-ui/react";
import getLogger from "@framework/logger";
import { useEffect } from "react";
import { AppEvent, AppEventType, MessagePayload } from "@framework/events";
import { getClientTranslator } from "@framework/i18n.client.utils";

const Toasts = (props: any) => {
  const t = getClientTranslator();
  const { eventBus } = useEventContext();
  const toast = useToast();
  const logger = getLogger("toasts");

  useEffect(() => {
    const subscription = eventBus.subscribe(handleEvent.bind(this));

    return () => subscription.unsubscribe();
  }, []);

  const handleEvent = (incoming: AppEvent) => {
    if (incoming.type === AppEventType.TOAST) {
      const payload = incoming.payload as MessagePayload;
      toast({
        status: payload.type,
        title: t(payload.title),
        description: t(payload.message),
        isClosable: true,
        duration: 2000, // FIXME: add to environment
      });
    }
  };

  return <></>;
};

export default Toasts;
