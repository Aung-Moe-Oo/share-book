import { PrismaClient, Prisma } from "@prisma/client";
const { category } = new PrismaClient();

class Category {
  constructor() {}

  public get() {
    return category.findMany({
      orderBy: {
        category_id: "desc",
      },
    });
  }

  public getByCategoryId(category_id: string) {
    return category.findFirst({
      where: { category_id },
      orderBy: {
        category_id: "desc",
      },
    });
  }

  public create(props: Prisma.CategoryCreateInput) {
    return category.create({ data: props });
  }

  public update(category_id: string, props: Prisma.CategoryUpdateInput) {
    return category.update({
      where: {
        category_id,
      },
      data: props,
    });
  }

  public delete(category_id: string) {
    return category.delete({
      where: {
        category_id,
      },
    });
  }
}

export default Category;
