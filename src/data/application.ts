import { useMutation, useQuery } from '@tanstack/react-query';
import { handleRequest } from '@/utils/handleRequest';
import type { Response } from '@/types/response';
import type { Application } from '@/types/application';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useApplicationsQuery(token: string) {
  return useQuery({
    queryKey: ['get-applications'],
    queryFn: async () => {
      const request = await handleRequest<Response<Application[]>>({
        url: `${BASE_URL}/applications`,
        token,
      });

      return request.data ?? [];
    },
  });
}

export function useApplicationQuery(applicationId: string, token: string) {
  return useQuery({
    queryKey: [`get-application-${applicationId}`],
    queryFn: async () => {
      const request = await handleRequest<Response<Application>>({
        url: `${BASE_URL}/applications/${applicationId}`,
        token,
      });

      return request.data ?? {};
    },
  });
}

export function useNewApplicationMutation(token: string) {
  return useMutation({
    mutationFn: async (application: Application) => {
      const request = await handleRequest<Response<Application>>({
        url: `${BASE_URL}/applications`,
        token,
        method: 'POST',
        body: application,
      });

      return request.data;
    },
  });
}

export function useUpdateApplicationMutation(token: string) {
  return useMutation({
    mutationFn: async (application: Application) => {
      const request = await handleRequest<Response<Application>>({
        url: `${BASE_URL}/applications/${application.id}`,
        token,
        method: 'PUT',
        body: application,
      });

      return request.data;
    },
  });
}

export function useDeleteApplicationMutation(token: string) {
  return useMutation({
    mutationFn: async (application: Application) => {
      const request = await handleRequest<Response<Application>>({
        url: `${BASE_URL}/applications/${application.id}`,
        token,
        method: 'DELETE',
      });

      return request.data;
    },
  });
}
