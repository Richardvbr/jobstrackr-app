import { GraphQLClient } from "graphql-request";

type RequestProps = {
  query: any;
};

export function cmsRequest({ query }: RequestProps) {
  const headers = {
    authorization: `Bearer ${process.env.DATOCMS_API_KEY}`,
  };

  const client = new GraphQLClient("https://graphql.datocms.com", { headers });

  return client.request(query);
}
