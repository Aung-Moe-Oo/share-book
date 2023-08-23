import { PrismaClient, Prisma } from "@prisma/client";
const { post } = new PrismaClient();

class Post {
  constructor() {}

  public get() {
    return post.findMany({
      orderBy: {
        post_id: "desc",
      },
      include: {
        created_by: {
          select: {
            user_name: true,
            email: true,
          },
        },
        category: true,
        reported_user_ids: true,
      },
    });
  }

  public getPublishedPost() {
    return post.findMany({
      where: { status: "published" },
      orderBy: {
        post_id: "desc",
      },
      include: {
        created_by: {
          select: {
            user_name: true,
            email: true,
          },
        },
        category: true,
        reported_user_ids: true,
      },
    });
  }

  public getByPostId(post_id: string) {
    return post.findFirst({
      where: { post_id },
      include: {
        created_by: {
          select: {
            user_name: true,
            email: true,
          },
        },
        category: true,
        reported_user_ids: true,
      },
    });
  }

  public create(props: Prisma.PostCreateInput) {
    return post.create({ data: props });
  }

  public update(post_id: string, props: Prisma.PostUpdateInput) {
    return post.update({
      where: {
        post_id,
      },
      data: props,
    });
  }

  public delete(post_id: string) {
    return post.delete({
      where: {
        post_id,
      },
    });
  }
}

export default Post;
