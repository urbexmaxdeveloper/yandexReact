import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/modal-overlay";

export default function Modal({
  children,
  title,
  isOpen,
  setIsModalOpen,
  height,
  width,
}) {
  const escHandler = useCallback(
    (ev) => {
      if (ev.key === "Escape") {
        setIsModalOpen(false);
      }
    },
    [setIsModalOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);
    return () => {
      document.removeEventListener("keydown", escHandler, false);
    };
  }, [escHandler]);
  if (!isOpen) return null;
  return createPortal(
    <>
      <div
        className={`${styles.modal}`}
        style={{ height: `${height ?? 600}px`, width: `${width ?? 600}px` }}
      >
        <div className={styles.title}>
          <p className="text text_type_main-large">{title}</p>
          <button
            className={styles.closeBtn}
            onClick={() => setIsModalOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
      <ModalOverlay onModalClosed={setIsModalOpen} />
    </>,
    document.querySelector("#modal-root")
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};
