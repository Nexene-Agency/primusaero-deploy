"use client";

import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRouter } from "next/navigation";
import { CONTACT_DATA_SCHEMA, ContactData } from "@/components/contact/model";
import Link from "next/link";
import "./contact.form.css";
import { saveEmail } from "@/app/server-actions/save_email";

const ContactForm = () => {
  const router = useRouter();
  const toast = useToast();
  const [done, setDone] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const {
    register,
    getValues,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<ContactData>({
    mode: "all",
    resolver: joiResolver(CONTACT_DATA_SCHEMA),
    // defaultValues: { dsgvo: false, agb: false },
    defaultValues: {
      firstName: "Testing",
      lastName: "User",
      email: "viktor_testing@defz.io",
      select: "website",
      dsgvo: true,
    },
  });

  const canSave = () => {
    // return isValid && getValues("dsgvo") === true && getValues("agb") === true;
    return isValid && getValues("dsgvo") === true;
  };

  const send = () => {
    const values = getValues();
    setSaving(true);
    saveEmail(values)
      .then(() => {
        setDone(true);
        toast({
          title: "Erfolgreich gesendet",
          description:
            "Wir haben deine Anfrage erhalten und werden uns so schnell wie möglich bei dir melden.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch((error: any) => {
        console.log("cannot save email", error);
        toast({
          title: "Fehler",
          description:
            "Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const doNothing = () => {
    console.log("doing nothing");
  };

  return (
    <div className="__vstack __container __gap-10">
      <img
        src="/images/defzlogo.png"
        alt="Website logo"
        width="460px"
        className="defz-logo"
      />
      <form>
        <FormControl>
          <FormLabel>Vorname</FormLabel>
          <Input
            placeholder="Vorname"
            {...register("firstName")}
            borderColor={errors.firstName ? "red" : "gray"}
            marginBottom={"1rem"}
            rounded="0"
            autoFocus={true}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Nachname</FormLabel>
          <Input
            placeholder="Name"
            {...register("lastName")}
            borderColor={errors.lastName ? "red" : "gray"}
            marginBottom={"1rem"}
            rounded="0"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email Adresse</FormLabel>
          <Input
            placeholder="Email Adresse"
            {...register("email")}
            borderColor={errors.email ? "red" : "gray"}
            marginBottom={"1rem"}
            rounded="0"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Ich brauche...</FormLabel>
          <Select
            placeholder="Bitte wählen"
            {...register("select")}
            borderColor={errors.select ? "red" : "gray"}
            marginBottom={"1rem"}
            rounded="0"
          >
            <option value="website">...eine Website</option>
            <option value="website-redesign">
              ...ein Redesign für meine bereits bestehende Website
            </option>
            <option value="special-request">
              ...eine Webapp (individuelle Anfrage)
            </option>
          </Select>
        </FormControl>
        <FormControl>
          <Checkbox
            {...register("dsgvo")}
            onChange={(event) =>
              setValue("dsgvo", event.target.checked, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          >
            Ich habe die{" "}
            <Link className="page-link" href="/datenschutz" target="_blank">
              Datenschutzvereinbarung
            </Link>{" "}
            gelesen und verstanden
          </Checkbox>
        </FormControl>
        {/*<FormControl>
            <Checkbox
              {...register("agb")}
              onChange={(event) =>
                setValue("agb", event.target.checked, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
            >
              Ich akzeptiere die{" "}
              <Link className="page-link" href="/agbs" target="_blank">
                AGBs
              </Link>
            </Checkbox>
          </FormControl>*/}
        <FormControl>
          <center>
            <button
              type="button"
              className="__primary"
              style={{ width: "50%" }}
              // as={motion.button}
              // mt={"2rem"}
              // bgColor={"brand.primary"}
              // color={"brand.base.white"}
              // rounded={"md"}
              // shadow={"md"}
              // size={"lg"}
              // whileHover={{ scale: 1.1, backgroundColor: "brand.primary" }}
              // whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
              disabled={!canSave() || saving || done}
              onClick={send}
            >
              Senden
            </button>
          </center>
        </FormControl>
      </form>
    </div>
  );
};
export default ContactForm;
