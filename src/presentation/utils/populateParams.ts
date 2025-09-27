export function populateParams(
  url: string,
  params: Record<string, string>,
): string {
  Object.entries(params).forEach(([key, value]) =>
    url.replace(`[${key}]`, value),
  );
  return url;
}
