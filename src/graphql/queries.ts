import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts {
    posts {
      id
      url
      createdAt
      title
      updatedAt
    }
  }
`;

export const GET_POST = gql`
  query Post($id: ID!) {
    novel(id: $id) {
      id
      url
      title
    }
  }
`;
