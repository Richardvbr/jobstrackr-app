import { useMutation, useQuery } from '@tanstack/react-query';
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

export function useNewApplicationMutation(applicationId: string) {
  const token = useToken();

  return useMutation({
    mutationKey: [`new-application-${applicationId}`],
    mutationFn: async (application: Application) => {
      const request = await handleRequest<Response<Application>>({
        url: `${BASE_URL}/applications/${applicationId}`,
        token,
        method: 'POST',
        body: application,
      });

      return request?.data;
    },
  });
}

export function useUpdateApplicationMutation(applicationId: string) {
  const token = useToken();

  return useMutation({
    mutationKey: [`update-application-${applicationId}`],
    mutationFn: async (application: Application) => {
      const request = await handleRequest<Response<Application>>({
        url: `${BASE_URL}/applications/${applicationId}`,
        token,
        method: 'PUT',
        body: application,
      });

      return request?.data;
    },
  });
}

export function useDeleteApplicationMutation(applicationId: string) {
  const token = useToken();

  return useMutation({
    mutationKey: [`delete-application-${applicationId}`],
    mutationFn: async () => {
      const request = await handleRequest<Response<Application>>({
        url: `${BASE_URL}/applications/${applicationId}`,
        token,
        method: 'DELETE',
      });

      return request?.data;
    },
  });
}
