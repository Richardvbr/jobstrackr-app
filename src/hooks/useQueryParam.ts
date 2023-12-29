import { useSearchParams, useLocation } from "react-router-dom";

type Params = {
  [key: string]: string;
};

export function useQueryParam(query: string) {
  const [searchParams] = useSearchParams();
  const param = searchParams.get(query);

  return param;
}

export function useQueryParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params: Params = {};

  for (const param of searchParams) {
    params[param[0]] = param[1];
  }

  return params;
}
