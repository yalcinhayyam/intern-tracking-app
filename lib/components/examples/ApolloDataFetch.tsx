"use client";
import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books(first: 3) {
      edges {
        node {
          title
        }
      }
    }
  }
`;
function ApolloDataFetch() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  console.log("🚀 ~ file: page.tsx:28 ~ Home ~ error:", error);
  console.log("🚀 ~ file: page.tsx:28 ~ Home ~ data:", data);
  return <div>{data}</div>;
}
