const infoLogger = (...params: any) => {
  console.log(...params);
};

const errorLogger = (...params: any) => {
  console.error(...params);
};

export { infoLogger, errorLogger };
