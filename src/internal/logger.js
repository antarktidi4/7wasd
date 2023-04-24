/**
 * Log function, logs in format of `[7wasd][%file%] %text%`.
 * 
 * @function log
 * @param {String} text - Text to log
 */
export function log(text) {
  const filename = _getCallerFile().split("/").slice(-1);
  console.log(`%c[7wasd][${filename}]`, "background: #7532a8; border-radius: 4px; font-weight: bold; padding: 3px;", text);
}

// https://stackoverflow.com/a/66842927/20827007
/**
 * Function that returns a file path where it called.
 * 
 * @function _getCallerFile
 * @returns {String} File path
 */
function _getCallerFile() {
  try {
    const prepareStackTraceOrg = Error.prepareStackTrace;
    const err = new Error();
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = err.stack;
    Error.prepareStackTrace = prepareStackTraceOrg;
    return stack[2].getFileName();
  } catch {
    return "mozilla/does_not/support/this/undefined.js";
  }
}