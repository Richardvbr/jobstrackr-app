import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ApplicationsPage } from "@/features/applications";

const Applications = () => {
  useDocumentTitle("Applications | JobsTrackr");

  return <ApplicationsPage />;
};

export default Applications;
