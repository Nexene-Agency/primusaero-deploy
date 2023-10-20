"use client";
import React, { useState } from "react";
import Joi from "joi";
import { useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { doNothing } from "@framework/utils";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { theme } from "@components/chakra/theme";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Protector {
  key: string;
}

const PROTECTOR_SCHEMA = Joi.object({
  key: Joi.string().required().min(3).max(100),
});

const ProtectorClientPage = (props: any) => {
  const router = useRouter();
  const baseForm = useForm({
    defaultValues: {
      key: "",
    },
    resolver: joiResolver(PROTECTOR_SCHEMA),
    mode: "onChange",
  });

  const { control, register, getValues } = baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });
  const [blocked, setBlocked] = useState<boolean>(false);

  const goBack = () => {
    setBlocked(true);
    router.push("/");
  };

  const login = () => {
    setBlocked(true);
    const key = getValues("key");
    axios
      .get("/api/developer?key=" + key)
      .then((res) => {
        console.log(res.data);
        if (res.data.continue) {
          router.push(res.data.continue);
        } else {
          console.log("invalid response", res.data);
        }
      })
      .catch((err) => {
        console.error("error getting login path", err);
      });
  };

  return (
    <ChakraProvider theme={theme}>
      <div className="flex flex-col rounded-md max-w-xl mx-auto bg-amber-100 mt-10 p-12">
        <form onSubmit={doNothing}>
          <FormControl>
            <FormLabel>Key</FormLabel>
            <Input
              id="key"
              placeholder="key"
              {...register("key")}
              bg="white"
              autoFocus={true}
              borderColor={errors.key ? "red" : "inherit"}
            />
          </FormControl>
          <div className="flex justify-end mt-8 gap-8">
            <Button variant="outline" isDisabled={blocked} onClick={goBack}>
              Back
            </Button>
            <Button
              colorScheme="primary"
              isDisabled={blocked || !isDirty || !isValid}
              onClick={login}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </ChakraProvider>
  );
};

export default ProtectorClientPage;
