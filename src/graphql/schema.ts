export const typeDefs = `#graphql
    scalar DateTime

    type Post {
        id:        String!  
        createdAt: DateTime
        updatedAt: DateTime
        title: String
        url: String
        published: Boolean
        author: User
        authorId: ID
    }

    type User {
        id: ID!
        name: String
        email: String
        posts: [Post]
        postId: String
    }

    type Vote {
        id: ID!
        postId: ID!
        userId: ID!
    }

    type Query {
        post(id: ID!): Post
            posts: [Post]
    }

    type Mutation {
        addPost (url: String, title: String): Post
        updatePost (id: ID!, title: String, url: String): Post
        deletePost (id: ID!): Post
        vote(postId: ID!, userId: ID!): Vote
    }
`;
