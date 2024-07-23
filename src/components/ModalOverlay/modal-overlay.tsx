import React from "react";
import styles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
  return <div onClick={onClose} className={styles.overlay}></div>;
};

export default ModalOverlay;
