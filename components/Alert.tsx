import React, { useEffect } from "react";
import {
  CancelIcon,
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
} from "../utils/icons";

export interface IAlert {
  type: "success" | "warning" | "error";
  title: string;
  subTitle?: string;
  onClose?: () => void;
}

const Alert = ({
  type = "success",
  title = "",
  subTitle = "",
  onClose = () => null,
}: IAlert) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <SuccessIcon />;
      case "warning":
        return <WarningIcon />;
      case "error":
        return <ErrorIcon classes="text-red-400" />;
      default:
        return <SuccessIcon />;
    }
  };

  useEffect(() => {
    setTimeout(() => onClose(), 3000);
  }, [onClose]);

  return (
    <div
      aria-live="assertive"
      className="z-50 fixed  inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">{getIcon()}</div>
              <div className="ml-3 w-0 flex-1 ">
                <p className="text-md font-medium text-gray-700 align-middle flex items-start  ">
                  {title}
                </p>
                {subTitle && (
                  <p className="mt-1 text-sm text-gray-500 a">{subTitle}</p>
                )}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  type="button"
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none "
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <CancelIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
