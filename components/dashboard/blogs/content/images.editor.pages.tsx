import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import {
  BlockData,
  BLOG_BLOCK_IMAGES_SCHEMA,
  BlogBlockImages,
  BlogImage,
} from "@components/dashboard/blogs/model";
import { getClientTranslator } from "@/framework/i18n.client.utils";
import PropertiesTab from "@components/dashboard/blogs/content/properties.tab";
import StyleTab from "@components/dashboard/blogs/content/style.tab";
import PictureSelectorPopup from "@components/dashboard/pictures/picture.selector.popup";
import { Command, openPopupCommand } from "@framework/events";
import { DatabaseEntry } from "@framework/firebase.utils";
import { Picture } from "@components/dashboard/pictures/model";
import PlusIcon from "@framework/icons/basic/PlusIcon";
import ImageDataEditor from "@components/dashboard/blogs/content/image.data.editor";

const ImagesEditorPages = (props: any) => {
  const t = getClientTranslator();
  const [popupCommand, setPopupCommand] = useState<Command>();
  const [model, setModel] = useState<BlogBlockImages>(props.block);

  const baseForm = useForm({
    defaultValues: {
      ...model,
    },
    resolver: joiResolver(BLOG_BLOCK_IMAGES_SCHEMA),
    mode: "onChange",
  });

  const { control, watch, register, getValues, setValue } = baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });
  const changed = watch();

  useEffect(() => {
    props.onChange({
      isValid,
      isDirty,
      errors,
      fields: getValues(),
    } as BlockData);
  }, [changed]);

  const debug = () => {
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("errors", errors);
    console.log("fields", getValues());
  };

  const addImage = () => {
    console.log("add image");
    setPopupCommand(openPopupCommand());
  };

  const popupAction = (result: DatabaseEntry<Picture>[]) => {
    console.log("selected", result);
    const newImages = result.map(
      (item) =>
        ({
          image: item.data.imageURL,
          preview: item.data.previewURL,
          title: item.data.name,
          copyright: "unknown",
        } as BlogImage)
    );
    const oldImages = getValues("images") as BlogImage[];
    const oldImageNames = oldImages.map((item) => item.image);
    const newImagesToAdd = newImages.filter(
      (item) => !oldImageNames.includes(item.image)
    );

    setValue("images", [...oldImages, ...newImagesToAdd], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const imageChanged = (index: number, image?: BlogImage) => {
    console.log("image changed", index, image);
    if (image) {
      const oldImages = getValues("images") as BlogImage[];
      oldImages[index] = image;
      setValue("images", oldImages, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      // should remove image
      const oldImages = getValues("images") as BlogImage[];
      const newImages = oldImages.filter((item, idx) => idx !== index);
      console.log("old images", oldImages);
      console.log("new images", newImages);
      setValue("images", newImages, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };
  const renderImagesEditor = () => (
    <div className="flex flex-col w-full gap-2">
      <FormControl>
        <FormLabel>{t("app.blog.columns")}</FormLabel>
        <Select id={"columns"} {...register("columns")}>
          <option key="1" value="1">
            1
          </option>
          <option key="2" value="2">
            2
          </option>
          <option key="3" value="3">
            3
          </option>
          <option key="4" value="4">
            4
          </option>
        </Select>
      </FormControl>
      <div className="flex">
        <Button
          variant="outline"
          size="sm"
          onClick={addImage}
          title={t("app.picture.add")}
        >
          <PlusIcon className="__menu-icon" />
        </Button>
      </div>
      <div className="flex flex-col __image-block-list gap-2 p-2">
        {getValues("images").map((image: BlogImage, index: number) => (
          <ImageDataEditor
            key={`imgde-${image.image}`}
            image={image}
            index={index}
            onChange={imageChanged}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>{t("app.tabs.properties")}</Tab>
          <Tab>{t("app.blog.contentTab")}</Tab>
          <Tab>{t("app.blog.styleTab")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <PropertiesTab />
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>{renderImagesEditor()}</FormProvider>
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <StyleTab />
            </FormProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button onClick={debug}>debug</Button>
      <PictureSelectorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></PictureSelectorPopup>
    </>
  );
};

ImagesEditorPages.propTypes = {
  block: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ImagesEditorPages;
