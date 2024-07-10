import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { FC, useCallback, useEffect, PropsWithChildren } from "react";
import ModalOverlay from "../ModalOverlay/modal-overlay";

type ModalProps = {
  title?: string;
  onClose: () => void;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  title,
  onClose,
}) => {
  const closeByEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose, closeByEscape]);

  return createPortal(
    <div className={modalStyles.modal}>
      <div className={`${modalStyles.body}`}>
        <header className={`${modalStyles.heading} mr-10 ml-10`}>
          <h2 className={`${modalStyles.title} text text_type_main-large`}>
            {title}
          </h2>
          <div className={modalStyles.closeBtn}>
            <CloseIcon onClick={onClose} type="primary" />
          </div>
        </header>
        <main className={modalStyles.content}>{children}</main>
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    document.getElementById("modal")!
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
