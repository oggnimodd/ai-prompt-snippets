import React from "react";
import Loading from "./Loading";
import type { LoadingProps } from "./Loading";

interface LoadingWithMessageProps extends LoadingProps {
  message?: string;
}

const LoadingWithMessage: React.FC<LoadingWithMessageProps> = ({
  message = "loading...",
  ...rest
}) => {
  return (
    <div
      data-cy="loading-indicator-with-message"
      className="flex h-64 w-full flex-col items-center justify-center"
    >
      <Loading {...rest} />
      <span
        data-cy="loading-message"
        className="mt-4 text-center text-lg dark:text-white"
      >
        {message}
      </span>
    </div>
  );
};

export default LoadingWithMessage;
