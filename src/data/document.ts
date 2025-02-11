import { useMutation, useQuery } from '@tanstack/react-query';
import { useToken } from '@/contexts/AuthContext';
import { handleRequest } from '@/utils/handleRequest';
import type { Response } from '@/types/response';
import type { Document } from '@/types/document';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useDocumentsQuery() {
  const token = useToken();

  return useQuery({
    queryKey: ['get-documents'],
    queryFn: async () => {
      const request = await handleRequest<Response<Document[]>>({
        url: `${BASE_URL}/documents`,
        token,
      });

      return request?.data;
    },
  });
}

export function useDocumentQuery(documentId: string) {
  const token = useToken();

  return useQuery({
    queryKey: [`get-document-${documentId}`],
    queryFn: async () => {
      const request = await handleRequest<Response<Document>>({
        url: `${BASE_URL}/documents/${documentId}`,
        token,
      });

      return request?.data;
    },
  });
}

export function useNewDocumentMutation(documentId: string) {
  const token = useToken();

  return useMutation({
    mutationKey: [`new-document-${documentId}`],
    mutationFn: async (documentbody: any) => {
      const request = await handleRequest<Response<any>>({
        url: `${BASE_URL}/documents`,
        token,
        method: 'POST',
        body: documentbody,
      });

      return request?.data;
    },
  });
}
