interface IIcon {
  classes?: string;
}

export const MessageIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={`${classes}`}>
      <path
        fill="currentColor"
        d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
      ></path>
    </svg>
  );
};

export const MenuDotIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={`${classes}`}>
      <path
        fill="currentColor"
        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
      ></path>
    </svg>
  );
};

export const PinIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg width="13" height="15" className={`${classes}`}>
      <path
        fill="currentColor"
        d="M12.074 4.21 8.7 8.232l.116 4.233a.4.4 0 0 1-.657.318L.43 6.297a.4.4 0 0 1 .199-.702l4.196-.622L8.196.957a.63.63 0 0 1 .887-.078l2.914 2.445a.63.63 0 0 1 .077.887ZM1.294 14.229a.713.713 0 0 1-1.09-.915l2.674-3.64 1.536 1.288-3.12 3.267Z"
      ></path>
    </svg>
  );
};

export const DoubleTickIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg viewBox="0 0 16 15" width="16" height="15" className={`${classes}`}>
      <path
        fill="currentColor"
        d="m15.01 3.316-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
      ></path>
    </svg>
  );
};

export const SearchIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={`${classes}`}>
      <path
        fill="currentColor"
        d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
      ></path>
    </svg>
  );
};

export const EmojiMenuIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={`${classes}`}>
      <path
        fill="currentColor"
        d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
      ></path>
    </svg>
  );
};

export const ClipMenuIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={`${classes}`}>
      <path
        fill="currentColor"
        d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
      ></path>
    </svg>
  );
};

export const MicIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={`${classes}`}>
      <path
        fill="currentColor"
        d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"
      ></path>
    </svg>
  );
};

export const GoogleIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg
      viewBox="0 0 1152 1152"
      focusable="false"
      aria-hidden="true"
      role="img"
      className={classes}
    >
      <path
        d="M1055.994 594.42a559.973 559.973 0 0 0-8.86-99.684h-458.99V683.25h262.28c-11.298 60.918-45.633 112.532-97.248 147.089v122.279h157.501c92.152-84.842 145.317-209.78 145.317-358.198z"
        fill="#4285f4"
      ></path>
      <path
        d="M588.144 1070.688c131.583 0 241.9-43.64 322.533-118.07l-157.5-122.28c-43.64 29.241-99.463 46.52-165.033 46.52-126.931 0-234.368-85.728-272.691-200.919H152.636v126.267c80.19 159.273 245 268.482 435.508 268.482z"
        fill="#34a853"
      ></path>
      <path
        d="M315.453 675.94a288.113 288.113 0 0 1 0-185.191V364.482H152.636a487.96 487.96 0 0 0 0 437.724z"
        fill="#fbbc05"
      ></path>
      <path
        d="M588.144 289.83c71.551 0 135.792 24.589 186.298 72.88l139.78-139.779C829.821 144.291 719.504 96 588.143 96c-190.507 0-355.318 109.21-435.508 268.482L315.453 490.75c38.323-115.19 145.76-200.919 272.691-200.919z"
        fill="#ea4335"
      ></path>
    </svg>
  );
};

export const CancelIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${classes}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export const SendIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={` ${classes}`}
      fill="none"
      viewBox="0 0 24 24"
      height={20}
      width={20}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
};

export const SuccessIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg
      className={`h-6 w-6 text-green-400 ${classes}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const WarningIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg
      className={`h-6 w-6 text-yellow-400 ${classes}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const ErrorIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg
      className={`h-6 w-6 text-red-400 ${classes}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const BackIcon = ({ classes = "" }: IIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 text-gray-200 ${classes}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};
