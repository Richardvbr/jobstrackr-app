import { gql } from "graphql-request";

export const SHARED = gql`
  query {
    shared {
      showing
      of
      results
      applications
      dashboard
      questions
      feedback
      signOut
      documents
      tips
      account
      jobstrackr
    }
  }
`;

export const APPLICATIONS = gql`
  query {
    applicationsPage {
      title
      newApplication
      applicationSearch
    }
  }
`;

export const DOCUMENTS = gql`
  query {
    documentsPage {
      title
      addNewDocument
      allDocumentsTitle
    }
  }
`;
