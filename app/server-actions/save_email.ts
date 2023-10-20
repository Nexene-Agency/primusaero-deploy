"use server";

import { CONTACT_DATA_SCHEMA, ContactData } from "@components/contact/model";
import {
  getMailChimp,
  MAILCHIMP_CONFIG,
} from "@/app/server-actions/utils/mailchimp";

export async function saveEmail(data: ContactData): Promise<void> {
  const result = CONTACT_DATA_SCHEMA.validate(data);
  if (result.error) {
    console.log("server side validation failed", result.error);
    return Promise.reject(result.error);
  }

  return new Promise((resolve, reject) => {
    getMailChimp()
      .then((mc) => {
        return mc.post(`/lists/${MAILCHIMP_CONFIG.list}/members`, {
          email_address: data.email,
          status: MAILCHIMP_CONFIG.status,
          merge_fields: {
            FNAME: data.firstName,
            LNAME: data.lastName,
            SELECT: data.select,
          },
          tags: ["DSGVO", "AGB"],
        });
      })
      .then((response) => {
        // https://us18.api.mailchimp.com/3.0/lists/LISTID/members/MEMBERHASH
        // memberhash: (crypto.createHash("md5").update(lowercase-email").digest("hex")
        resolve();
      })
      .catch((error) => {
        if (Reflect.has(error, "title") && error.title === "Member Exists") {
          console.log(`${data.email} already in mailchimp`);
          resolve();
        } else {
          console.error(`${data.email} failed to add to mailchimp`, error);
          reject(error);
        }
      });
  });
}
