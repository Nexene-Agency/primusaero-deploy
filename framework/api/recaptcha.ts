// {
//   "tokenProperties": {
//   "valid": true,
//     "hostname": "www.google.com",
//     "action": "homepage",
//     "createTime": "2019-03-28T12:24:17.894Z"
// },
//   "riskAnalysis": {
//   "score": 0.1,
//     "reasons": ["AUTOMATION"]
// },
//   "event": {
//   "token": "TOKEN",
//     "siteKey": "KEY",
//     "expectedAction": "USER_ACTION"
// },
//   "name": "projects/PROJECT_NUMBER/assessments/b6ac310000000000"
// }

import axios, { AxiosError } from "axios";
import {
  axiosErrorAsServiceError,
  ServiceError,
} from "@framework/api/service.error";

export interface RecaptchaScore {
  tokenProperties: {
    valid: boolean;
    invalidReason: string;
    hostname: string;
    action: string;
    createTime: string;
  };
  riskAnalysis: {
    score: number;
    reasons: string[];
    extendedVerdictReasons: string[];
  };
  event: {
    token: string;
    siteKey: string;
    expectedAction: string;
  };
  name: string;
}

export const getRecaptchaScore = (
  token: string,
  expectedAction: string
): Promise<RecaptchaScore> => {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;
  console.log("recaptcha url", url);
  const request = {
    event: {
      token,
      siteKey,
      expectedAction,
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .post(url, request, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data as RecaptchaScore;
        if (data.event.expectedAction !== data.tokenProperties.action) {
          throw new ServiceError(400, "expected action does not match");
        }
        if (!data.tokenProperties.valid) {
          throw new ServiceError(403, data.tokenProperties.invalidReason);
        }
        if (data.riskAnalysis.score < 0.9) {
          throw new ServiceError(403, "score too low");
        }
        resolve(response.data);
      })
      .catch((error: AxiosError | ServiceError) => {
        const newError =
          error instanceof AxiosError ? axiosErrorAsServiceError(error) : error;
        reject(newError);
      });
  });
};
