export function capitalizeFirstLetter(word: string) {
  if (!word || !word.length) {
    return null;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}

type AuthOpts = {
  headers?: { [id: string]: string };
};

export const getAuthOpts = (params?: AuthOpts) => {
  const authString =
    process.env.ARGYLE_API_KEY + ":" + process.env.ARGYLE_API_SECRET;

  const authToken = Buffer.from(authString).toString("base64");

  const options = {
    headers: {
      Authorization: "Basic " + authToken,
      "Content-Type": "application/json",
      ...params?.headers,
    },
  };
  return options;
};
