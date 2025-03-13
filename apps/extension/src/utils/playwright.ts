// If body has playwright class return true
export const isTesting = () => {
  return !!document.body.classList.contains("playwright");
};

export const logForTesting = (msg: any) => {
  if (isTesting()) {
    console.log(msg);
  }
};
