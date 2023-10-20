"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

import { hasCookie, setCookie } from "cookies-next";
import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function CookieConsent() {
  const [consent, setConsent] = useState(true);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [advertisingConsent, setAdvertisingConsent] = useState<boolean>(true);
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // check the consent cookie
  useEffect(() => {
    setConsent(hasCookie("localConsent"));
  }, []);

  useEffect(() => {
    if (consent) {
      onClose();
    } else {
      onOpen();
    }
  }, [consent]);

  // when the cookie is accepted
  const acceptCookies = () => {
    setConsent(true);
    setCookie("localConsent", true, { maxAge: 60 * 60 * 24 * 365 });
    setCookie("adConsent", true, { maxAge: 60 * 60 * 24 * 365 });
    setCookie("anConsent", true, { maxAge: 60 * 60 * 24 * 365 });
    // @ts-ignore
    gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  };

  const saveSelectedCookies = () => {
    setConsent(true);
    setCookie("localConsent", "true", { maxAge: 60 * 60 * 24 * 365 });
    setCookie("adConsent", advertisingConsent, { maxAge: 60 * 60 * 24 * 365 });
    setCookie("anConsent", analyticsConsent, { maxAge: 60 * 60 * 24 * 365 });
    // @ts-ignore
    gtag("consent", "update", {
      ad_storage: advertisingConsent ? "granted" : "denied",
      analytics_storage: analyticsConsent ? "granted" : "denied",
    });
  };

  const closePopup = () => {
    setConsent(true);
  };

  const switchDetails = () => {
    if (showDetails) {
      saveSelectedCookies();
    } else {
      setShowDetails(true);
    }
  };

  const switchMarketing = (event: ChangeEvent<HTMLInputElement>) => {
    setAdvertisingConsent(event.target.checked);
  };

  const switchAnalytics = (event: ChangeEvent<HTMLInputElement>) => {
    setAnalyticsConsent(event.target.checked);
  };

  const renderPopup = () => (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex direction="column">
            <Text>
              Wir verwenden Cookies, um dir das optimale Nutzererlebnis bieten
              zu können. Gerne kannst du diese unter Cookie-Einstellungen
              anpassen.
            </Text>
            <Text>
              Unsere{" "}
              <Link color="tertiary" href="/datenschutz">
                Datenschutzbestimmungen
              </Link>{" "}
              findest du hier.
            </Text>
            <Flex
              direction={{ base: "column", md: "row" }}
              mt={2}
              justifyContent={{ base: "center", md: "right" }}
              alignItems="center"
            >
              {showDetails ? (
                <Flex alignItems="center">
                  <Switch
                    id="marketing"
                    onChange={switchMarketing}
                    isChecked={advertisingConsent}
                  />
                  <Text pl={2}>Marketing</Text>
                  <Switch
                    id="analytics"
                    onChange={switchAnalytics}
                    pl={4}
                    isChecked={analyticsConsent}
                  />
                  <Text pl={2} pr={6}>
                    Analytics
                  </Text>
                </Flex>
              ) : null}
              <Button
                variant="outline"
                width={36}
                mt={{ base: 2, md: 0 }}
                onClick={switchDetails}
              >
                {showDetails ? "Speichern" : "Einstellungen"}
              </Button>
              <Button
                variant="outline"
                ml={{ base: 0, md: 2 }}
                width={36}
                onClick={acceptCookies}
                autoFocus={true}
                mt={{ base: 2, md: 0 }}
              >
                Alle akzeptieren
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
  return consent ? null : renderPopup();
}

export default CookieConsent;
