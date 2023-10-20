"use client";
import PropTypes from "prop-types";
import "./article.form.css";
import { getClientTranslator } from "@framework/i18n.client.utils";
import React, { useEffect, useState } from "react";
import { Step, Stepper } from "../chakra/stepper";
import {
  Article,
  ARTICLE_SCHEMA,
  newArticle,
} from "@components/dashboard/article/model";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import ArticleTab from "@components/dashboard/article/article.tab";
import ArrowRightIcon from "@framework/icons/basic/ArrowRightIcon";
import { getRecaptchaToken, ignorePromise } from "@framework/utils";
import BasicTab from "@components/dashboard/article/basic.tab";
import VehicleTab from "../dashboard/article/vehicle.tab";
import Checkbox from "@components/chakra/checkbox";
import ArrowLeftIcon from "@framework/icons/basic/ArrowLeftIcon";
import BlockUi from "@availity/block-ui";
import { useToast } from "@chakra-ui/react";
import { asError, asSuccess, showToast } from "@framework/events";
import { useRouter } from "next/navigation";
import axios from "axios";
import ShowMoreOverlay from "@components/article/show.more.overlay";
import ArrowThinRightIcon from "@framework/icons/basic/ArrowThinRightIcon";
import ArrowThinLeftIcon from "@framework/icons/basic/ArrowThinLeftIcon";

const ArticleForm = (props: any) => {
  const t = getClientTranslator();
  const DEFAULT_STEPS: Step[] = [
    {
      index: 0,
      caption: "1",
      description: t("app.article.singular"),
      status: "current",
    },
    {
      index: 1,
      caption: "2",
      description: t("app.article.basic"),
      status: "incomplete",
    },
    {
      index: 2,
      caption: "3",
      description: t("app.article.vehicle"),
      status: "incomplete",
    },
  ];
  const router = useRouter();
  const [selectedStep, setSelectedStep] = useState<Step>(DEFAULT_STEPS[0]);
  const [isClient, setIsClient] = useState(false);
  const [article, setArticle] = useState<Article>(newArticle());
  const [disclaimerVisible, setDisclaimerVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [steps, setSteps] = useState<Step[]>(DEFAULT_STEPS);
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const [showMoreVisible, setShowMoreVisible] = useState<number>(0);
  const baseForm = useForm({
    defaultValues: {
      ...article,
    },
    resolver: joiResolver(ARTICLE_SCHEMA),
    mode: "onChange",
  });

  const { control, reset, getValues, setValue, trigger } = baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });

  useEffect(() => {
    setIsClient(true);
    ignorePromise(trigger());
  }, []);

  const stepperChanged = (step: Step) => {
    // empty on purpose
  };

  const renderStepper = () => (
    <>
      <Stepper
        key={`s-${selectedStep.index}`}
        steps={steps}
        onChanged={stepperChanged}
      ></Stepper>
      <div className="__after-stepper"></div>
    </>
  );

  const renderHotTopics = () => (
    <>
      <div className="flex items-center font-bold">
        <div className="__hot-topic">{t("app.article.hotTopics")}</div>
        {props.hotTopics.map((topic: string, index: number) => (
          <div key={`ht-${index}`} className="rounded-md bg-white p-4">
            {topic}
          </div>
        ))}
      </div>
      <div>{t("app.article.hotDesc")}</div>
      <div className="__after-hot-topics"></div>
    </>
  );

  const errorInTab = (tab: number) => {
    switch (tab) {
      case 1:
        return !!(
          errors.title ||
          errors.subTitle ||
          errors.location ||
          errors.article ||
          errors.images
        );
      case 2:
        return !!(
          errors.firstName ||
          errors.lastName ||
          errors.social ||
          errors.web ||
          errors.email
        );
      case 3:
        return !!(
          errors.vehicleBrand ||
          errors.vehicleName ||
          errors.vehicleYear ||
          errors.recommendVanlifeAcc
        );
      default:
        return true;
    }
  };

  const toSecondTab = () => {
    const newSteps: Step[] = [];
    steps.forEach((step: Step) => {
      newSteps.push({
        ...step,
        status:
          step.index < 1
            ? "complete"
            : step.index === 1
            ? "current"
            : step.status,
      });
    });
    setSteps(newSteps);
    setSelectedStep(newSteps[1]);
  };

  const toThirdTab = () => {
    const newSteps: Step[] = [];
    steps.forEach((step: Step) => {
      newSteps.push({
        ...step,
        status: step.index < 2 ? "complete" : "current",
      });
    });
    setSteps(newSteps);
    setSelectedStep(newSteps[2]);
  };

  const toSubmit = () => {
    if (errorInTab(1) || errorInTab(2) || errorInTab(3)) {
      showToast(toast, asError("app.article.errors.errorInForm", ""));
      return;
    }

    if (!accepted) {
      showToast(toast, asError("app.article.errors.notAccepted", ""));
      return;
    }
    setSaving(true);

    getRecaptchaToken("ARTICLE_SUBMIT")
      .then((token) => {
        return axios.post("/api/submit_article", {
          token,
          article: getValues(),
        });
      })
      .then((response) => {
        if (response.status === 201) {
          showToast(
            toast,
            asSuccess(t("app.article.submitted"), t("app.article.contactSoon"))
          );
          setTimeout(() => {
            router.push("/");
          }, 3000);
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

  const showMore = () => {
    console.log("should open");
    setShowMoreVisible(new Date().getTime());
  };

  const renderFirstTab = () => (
    <>
      <FormProvider {...baseForm}>
        <ArticleTab showMore={showMore} />
      </FormProvider>
      <div className="flex justify-end mt-6">
        <button
          className={`__button __black __margin-bottom-2rem ${errorInTab(1) ? "__disabled" : ""}`}
          disabled={errorInTab(1)}
          onClick={toSecondTab}
        >
          {t("actions.next")}
          <ArrowThinRightIcon />
        </button>
      </div>
    </>
  );

  const backToFirstTab = () => {
    const newSteps: Step[] = [];
    steps.forEach((step: Step) => {
      newSteps.push({
        ...step,
        status: step.index > 0 ? "incomplete" : "current",
      });
    });
    setSteps(newSteps);
    setSelectedStep(newSteps[0]);
  };

  const backToSecondTab = () => {
    const newSteps: Step[] = [];
    steps.forEach((step: Step) => {
      newSteps.push({
        ...step,
        status:
          step.index > 1
            ? "incomplete"
            : step.index === 0
            ? step.status
            : "current",
      });
    });
    setSteps(newSteps);
    setSelectedStep(newSteps[1]);
  };

  const checked = () => {
    setAccepted((current) => !current);
  };
  const renderSecondTab = () => (
    <>
      <FormProvider {...baseForm}>
        <BasicTab />
      </FormProvider>
      <div className="flex justify-between mt-6">
        <button className={`__button __black`} onClick={backToFirstTab}>
          <ArrowThinLeftIcon />
          {t("actions.previous")}
        </button>
        <button
          className={`__button __black __margin-bottom-2rem ${errorInTab(2) ? "__disabled" : ""}`}
          disabled={errorInTab(2)}
          onClick={toThirdTab}
        >
          {t("actions.next")}
          <ArrowThinRightIcon />
        </button>
      </div>
    </>
  );

  const renderThirdTab = () => (
    <>
      <FormProvider {...baseForm}>
        <VehicleTab />
      </FormProvider>
      {disclaimerVisible ? (
        <div>{t("app.article.disclaimerLong")}</div>
      ) : (
        <div>
          {t("app.article.disclaimerShort")}
          <span className="pl-2 __show-more">
            <button onClick={() => setDisclaimerVisible(true)}>
              {t("app.article.showMore")}
            </button>
          </span>
        </div>
      )}
      <div className="flex pt-2">
        <Checkbox onChanged={checked} />
        <div className="pl-2">
          {t("app.article.acceptance")}
          <span className="__show-more">
            <a href="/privacy" target="_blank">
              {t("app.article.privacy")}
            </a>
          </span>
          {t("app.article.acceptance2")}
        </div>
      </div>
      <div className="flex mt-6 justify-between">
        <button className={`__button __black __margin-bottom-2rem`} onClick={backToSecondTab}>
          <ArrowThinLeftIcon />
          {t("actions.previous")}
        </button>
        <button
          className={`__button __black ${
            errorInTab(3) || !accepted ? "__disabled" : ""
          }`}
          disabled={
            errorInTab(1) || errorInTab(2) || errorInTab(3) || !accepted
          }
          onClick={toSubmit}
        >
          {t("app.article.submit")}
          <ArrowThinRightIcon />
        </button>
      </div>
    </>
  );

  const renderForm = () => {
    switch (selectedStep.caption) {
      case "1":
        return renderFirstTab();
      case "2":
        return renderSecondTab();
      case "3":
        return renderThirdTab();
    }
  };

  return isClient ? (
    <div>
      <BlockUi blocking={saving}>
        {renderStepper()}
        {selectedStep.caption === "1" && renderHotTopics()}
        {renderForm()}
      </BlockUi>
      <ShowMoreOverlay
        locale={props.locale}
        key={showMoreVisible}
        visible={showMoreVisible}
      />
    </div>
  ) : null;
};

ArticleForm.propTypes = {
  locale: PropTypes.string.isRequired,
  hotTopics: PropTypes.array.isRequired,
};

export default ArticleForm;
