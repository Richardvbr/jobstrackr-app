import { cmsRequest } from "@/lib/datocms";
import {
  type SharedContent,
  type ApplicationsContent,
  type DocumentsContent,
  SHARED,
  APPLICATIONS,
  DOCUMENTS,
} from "@/features/cms";

export async function getSharedContent(): Promise<SharedContent> {
  const response = await cmsRequest({ query: SHARED });
  return response as SharedContent;
}

export async function getApplicationsContent(): Promise<ApplicationsContent> {
  const response = await cmsRequest({ query: APPLICATIONS });
  return response as ApplicationsContent;
}

export async function getDocumentsContent(): Promise<DocumentsContent> {
  const response = await cmsRequest({ query: DOCUMENTS });
  return response as DocumentsContent;
}
