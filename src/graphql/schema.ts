export const typeDefs = `#graphql
    scalar DateTime

    type Post {
        id:        ID!  
        createdAt: DateTime
        updatedAt: DateTime
        title: String
        url: String
        published: Boolean
        author: User
        authorId: Int
    }

    type User {
        id: ID!
        name: String
        email: String
        posts: [Post]
        postId: String
    }

    type Query {
        post(id: ID!): Post
            posts: [Post]
    }

    type Mutation {
        addPost (url: String, title: String): Post
        updatePost (id: ID!, title: String, url: String): Post
        deletePost (id: ID!): Post
    }
`;
