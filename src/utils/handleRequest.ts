type HandleRequest = {
  url: string;
  token: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
};

export async function handleRequest<T>({
  url,
  token,
  method = 'GET',
  body,
  headers = {},
}: HandleRequest): Promise<T> {
  if (!token) {
    throw new Error('No token provided');
  }

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...headers,
  };

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`status: ${response.status}, url: ${url}, message: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.log('HTTP error:', error);
    return null as any;
  }
}
