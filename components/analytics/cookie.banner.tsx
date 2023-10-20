"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@components/chakra/theme";
import CookieConsent from "@components/analytics/cookie.consent";
import Script from "next/script";
import { getCookie } from "cookies-next";

const CookieBanner = () => {
  const consent = getCookie("localConsent");
  const advertisingConsent = getCookie("asConsent");
  const analyticsConsent = getCookie("localConsent");

  return (
    <ChakraProvider theme={theme}>
      {consent === true && (
        <Script
          id="consupd"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                      gtag('consent', 'update', {
                        'ad_storage': '${
                          advertisingConsent ? "granted" : "denied"
                        }',
                        'analytics_storage': '${
                          analyticsConsent ? "granted" : "denied"
                        }',
                      });
                    `,
          }}
        />
      )}
      <CookieConsent />
    </ChakraProvider>
  );
};

export default CookieBanner;
