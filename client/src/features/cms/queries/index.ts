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
      logout
      documents
      tips
      account
      jobstrackr
    }
  }
`;

export const APPLICATIONS = gql`
  query {
    applications {
      title
      newApplication
      applicationSearch
    }
  }
`;

export const DOCUMENTS = gql`
  query {
    documents {
      title
    }
  }
`;
