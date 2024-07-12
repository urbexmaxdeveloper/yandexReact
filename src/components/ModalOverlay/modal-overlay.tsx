import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
  return <div onClick={onClose} className={styles.overlay}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
