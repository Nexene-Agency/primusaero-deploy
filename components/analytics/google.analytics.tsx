"use client";

import Script from "next/script";
import {useEffect} from "react";
import {pageView} from "@components/analytics/gtag.helper";
import {usePathname, useSearchParams} from "next/navigation";

// <Script
//   id="ga4load"
//   strategy="afterInteractive"
//   src="https://www.googletagmanager.com/gtag/js?id=G-1VVMHD7JB9"
// />
// <Script
//   id="ga4code"
//   strategy="afterInteractive"
//   dangerouslySetInnerHTML={{
//     __html: `
//                      window.dataLayer = window.dataLayer || [];
//                      function gtag(){dataLayer.push(arguments);}
//                      gtag('js', new Date());
//                      gtag('config', 'G-1VVMHD7JB9');
//                  `,
//   }}
// />
// <Script
//   id="gtag"
//   strategy="afterInteractive"
//   dangerouslySetInnerHTML={{
//     __html: `
//                         window.dataLayer = window.dataLayer || [];
//                         function gtag(){dataLayer.push(arguments);}
//                         gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied'});
//                         (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//                           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//                           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//                           'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//                         })(window,document,'script','dataLayer','GTM-PJMSJJT');`,
//   }}
// />
// {consent === true && (
//   <Script
//     id="consupd"
//     strategy="afterInteractive"
//     dangerouslySetInnerHTML={{
//       __html: `
//                       gtag('consent', 'update', {
//                         'ad_storage': '${
//         advertisingConsent ? "granted" : "denied"
//       }',
//                         'analytics_storage': '${
//         analyticsConsent ? "granted" : "denied"
//       }',
//                       });
//                     `,
//     }}
//   />
// )}

export default function GoogleAnalytics({
  GA_MEASUREMENT_ID,
}: {
  GA_MEASUREMENT_ID: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** Send page view to Google Analytics */
  useEffect(() => {
    console.log("new page view", pathname, searchParams);
    const url = pathname + searchParams.toString();
    pageView(GA_MEASUREMENT_ID, url);
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied'});
                gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
}
