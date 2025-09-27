export async function client(url: string, config?: RequestInit) {
  const basePath = process.env["NEXT_PUBLIC_API_URL"] as string;

  const apiKey = process.env["PUBLIC_API_TOKEN"] as string;

  return await fetch(`${basePath}${url}`, {
    ...config,
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
      ...config?.headers,
    },
  });
}
