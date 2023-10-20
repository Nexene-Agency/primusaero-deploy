import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  BLOG_IMAGE_SCHEMA,
  BlogImage,
} from "@components/dashboard/blogs/model";
import { useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { getClientTranslator } from "@framework/i18n.client.utils";

const ImageDataEditor = (props: any) => {
  const [image, setImage] = useState<BlogImage>(props.image);
  const t = getClientTranslator();

  const baseForm = useForm({
    defaultValues: {
      ...image,
    },
    resolver: joiResolver(BLOG_IMAGE_SCHEMA),
    mode: "onChange",
  });

  const { control, watch, register, reset, getValues } = baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });

  const save = () => {
    if (isDirty && isValid) {
      props.onChange(props.index, getValues());
      reset(getValues());
    }
  };

  const deleteImage = () => {
    props.onChange(props.index);
  };

  return (
    <div className="flex gap-2">
      <img src={image.preview} />
      <div className="flex flex-col gap-2">
        <FormControl className="w-full">
          <FormLabel>{t("app.fields.title")}</FormLabel>
          <Input
            id="title"
            placeholder={t("app.fields.title")!}
            {...register("title")}
            bg="white"
            autoFocus={true}
            borderColor={errors.title ? "red !important" : "inherit"}
          />
        </FormControl>
        <FormControl className="w-full">
          <FormLabel>{t("app.fields.copyright")}</FormLabel>
          <Input
            id="copyright"
            placeholder={t("app.fields.copyright")!}
            {...register("copyright")}
            bg="white"
            autoFocus={true}
            borderColor={errors.copyright ? "red !important" : "inherit"}
          />
        </FormControl>
        <div className="flex gap-2">
          <Button variant="outline" colorScheme="red" onClick={deleteImage}>
            {t("app.actions.delete")}
          </Button>
          <Button
            variant="outline"
            isDisabled={!isDirty || !isValid}
            onClick={save}
          >
            {t("app.actions.save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

ImageDataEditor.propTypes = {
  image: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ImageDataEditor;
