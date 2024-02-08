import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost($url: String, $title: string) {
    addPost(url: $url, title: $title) {
      createdAt
      id
      url
      title
      updatedAt
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
