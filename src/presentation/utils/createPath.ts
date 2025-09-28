type ExtractRouteParams<Route extends string> =
  Route extends `${string}:${infer Param}/${infer Rest}` // Match `:param` followed by the rest of the URL
    ? Param | ExtractRouteParams<`/${Rest}`> // Recursively extract params from the rest of the URL
    : Route extends `${string}:${infer Param}` // Match the last param without a trailing slash
      ? Param
      : never;

export function createPath<T extends string>(
  basePath: T,
  params: Record<ExtractRouteParams<T>, string>,
): string {
  return Object.entries<string>(params).reduce((path, [key, value]) => {
    return path.replace(`:${key}`, String(value));
  }, basePath as string);
}
