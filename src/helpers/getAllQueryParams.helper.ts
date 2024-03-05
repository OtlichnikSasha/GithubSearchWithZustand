export const getAllQueryParamsHelper = (
  searchParams: URLSearchParams,
): { [key: string]: string[] | string } => {
  const params: { [key: string]: string[] | string } = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  console.log('params', params);

  return params;
};
