import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost($url: String, $title: String, $authorId: String) {
    addPost(url: $url, title: $title, authorId: $authorId) {
      createdAt
      id
      url
      title
      updatedAt
      authorId
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
      url
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $url: String) {
    updatePost(id: $id, title: $title, url: $url) {
      id
      url
      title
    }
  }
`;

export const VOTE = gql`
  mutation Vote($postId: ID!, $userId: ID!) {
    vote(postId: $postId, userId: $userId) {
      id
      postId
      userId
    }
  }
`;
