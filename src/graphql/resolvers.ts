import { Context } from "@/pages/api/graphql";

export const resolvers = {
  Query: {
    //get post by id
    post: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    // get all posts
    posts: async (_parent: any, _args: any, context: Context) => {
      return await context.prisma.post.findMany({
        include: { author: true },
      });
    },
  },

  Mutation: {
    // add post
    addPost: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.post.create({
        data: {
          title: args.title,
          url: args.url,
          author: args.author,
        },
      });
    },
    // update post
    updatePost: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.post.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          url: args.url,
        },
      });
    },

    // delete post
    deletePost: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.post.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
