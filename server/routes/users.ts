import Router from "koa-router";
import { Next, ParameterizedContext } from "koa";
import { getToken } from "../utils/token";
import User from "../models/db/user";
import Role from "../models/db/role";
import Sequelize from "../models";
import { Op } from "sequelize";

const router: Router<any, {}> = new Router();
const getPageList = async (roles: string) => {
  const role = roles.split(",");
  console.log(role);
  let pageString = "";
  for (const id of role) {
    console.log("id", id);
    const r = await Role.findOne({ where: { id } });
    console.log(3);
    console.log("r", r);
    const { pageList } = r;
    console.log("pageList", pageList);
    pageString += pageList;
    pageString += ",";
  }
  console.log(pageString);
  const tmp = pageString.split(",");
  console.log("tmp", tmp);
  return [...new Set(tmp)];
};

router.prefix("/users");

router.post("/", async (ctx: ParameterizedContext, next: Next) => {
  console.log(ctx.request.body);
  const { name } = ctx.request.body;
  let users;
  console.log('shaixuan````````````', name);
  if (name) {
    users = await User.findAll({
      where: {
        name: {
          [Op.startsWith]: name,
        }
      }
    });
  } else {
    users = await User.findAll();
  }
  console.log('``````````````````', users);
  for (let user of users) {
    const tmp: any[] = []
    console.log('ssd', user.role);
    const roleArr = user.role.split(',');
    console.log('roleArr', roleArr);
    for (let item of roleArr) {
      const role = await Role.findOne({ where: { id: item } })
      console.log(role, 'role');
      tmp.push(role)
    }
    user.role = tmp;
  }
  ctx.body = ctx.formatResponseBody(0, users);
});

router.post("/login", async (ctx: ParameterizedContext, next: Next) => {
  console.log(ctx.request.body);
  const body = ctx.request.body;
  console.log("读body", body);
  const { name, password } = body;
  const project = await User.findOne({ where: { name } });
  if (project === null) {
    ctx.body = ctx.formatResponseBody(102);
    return;
  }
  if (project.password !== password) {
    ctx.body = ctx.formatResponseBody(101);
    return;
  }
  console.log(project.role);
  const token = await getToken({ id: "token" });
  const list = await getPageList(project.role);
  console.log("list", list);
  const tmp = []
  for (let item of project.role.split(',')) {
    const role = await Role.findOne({ where: { id: item } })
    console.log(role, 'role');
    tmp.push(role)
  }
  ctx.body = ctx.formatResponseBody(0, token, { ...project, list, tmp });
});

router.post("/register", async (ctx: ParameterizedContext, next: Next) => {
  console.log(ctx.request.body);
  const body = ctx.request.body;
  const { params } = body;
  const { name } = params;
  const haveSame = await User.findOne({ where: { name } });
  if (haveSame) {
    ctx.body = ctx.formatResponseBody(100);
    return;
  }
  if (!haveSame) {
    const result = await User.create({
      ...params,
      role: "3",
    });
    console.log("result", result);
    const token = await getToken({ id: "token" });
    const list = await getPageList(result.role);
    ctx.body = ctx.formatResponseBody(0, token, { ...result, list });
    return;
  } else {
    ctx.body = ctx.formatResponseBody(-1);
  }
});

router.post("/changePassword", async (ctx: ParameterizedContext, next: Next) => {
  console.log(ctx.request.body);
  const body = ctx.request.body;
  const { name, newPassword } = body;
  const result = await User.update(
    { password: newPassword },
    {
      where: { name },
    }
  );
  console.log("result", result);
  ctx.body = ctx.formatResponseBody(0);
});

router.post('/delete', async (ctx: ParameterizedContext) => {
  const { id } = ctx.request.body;
  await User.destroy({
    where: {
      id
    }
  })
  ctx.body = ctx.formatResponseBody(0);
})

router.post('/update', async (ctx: ParameterizedContext) => {
  const { id, role } = ctx.request.body;
  await User.update({ role }, {
    where: {
      id
    }
  })
  ctx.body = ctx.formatResponseBody(0);
})


router.post('/updateInfo', async (ctx: ParameterizedContext) => {
  const { id, nickName, phone, email, shopName, workTime } = ctx.request.body;
  await User.update({ nickName, phone, email, shopName, workTime }, {
    where: {
      id
    }
  })
  const user = await User.findAll({
    where: {
      id
    }
  })
  ctx.body = ctx.formatResponseBody(0, user);
})

export default router;
