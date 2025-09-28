export async function client(url: string, config?: RequestInit) {
  const basePath = process.env["NEXT_PUBLIC_API_URL"] as string;

  return await fetch(`${basePath}${url}`, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
  });
}
