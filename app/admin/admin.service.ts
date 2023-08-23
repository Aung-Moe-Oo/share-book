import { PrismaClient, Prisma } from "@prisma/client";
const { admin } = new PrismaClient();

class Admin {
  constructor() {}

  public createNewAdmin(props: Prisma.AdminCreateInput) {
    return admin.create({ data: props });
  }

  public findAdmin(name: string) {
    return admin.findFirst({ where: { name } });
  }

  public updateAdmin(login_id: string, props: Prisma.AdminUpdateInput) {
    return admin.update({ where: { login_id }, data: props });
  }
}

export default Admin;
