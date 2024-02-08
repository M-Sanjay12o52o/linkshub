import { Post, User } from "@prisma/client";

interface IPost extends Post {
  User: User[];
}
