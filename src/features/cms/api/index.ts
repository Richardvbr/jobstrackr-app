import { useQuery } from "@tanstack/react-query";

import {
  type SharedContent,
  type ApplicationsContent,
  type DocumentsContent,
} from "@/features/cms";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/cms`;

export function getSharedContentQuery() {
  return useQuery({
    queryKey: ["get-cms-shared"],
    queryFn: async () => {
      const data: SharedContent = await fetch(`${API_BASE_URL}/shared`).then((res) => res.json());

      return data;
    },
  });
}

export function getDocumentsContentQuery() {
  return useQuery({
    queryKey: ["get-cms-documents"],
    queryFn: async () => {
      const data: DocumentsContent = await fetch(`${API_BASE_URL}/documents`).then((res) =>
        res.json()
      );

      return data;
    },
  });
}

export function getApplicationsContentQuery() {
  return useQuery({
    queryKey: ["get-cms-applications"],
    queryFn: async () => {
      const data: ApplicationsContent = await fetch(`${API_BASE_URL}/applications`).then((res) =>
        res.json()
      );

      return data;
    },
  });
}
