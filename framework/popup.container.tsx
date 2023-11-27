import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AppCommandType, Command} from "@framework/events";
import {getClientTranslator} from "@framework/i18n.client.utils";

const PopupContainer = (props: any) => {
  const t = getClientTranslator();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [command, setCommand] = useState<Command | undefined>(props.command);

  useEffect(() => {
    if (!command) {
      return;
    }
    switch (command.command) {
      case AppCommandType.OPEN_POPUP: {
        // when the popup must be opened
        onOpen();
        break;
      }
      case AppCommandType.CLOSE_POPUP: {
        // when the popup must be closed
        console.log("should close popup");
        onClose();
        break;
      }
    }
  }, [command]);

  const renderFooter = () => (
    <ModalFooter className={`__modal-footer ${props.id}`}>
      {props.renderFooter ? (
        props.renderFooter()
      ) : (
        <Button variant="outline" mr={3} onClick={onClose}>
          {t("actions.close")}
        </Button>
      )}
    </ModalFooter>
  );

  const renderHeader = () => (
    <ModalHeader className={`__modal-header ${props.id}`}>
      {props.renderHeader
        ? props.renderHeader()
        : t(`dialog.${props.id}.header`)}
    </ModalHeader>
  );

  return (
    <Modal
      isOpen={isOpen}
      size="6xl"
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      key={props.id}
    >
      <ModalOverlay/>
      <ModalContent className={`__modal-content ${props.id} w-full`}>
        {renderHeader()}
        <ModalBody className={`__modal-body ${props.id}`}>
          {props.children}
        </ModalBody>
        {renderFooter()}
      </ModalContent>
    </Modal>
  );
};

PopupContainer.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  command: PropTypes.object,
};

export default PopupContainer;
