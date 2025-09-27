import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  width?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  width = "max-w-lg",
}) => {
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""} z-50`}>
      <div className={`modal-box ${width} relative`}>
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <form method="dialog">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm btn-circle btn-ghost"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </form>
          </div>
        )}
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          Fechar
        </button>
      </form>
    </dialog>
  );
};
