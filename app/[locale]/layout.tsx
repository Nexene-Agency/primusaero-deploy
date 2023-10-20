/* eslint-disable @next/next/no-sync-scripts */
import "../styles/brand.css";
import React, {Suspense} from "react";
import GoogleAnalytics from "@components/analytics/google.analytics";
import CookieBanner from "@components/analytics/cookie.banner";

/**
 * This is the default layout, containing only the Google Analytics and Cookie Banner.
 * Any other layout will extend this layout in route groups like (defaultLayout) or (customLayout)
 */

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export const metadata = {
  title: process.env.NEXT_PUBLIC_APPLICATION_NAME,
  description: process.env.NEXT_PUBLIC_APPLICATION_NAME,
};

const DefaultFallback = () => {
  return <div></div>;
};

// @ts-ignore
export default async function LocaleLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <head/>
      <Suspense fallback={<DefaultFallback />}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-P635B9R9WC" />
      </Suspense>
      <body>
        <div className="__root-layout">{children}</div>
        <Suspense fallback={<DefaultFallback />}>
          <CookieBanner />
        </Suspense>
      </body>
    </html>
  );
}
