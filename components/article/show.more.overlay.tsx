/* eslint-disable react/no-children-prop */

import PropTypes from "prop-types";
import React, {createRef, KeyboardEvent, MouseEvent, useEffect, useState,} from "react";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const TEXTS: Record<string, string[]> = {
  en: [
    "**Please provide** images of your van, yourself, and of places mentioned in your article.",
    "Check out previous [Vanlifezone magazine issues](/issues) for inspiration.",
    "",
    "**Bonus: 1 or 2 calm videos**",
    "- vertical 9:16",
    "- 6-10 seconds",
    "- show your van from outside, preferably in a cool location and in a similar style to your fotos",
    "",
    "",
    "",
    "Here's an [example](/issues)",
    "",
    "**How to use WeTransfer**",
    "",
    '1. Go to <a href="https://wetransfer.com" target="_blank">wetransfer.com</a>',
    "1. If you've never used it before, select _I just want to send files_ & agree to the terms",
    "1. Drag & drop your files",
    "1. Press the 3 dots (...)",
    "1. Select _Get transfer link_",
    "1. Press _Get a link_",
    "1. Wait for the images to finish uploading and then copy the link",
    "1. Paste link in the textbox below",
    "",
    "",
    "",
    "**When using Google Drive or Dropbox**",
    "",
    " Please ensure that the links you provide are publicly accessible and have proper permissions for us to access them.",
  ],
  de: [
    "**Bitte sende** uns Bilder von deinem Van, dir selbst und von Orten, die in deinem Artikel erwähnt werden.",
    "Schau dir frühere [Vanlifezone Magazine Ausgaben](/issues) für Inspiration an.",
    "",
    "**Bonus: 1 oder 2 ruhige Videos**",
    "- vertikal 9:16",
    "- 6-10 Sekunden",
    "- zeige deinen Van von außen, vorzugsweise an einem coolen Ort und in einem ähnlichen Stil wie deine Fotos",
    "",
    "",
    "",
    "Hier ist ein [Beispiel](/issues)",
    "",
    "**So benutzt du WeTransfer**",
    "",
    '1. Gehe zu <a href="https://wetransfer.com" target="_blank">wetransfer.com</a>',
    "1. Wenn du es noch nie zuvor verwendet hast, wähle _Ich möchte nur Dateien senden_ und stimme den Bedingungen zu",
    "1. Ziehe deine Dateien per Drag & Drop",
    "1. Drücke die 3 Punkte (...)",
    "1. Wähle _Transfer-Link abrufen_",
    "1. Drücke _Link erhalten_",
    "1. Warte, bis die Bilder hochgeladen sind, und kopiere dann den Link",
    "1. Füge den Link in das Textfeld unten ein",
    "",
    "",
    "",
    "**Wenn du Google Drive oder Dropbox verwendest**",
    "",
    "Bitte stelle sicher, dass die Links, die du angibst, öffentlich zugänglich sind und die richtigen Berechtigungen haben, damit wir darauf zugreifen können.",
  ],
};
const ShowMoreOverlay = (props: any) => {
  const message: string[] = TEXTS[props.locale] ?? TEXTS.en;
  const [visible, setVisible] = useState<number>(props.visible);
  const popupRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (visible > 0) {
      popupRef.current?.focus();
    }
  }, [visible]);

  const hide = (event: MouseEvent<HTMLElement>) => {
    const id = Reflect.get(event.target, "id");
    if (["backdrop", "close", "menu-close"].includes(id)) {
      event.preventDefault();
      event.stopPropagation();
      setVisible(0);
    }
  };

  const keyDown = (event: KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.code === "Escape") {
      setVisible(0);
    }
  };

  const renderPopup = () => (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 outline-0"
      id="backdrop"
      onClick={hide}
    >
      <div
        tabIndex={0}
        autoFocus={true}
        className="max-w-3xl flex flex-col mx-auto mt-40 bg-white rounded-lg outline-0"
        onKeyDown={keyDown}
        ref={popupRef}
      >
        <div className="flex justify-end p-2">
          <MenuCloseIcon
            id="close"
            className="__menu-icon cursor-pointer"
            onClick={hide}
            tabIndex={0}
          />
        </div>
        <div className="mx-8 mb-8" id="smd">
          <ReactMarkdown
            children={message.join("\n")}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </div>
    </div>
  );

  return visible > 0 ? renderPopup() : null;
};

ShowMoreOverlay.propTypes = {
  locale: PropTypes.string.isRequired,
  visible: PropTypes.number.isRequired,
};
export default ShowMoreOverlay;
