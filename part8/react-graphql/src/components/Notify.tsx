import React from "react";

const Notify = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}> {errorMessage} </div>;
};

export default Notify;
