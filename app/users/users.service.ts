import { PrismaClient, Prisma } from "@prisma/client";
const { user } = new PrismaClient();

class User {
  constructor() {}

  public createNewUser(props: Prisma.UserCreateInput) {
    return user.create({ data: props });
  }

  public getAllUsers() {
    return user.findMany();
  }

  public findUser(email: string) {
    return user.findUnique({ where: { email } });
  }

  public updateUser(user_id: string, props: Prisma.UserUpdateInput) {
    return user.update({ where: { user_id }, data: props });
  }

  public deleteUser(user_id: string) {
    return user.delete({ where: { user_id } });
  }
}

export default User;
