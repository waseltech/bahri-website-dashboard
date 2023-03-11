const baseUrl = "http://localhost:4000/api/";

export interface HttpRequestOptions {
  method?: string;
  body?: any;
}

export const httpClient = async (url: string, options?: HttpRequestOptions) => {
  const token = localStorage.getItem("token");

  const response = await fetch(baseUrl + url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(options?.body && { body: JSON.stringify(options.body) }),
  });

  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(
      data?.errors?.map((r: any) => r.message)?.toString() || "server error"
    );
  }

  console.log(data);

  return Promise.resolve(data);
};
