"use client";
import { useFormContext, useFormState } from "react-hook-form";
import PropTypes from "prop-types";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { getClientTranslator } from "@framework/i18n.client.utils";
import ChipsComponent from "@framework/components/chips.component";
import { Selectable } from "@framework/model";

const PictureEditorTab = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue, trigger } =
    useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });
  const changed = watch();
  const fileRef = useRef<any>();
  const [file, setFile] = useState<File | undefined>();
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>();
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
    {
      width: 0,
      height: 0,
    }
  );

  useEffect(() => {
    props.onChange(isValid, isDirty, file, formData);
  }, [changed]);

  const doNothing = (e: FormEvent) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setFile(undefined);
  };

  const fileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
    }
  };

  /**
   * Determines the original image size.
   * @param file The file containing the image.
   */
  const getImageSize = (file: File) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = function (event: any) {
      setImageSize({
        width: event.srcElement.width,
        height: event.srcElement.height,
      });
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  };

  useEffect(() => {
    if (props.editing) {
      return;
    }
    if (file) {
      getImageSize(file);
      setCreateObjectURL(URL.createObjectURL(file));
    } else {
      setCreateObjectURL(undefined);
      setImageSize({ width: 0, height: 0 });
    }
    setValue("name", file?.name, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
    trigger().finally(props.onChange(isValid, isDirty, file, formData));
  }, [file]);

  useEffect(() => {
    props.onChange(isValid, isDirty, file, formData);
  }, [formData]);

  const imageLoaded = (event: any) => {
    const canvas = document.createElement("canvas");
    console.log(event.target.height, event.target.width);
    canvas.height = event.target.clientHeight;
    canvas.width = event.target.clientWidth;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      event.target,
      0,
      0,
      event.target.clientWidth,
      event.target.clientHeight
    );
    const formData = new FormData();
    formData.append("image", file!);
    ctx.canvas.toBlob((data) => {
      formData.append("preview", data!);
      formData.append("width", imageSize.width + "");
      formData.append("height", imageSize.height + "");
      setFormData(formData);
    }, "image/jpeg");
  };

  const renderPreview = () => (
    <FormControl>
      <FormLabel>{t("app.picture.preview")}</FormLabel>
      <div>
        <img src={getValues("previewURL")} />
      </div>
    </FormControl>
  );

  const tagsChanged = (tags: Selectable[]) => {
    setValue(
      "tags",
      tags.map((value: Selectable) => value.id),
      {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const getTags = () => {
    return getValues("tags").map(
      (value: string) => ({ id: value, name: value } as Selectable)
    );
  };

  return (
    <form onSubmit={doNothing}>
      <FormControl>
        <FormLabel>{t("app.fields.name")}</FormLabel>
        <Input
          id="name"
          placeholder={t("app.fields.name")!}
          {...register("name")}
          bg="white"
          autoFocus={true}
          borderColor={errors.name ? "red" : "inherit"}
        />
      </FormControl>
      <FormControl>
        <FormLabel>{t("app.fields.description")}</FormLabel>
        <Textarea
          id="description"
          placeholder={t("app.fields.description")!}
          {...register("description")}
          bg="white"
          borderColor={errors.description ? "red" : "inherit"}
        />
      </FormControl>
      <FormControl>
        <FormLabel>{t("app.fields.tags")}</FormLabel>
        <ChipsComponent
          values={getTags()}
          onChange={tagsChanged}
          enableNew={true}
        ></ChipsComponent>
      </FormControl>
      {props.editing ? (
        renderPreview()
      ) : (
        <FormControl>
          <FormLabel>{t("app.picture.singular")}</FormLabel>
          <Flex gap={6}>
            <div>
              <VStack gap={1}>
                <input
                  type="file"
                  accept={"image/jpeg"}
                  id="picture"
                  onChange={fileSelected}
                  ref={fileRef}
                  style={{ display: "none" }}
                />
                <Button
                  onClick={() => fileRef.current?.click()}
                  variant="outline"
                  colorScheme="secondary"
                >
                  {t("app.picture.select")}
                </Button>
                <Button onClick={clearFile} variant="outline" colorScheme="red">
                  {t("app.picture.clear")}
                </Button>
              </VStack>
            </div>
            <div>
              {createObjectURL ? (
                <Image
                  id="previewImage"
                  src={createObjectURL || ""}
                  maxHeight="200px"
                  onLoad={imageLoaded}
                />
              ) : (
                <Text>{t("app.picture.must_select")}</Text>
              )}
            </div>
          </Flex>
        </FormControl>
      )}
    </form>
  );
};

PictureEditorTab.propTypes = {
  onChange: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default PictureEditorTab;
