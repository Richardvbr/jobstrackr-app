import { cmsRequest } from "@/lib/datocms";
import {
  type SharedContent,
  type ApplicationsContent,
  type DocumentsContent,
  SHARED,
  APPLICATIONS,
  DOCUMENTS,
} from "@/features/cms";

export async function getSharedContent() {
  const response = await cmsRequest<SharedContent>({ query: SHARED });

  return response;
}

export async function getApplicationsContent() {
  const response = await cmsRequest<ApplicationsContent>({
    query: APPLICATIONS,
  });

  return response;
}

export async function getDocumentsContent() {
  const response = await cmsRequest<DocumentsContent>({ query: DOCUMENTS });

  return response;
}
