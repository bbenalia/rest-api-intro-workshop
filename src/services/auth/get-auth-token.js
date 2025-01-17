/**
 *
 * @param {*} email
 */
function getAuthToken(headers = {}) {
  return new Promise((resolve, reject) => {
    if (
      !headers.authorization ||
      !headers.authorization.startsWith("Bearer ")
    ) {
      reject(new Error("Missing authorization header"));
    }

    const bearerToken = headers.authorization.substr(7);
    resolve(bearerToken);
  });
}

module.exports = {
  getAuthToken: getAuthToken,
};
