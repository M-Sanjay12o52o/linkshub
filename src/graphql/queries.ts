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
    post(id: $id) {
      id
      url
      title
    }
  }
`;

// mutation to vote
export const VOTE = gql`
  mutation Vote($postId: ID!, $userId: ID!) {
    vote(postId: $postId, userId: $userId) {
      id
      postId
      userId
    }
  }
`;
