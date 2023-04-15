export function log(text) {
  const filename = _getCallerFile().split("/").slice(-1);

  console.log(`%c[7wasd][${filename}]`, "background: #7532a8; border-radius: 4px; font-weight: bold; padding: 3px;", text);
}

// https://stackoverflow.com/a/66842927/20827007
function _getCallerFile() {
    const prepareStackTraceOrg = Error.prepareStackTrace;
    const err = new Error();

    Error.prepareStackTrace = (_, stack) => stack;

    const stack = err.stack;

    Error.prepareStackTrace = prepareStackTraceOrg;

    return stack[2].getFileName();
}