import React from "react";
import { TourProvider } from "@reactour/tour";
import App from "./App";
import $ from "jquery";
import { Button } from "semantic-ui-react";
var step0count = 5;
var step1count = 4;
function RightPanel() {
  const steps = [
    {
      selector: ".step2",
      action: () => {
        if ($(".step1").hasClass("open")) {
          $(".step1click").trigger("click");
        }
      },
      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            با این دکمه ها می توانید صفحه بازی را کنترل نمایید.
          </p>
          {printBtn(
            "",
            "برو بعدی",
            setCurrentStep,
            step1count + step0count + 1,
            false,
            true,
            ".step0",
            currentStep,
            ".step2"
          )}
        </>
      ),
      position: "right",

      style: {
        backgroundColor: "#041014",
      },
    },
    {
      selector: ".step0",
      action: () => {
        if ($(".step1").hasClass("open")) {
          $(".step1click").trigger("click");
        }
      },
      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            در این قسمت به اطلاعات اکانت خود و همچنین خرید و برداشت سریع دسترسی
            خواهید داشت.
          </p>

          {printBtn(
            "بیشتر در موردش بگو",
            "برو بعدی",
            setCurrentStep,
            step0count + step1count,
            false,
            false,
            ".step1",
            currentStep,
            ".step0"
          )}
        </>
      ),
      position: "bottom",
      padding: {
        mask: [15, 20],
        popover: [15, 15],
      },
      style: {
        backgroundColor: "#041014",
      },
    },
    {
      selector: ".step0-1",

      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            با کلیک روی این آیکون اطلاعات پیشرفت جوایز در انتظار را خواهید دید.
          </p>
          {printBtn(
            "ادامه بده",
            "برو بعدی",
            setCurrentStep,
            step0count + step1count,
            false,
            false,
            ".step1",
            currentStep,
            ".step0"
          )}
        </>
      ),
      position: "bottom",
      padding: {
        mask: [10, 17],
        popover: [15, 15],
      },
      style: {
        backgroundColor: "#041014",
      },
    },
    {
      selector: ".step0-2",

      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            با کلیک روی این قسمت اطلاعات پروفایل خود را خواهید دید.
          </p>
          {printBtn(
            "ادامه بده",
            "برو بعدی",
            setCurrentStep,
            step0count + step1count,
            false,
            false,
            ".step1",
            currentStep,
            ".step0"
          )}
        </>
      ),
      position: "bottom",
      padding: {
        mask: [2, 5],
        popover: [15, 15],
      },
      style: {
        backgroundColor: "#041014",
      },
    },
    {
      selector: ".step0-3",

      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            با استفاده از این دکمه ها به خرید و برداشت سریع دسترسی خواهید داشت.
          </p>
          {printBtn(
            "ادامه بده",
            "برو بعدی",
            setCurrentStep,
            step0count + step1count,
            false,
            false,
            ".step1",
            currentStep,
            ".step0"
          )}
        </>
      ),
      position: "bottom",
      padding: {
        mask: [5, 10],
        popover: [20, 15],
      },
      style: {
        backgroundColor: "#041014",
      },
    },
    {
      selector: ".step0-4",

      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            با استفاده از این دکمه به جوایز خود دسترسی خواهید داشت.
          </p>
          {printBtn(
            "",
            "برو بعدی",
            setCurrentStep,
            step0count + step1count,
            false,
            false,
            ".step1",
            currentStep,
            ".step0"
          )}
        </>
      ),
      position: "bottom",
      padding: {
        mask: [5, 10],
        popover: [20, 15],
      },
      style: {
        backgroundColor: "#041014",
      },
    },
    {
      selector: ".step1",
      action: () => {
        if (!$(".step1").hasClass("open")) {
          $(".step1click").trigger("click");
        }
      },
      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            با این دکمه پنل سمت راست باز می شود و اطلاعات میزهای فعال و آخرین
            جوایز را نمایش می دهد.
          </p>
          {printBtn(
            "خب بازش کن و بیشتر بگو",
            "برو بعدی",
            setCurrentStep,
            step1count,
            false,
            false,
            ".step3",
            currentStep,
            ".step1"
          )}
        </>
      ),

      position: "left",
      padding: {
        mask: [10, 10],
        popover: [15, 15],
      },
      observe: ".step1-1",
    },
    {
      selector: ".step1-1",
      action: () => {
        if (!$(".step1").hasClass("open")) {
          $(".step1click").trigger("click");
        }
      },
      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            لیست میز های فعال که با کلیک روی هر میز برای شما باز خواهد شد.
          </p>
          {printBtn(
            "ادامه بده",
            "برو بعدی",
            setCurrentStep,
            step1count,
            true,
            true,
            ".step3",
            currentStep,
            ".step1"
          )}
        </>
      ),

      position: "left",
      padding: {
        mask: 0,
        popover: [5, 10],
      },
    },
    {
      selector: ".step1-2",
      action: () => {
        if (!$(".step1").hasClass("open")) {
          $(".step1click").trigger("click");
        }
      },
      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            با استفاده از این دکمه ها می توانید لیست میز های فعال رو فیلتر کنید.
          </p>
          {printBtn(
            "ادامه بده",
            "برو بعدی",
            setCurrentStep,
            step1count,
            true,
            true,
            ".step3",
            currentStep,
            ".step1"
          )}
        </>
      ),
      position: "left",
      padding: {
        mask: 0,
        popover: [5, 10],
      },
    },
    {
      selector: ".step1-3",
      action: () => {
        if (!$(".step1").hasClass("open")) {
          $(".step1click").trigger("click");
        }
      },
      content: ({ setCurrentStep, currentStep }) => (
        <>
          <p className="farsi">
            لیست آخرین پاداش ها که با کلیک کردن روی هر کاربر می توانید پروفایل
            آن را مشاهده نمایید.
          </p>
          {printBtn(
            "",
            "برو بعدی",
            setCurrentStep,
            step1count,
            false,
            true,
            ".step3",
            currentStep,
            ".step1"
          )}
        </>
      ),
      position: "left",
      padding: {
        mask: 0,
        popover: [5, 10],
      },
      style: {
        backgroundColor: "#041014",
      },
    },

    {
      selector: ".step3",

      content: ({ setCurrentStep, setIsOpen }) => (
        <>
          <p className="farsi">با این دکمه منوی اصلی باز می شود.</p>

          <Button.Group
            fluid
            vertical
            labeled
            icon
            size="mini"
            style={{ marginTop: 40 }}
          >
            <Button
              icon="times"
              className="farsi"
              onClick={() => {
                setIsOpen(false);
                setCurrentStep(0);
              }}
              content="مرسی. ببندش"
            />
          </Button.Group>
        </>
      ),
      position: "right",
      padding: {
        mask: [10, 10],
        popover: [15, 15],
      },
      style: {
        backgroundColor: "#041014",
      },
    },
  ];

  function nextTarget(num) {
    var def = 0;
    steps.map((step, i) => {
      if (i > num) {
        if ($(steps[i].selector + ":visible").length) {
          if (def == 0) def = i;
        }
      }
    });
    return def;
  }
  function nextTargetMain(num, clas) {
    var def = 0;
    steps.map((step, i) => {
      if (i > num && steps[i].selector == clas) {
        if ($(steps[i].selector + ":visible").length) {
          if (def == 0) def = i;
        } else {
          if (def == 0) def = i + 1;
        }
      }
    });

    return def;
  }
  function printBtn(
    content1,
    content2,
    setCurrentStep,
    step,
    openpanel,
    closepanel,
    nextSelection,
    currentStep,
    mainStep
  ) {
    return (
      <Button.Group
        fluid
        vertical
        labeled
        icon
        size="mini"
        style={{ marginTop: 40 }}
      >
        {content1 && (
          <>
            <Button
              onClick={() => {
                setCurrentStep((s) => nextTarget(s));
              }}
              className="farsi"
              icon="ellipsis vertical"
              content={content1}
            />
          </>
        )}
        {content2 && (
          <>
            <Button
              icon="arrow left"
              color="red"
              className="farsi"
              onClick={() => {
                setCurrentStep((s) => nextTargetMain(s, nextSelection));
              }}
              content={content2}
            />
          </>
        )}
      </Button.Group>
    );
  }

  return (
    <TourProvider
      steps={steps}
      showBadge={false}
      showNavigation={false}
      onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false);
          }

          setCurrentStep((s) => nextTarget(s));
          //$(".reactour__popover").find(".button:first").trigger("click");
        }
      }}
      position="center"
      styles={{
        popover: (base) => ({
          ...base,
          "--reactour-accent": "#ef5a3d",
          borderRadius: 10,
          background: "#071e26",
          color: "#eee",
          fontSize: 12,
          lineHeight: 20,
        }),
        maskArea: (base) => ({
          ...base,
          rx: 3,
        }),
        maskWrapper: (base) => ({ ...base, color: "#be4d25" }),

        close: (base) => ({
          ...base,
          right: "auto",
          left: 8,
          top: 8,
          color: "#fff",
        }),
      }}
    >
      <App />
    </TourProvider>
  );
}
export default RightPanel;
