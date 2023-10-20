import Mailchimp from "mailchimp-api-v3";

export const MAILCHIMP_CONFIG = {
  api_key: process.env.NEXT_MAILCHIMP_API_KEY!,
  list: process.env.NEXT_MAILCHIMP_LIST_ID!,
  status: process.env.NEXT_MAILCHIMP_STATUS!,
};

export const getMailChimp = (): Promise<Mailchimp> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a new Mailchimp object instance
      resolve(new Mailchimp(MAILCHIMP_CONFIG.api_key));
    } catch (error) {
      console.error("cannot init mailchimp", error);
      reject(error);
    }
  });
};
