"use client";

import {ChakraProvider, useToast} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import "./contact.form.css";
import {getClientTranslator, getNextDay} from "@framework/i18n.client.utils";
import {theme} from "@components/chakra/theme";
import CustomRadioButtons from "@components/chakra/radio.buttons";
import {CONTACT_SCHEMA, newContact} from "@components/dashboard/contacts/model";
import Checkbox from "@components/chakra/checkbox";
import PrimaryButton from "@app/components/webparts/primary.button";
import ArrowRight from "@components/icons/ArrowRight";
import DownArrow from "@components/icons/DownArrow";
import {Selectable} from "@framework/model";
import CustomSelect from "@components/chakra/select";
import DatePicker from "@components/chakra/date.picker";
import {getRecaptchaToken} from "@framework/utils";
import axios from "axios";
import {asError, showToast} from "@framework/events";
import SuccessIcon from "@components/icons/SuccessIcon";
import {useWindowScroll} from "@framework/hooks/use.window.scroll";
import PropTypes from "prop-types";

const CONTACT_MODES = ["phone", "email", "whatsapp", "meeting"];
const SUBJECTS: Selectable[] = [
  {id: "privateAircraftOperation", name: "app.contactUs.subjects.privateAircraftOperation"},
  {id: "aircraftCharter", name: "app.contactUs.subjects.aircraftCharter"},
  {id: "aircraftAcquisition", name: "app.contactUs.subjects.aircraftAcquisition"},
  {id: "maintenance", name: "app.contactUs.subjects.maintenance"},
  {id: "technicalManagement", name: "app.contactUs.subjects.technicalManagement"},
  {id: "sparePartsAndLogistics", name: "app.contactUs.subjects.sparePartsAndLogistics"},
  {id: "consultingServices", name: "app.contactUs.subjects.consultingServices"},
  {id: "other", name: "app.contactUs.subjects.other"}
];
const PHONE_PREFIXES: Selectable[] = [
  {id: "+43", name: "app.contactUs.countries.43"},
  {id: "+49", name: "app.contactUs.countries.49"},
  {id: "+351", name: "app.contactUs.countries.351"},
];
const HOURS = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
const HOURS2 = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
const MINUTES = ["00", "15", "30", "45"];
const TIMES = HOURS.map((h, index) => MINUTES.map(m => ({
  id: `${h}:${m} – ${HOURS2[index]}:${m}`, name: `${h}:${m} – ${HOURS2[index]}:${m}`
} as Selectable))).flat();

enum Mode {
  EDITING,
  SAVED
}

const ContactForm = (props: any) => {
  const [_, scrollTo] = useWindowScroll();
  const t = getClientTranslator();
  const tomorrow = getNextDay([0]);
  const toast = useToast();
  const [saving, setSaving] = useState<boolean>(false);
  const [preferredContact, setPreferredContact] = useState<string>(CONTACT_MODES[0]);
  const [privacy, setPrivacy] = useState<boolean>(false);
  const [marketing, setMarketing] = useState<boolean>(false);
  const [subject, setSubject] = useState<Selectable | undefined>();
  const [phonePrefix, setPhonePrefix] = useState<Selectable>(PHONE_PREFIXES[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(tomorrow);
  const [selectedTime, setSelectedTime] = useState<Selectable>(TIMES[0]);
  const [mode, setMode] = useState<Mode>(Mode.EDITING);

  const {
    register,
    getValues,
    setValue,
    formState: {errors, isDirty, isValid},
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(CONTACT_SCHEMA),
    defaultValues: {
      ...newContact(props.company ?? "", props.topic ?? "")
    },
  });

  const canSave = () => {
    return isValid && isDirty && !saving && getValues("privacy") === true;
  };

  useEffect(() => {
    setValue("privacy", privacy, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [privacy]);

  useEffect(() => {
    setValue("preferred", preferredContact, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [preferredContact]);

  useEffect(() => {
    setValue("meetingDate", selectedDate.toISOString(), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [selectedDate]);

  useEffect(() => {
    setValue("meetingTime", selectedTime.id, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [selectedTime]);

  useEffect(() => {
    setValue("marketing", marketing, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [marketing]);

  useEffect(() => {
    if (subject) {
      setValue("subject", subject.id, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [subject]);

  useEffect(() => {
    setValue("phonePrefix", phonePrefix?.id, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [phonePrefix]);

  const send = () => {
    const values = getValues();
    setSaving(false);
    getRecaptchaToken("CONTACT_US")
      .then((token) => {
        return axios.post("/api/contact-us", {
          token,
          contact: values,
        });
      })
      .then((response) => {
        if (response.status === 201) {
          setSaving(false);
          scrollTo({x: 0, y: 0, behavior: "instant"});
          setMode(Mode.SAVED);
        } else {
          showToast(toast, asError(t("app.article.errors.errorSaving"), ""));
          if (!response.data.disable) {
            setSaving(false);
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
        showToast(toast, asError(t("app.article.errors.cannotSubmit"), ""));
        if (!error.disable) {
          setSaving(false);
        }
      });
  };

  const renderForm = () => (
    <div className="w-full flex flex-col gap-8 lg:gap-16 mb-72">
      <div className="w-full lg:w-9/10 flex lg:flex-row flex-col gap-8 lg:gap-0">
        <div className="flex w-full lg:w-4/10 text-neutral-500 text-lg font-normal">
          {t("app.contactUs.howToContact")}
        </div>
        <div className="flex">
          <CustomRadioButtons options={CONTACT_MODES} selected={preferredContact} select={setPreferredContact}
                              class="flex flex-col lg:flex-row justify-start gap-4 lg:gap-8"
                              translatePrefix="app.contactUs.contactMode"/>
        </div>
      </div>
      {preferredContact === "meeting" ?
        <div className="w-full lg:w-9/10 flex">
          <div className="hidden lg:flex lg:w-4/10 flex-col lg:flex-row text-neutral-500 text-lg font-normal">
            &nbsp;
          </div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 w-full lg:w-6/10">
            <div className="__control">
              <div className="__label">{t("app.fields.selectDate")}</div>
              <DatePicker select={setSelectedDate} value={selectedDate} minDate={tomorrow}/>
            </div>
            <div className="__control">
              <div className="__label">{t("app.fields.selectTime")}</div>
              <CustomSelect options={TIMES} selected={selectedTime} placeholder="" icon={<DownArrow/>}
                            select={setSelectedTime} noTranslate={true}
                            containerClass="text-neutral-500 text-lg font-normal"
                            dropDownClass="max-h-64 overflow-y-scroll"
                            buttonClass="h-8 py-2 pr-4 border-b border-neutral-500 w-full justify-between items-center gap-2.5 flex focus:text-black focus:outline-none"
                            optionClass="w-full bg-neutral-100 hover:bg-white focus:outline-none focus:bg-white h-12 pl-3 border-b border-neutral-400 border-opacity-40 justify-start items-center inline-flex whitespace-nowrap text-black"/>
            </div>
          </div>
        </div> : null}
      <div className="w-full lg:w-9/10 flex flex-col lg:flex-row gap-8 lg:gap-0">
        <div className="flex w-full lg:w-4/10 text-neutral-500 text-lg font-normal">
          {t("app.contactUs.enterYourPersonalData")}
        </div>
        <div className="flex flex-col gap-16 w-full lg:w-6/10">
          <div className="__control">
            <div className="__label">{t("app.fields.title")}</div>
            <input className={`__input ${errors.title ? "__error" : ""}`}
                   placeholder="Ms."
                   {...register("title")}
                   autoFocus={!props.embedded}
            />
          </div>
          <div className="flex gap-16 flex-col lg:flex-row lg:gap-4">
            <div className="__control">
              <div className="__label">{t("app.fields.firstName")}</div>
              <input className={`__input ${errors.firstName ? "__error" : ""}`}
                     placeholder="Maria"
                     {...register("firstName")}
              />
            </div>
            <div className="__control">
              <div className="__label">{t("app.fields.lastName")}</div>
              <input className={`__input ${errors.lastName ? "__error" : ""}`}
                     placeholder="Doe"
                     {...register("lastName")}
              />
            </div>
          </div>
          {preferredContact !== "email" ? <div className="__control">
            <div className="__label">{t("app.fields.phone")}</div>
            <div className="flex">
              <CustomSelect options={PHONE_PREFIXES} selected={PHONE_PREFIXES[0]} placeholder="" icon={<DownArrow/>}
                            select={setPhonePrefix}
                            containerClass="text-neutral-500 text-lg font-normal"
                            buttonClass="h-8 py-2 pr-4 border-b border-neutral-500 w-full justify-between items-center gap-2.5 inline-flex focus:text-black focus:outline-none"
                            optionClass="w-full bg-neutral-100 hover:bg-white focus:outline-none focus:bg-white h-12 pl-3 border-b border-neutral-400 border-opacity-40 justify-start items-center inline-flex text-black"/>
              <input className={`__input ${errors.phone ? "__error" : ""}`}
                     placeholder="316 234 675"
                     {...register("phone")}
              />
            </div>
          </div> : null}
          <div className="__control">
            <div className="__label">{t("app.fields.email")}</div>
            <input className={`__input ${errors.email ? "__error" : ""}`}
                   placeholder="maria.doe@primus.aero"
                   {...register("email")}
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-9/10 flex flex-col lg:flex-row gap-8 lg:gap-0">
        <div className="flex w-full lg:w-4/10 text-neutral-500 text-lg font-normal">
          {t("app.contactUs.leaveUsAMessage")}
        </div>
        <div className="flex flex-col gap-16 w-full lg:w-6/10">
          <div className="__control">
            <div className="__label">{t("app.fields.subject")}</div>
            <CustomSelect options={SUBJECTS} placeholder="app.contactUs.selectASubject" icon={<DownArrow/>}
                          selected={subject} select={setSubject}
                          containerClass="text-neutral-500 text-lg font-normal"
                          buttonClass="h-8 py-2 pr-4 border-b border-neutral-500 w-full justify-between items-center gap-2.5 inline-flex  focus:text-black focus:outline-none"
                          optionClass="w-full bg-neutral-100 hover:bg-white focus:outline-none focus:bg-white h-12 pl-3 border-b border-neutral-400 border-opacity-40 justify-start items-center inline-flex text-black whitespace-nowrap"
            />
          </div>
          <div className="__control">
            <div className="__label">{t("app.fields.message")}</div>
            <textarea className={`__input ${errors.message ? "__error" : ""}`}
                      placeholder={t("app.fields.message_ph")}
                      rows={5}
                      id="message" {...register("message")} />
          </div>
          <div className="mt-[-12px] flex flex-col gap-4">
            <div className="text-neutral-500 text-lg font-normal">{t("app.contactUs.privacy.header")}</div>
            <div className="w-full justify-start items-center gap-3 inline-flex">
              <Checkbox onChanged={setPrivacy} checked={privacy}>
                <div className="text-stone-950 text-base lg:text-lg font-normal"
                     dangerouslySetInnerHTML={{__html: t("app.contactUs.privacy.text") as any}}></div>
              </Checkbox>
            </div>
            <div className="text-neutral-500 text-lg font-normal mt-4">{t("app.contactUs.marketing.header")}</div>
            <div className="w-full justify-start items-center gap-3 inline-flex">
              <Checkbox onChanged={setMarketing} checked={marketing}>
                <div className="text-stone-950 text-base lg:text-lg font-normal">
                  {t("app.contactUs.marketing.text")}
                </div>
              </Checkbox>
            </div>
            <div className="flex justify-end mt-12">
              <PrimaryButton onClick={send} disabled={!canSave()}
                             class={canSave() ? "bg-stone-950 text-white" : "bg-stone-950 text-white opacity-50"}>
                <div>{t("app.contactUs.sendNow")}</div>
                <div className="fill-white"><ArrowRight/></div>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const debug = () => {
    console.log("debugging");
    console.log("values", getValues());
    console.log("errors", errors);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("privacy", privacy);
    console.log("marketing", marketing);
    console.log("subject", subject);
  };

  const renderSaved = () => (
    <div className="w-full flex-col justify-start items-center gap-8 inline-flex mb-72">
      <SuccessIcon/>
      <div className="flex-col justify-start items-center gap-16 flex">
        <div className="w-full lg:w-8/10 text-center text-black text-3xl lg:text-4xl font-normal leading-10"
             dangerouslySetInnerHTML={{__html: t("app.contactUs.thankYou") as any}}></div>
        {props.embedded ?
          null :
          <PrimaryButton asLink={true} target="/">
            <ArrowRight className="rotate-180 fill-white"/>
            {t("app.contactUs.backToHome")}
          </PrimaryButton>
        }
      </div>
    </div>
  );

  return (
    <ChakraProvider theme={theme}>
      {mode === Mode.EDITING ?
        <div className={props.embedded ? "" : "px-6 lg:px-16 pt-16 w-full"}>
          <div
            className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10 mb-16 lg:mb-32">
            {t("app.contactUs.title")}
          </div>
          {renderForm()}
        </div> :
        <div className={props.embedded ? "" : "px-6 lg:px-16 pt-16 w-full"}>
          {renderSaved()}
        </div>
      }
    </ChakraProvider>
  );
};

ContactForm.propTypes = {
  embedded: PropTypes.bool,
  company: PropTypes.string,
  topic: PropTypes.string,
};

export default ContactForm;
