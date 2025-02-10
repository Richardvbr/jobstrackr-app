import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/contexts/AuthContext';
import { handleRequest } from '@/utils/handleRequest';
import type { Application } from '../types';
import type { Response } from '@/types/response';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useApplicationsQuery() {
  const token = useToken();

  return useQuery({
    queryKey: ['get-applications'],
    queryFn: async () => {
      const request = await handleRequest<Response<Application[]>>({
        url: `${BASE_URL}/applications`,
        token,
      });

      return request?.data;
    },
  });
}

export function useApplicationQuery(applicationId: string) {
  const token = useToken();

  return useQuery({
    queryKey: [`get-application-${applicationId}`],
    queryFn: async () => {
      const request = await handleRequest<Response<Application>>({
        url: `${BASE_URL}/applications/${applicationId}`,
        token,
      });

      return request?.data;
    },
  });
}
