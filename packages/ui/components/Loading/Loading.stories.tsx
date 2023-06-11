import React from "react";
import Loading from "./Loading";
import LoadingWithMessage from "./LoadingWithMessage";

export const Default: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <Loading />
      <Loading size="button" />
    </div>
  );
};

export const Colors: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-3 bg-black">
      <Loading color="white" />
      <Loading color="white" size="button" />
    </div>
  );
};

export const LoadingWithMessageDefault = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <LoadingWithMessage />
    </div>
  );
};

export const LoadingWithMessageCustomMessage = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <LoadingWithMessage message="This will continue loading indefinitely, please refrain from waiting." />
    </div>
  );
};
