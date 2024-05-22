import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ onModalClosed }) {
  return (
    <div
      className={styles.root}
      onClick={(ev) => {
        if (ev.currentTarget === ev.target) {
          onModalClosed(false);
        }
      }}
    />
  );
}

ModalOverlay.propTypes = {
  onModalClosed: PropTypes.func.isRequired,
};
