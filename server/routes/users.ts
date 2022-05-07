import Router from "koa-router";
import { Next, ParameterizedContext } from "koa";
import { getToken } from "../utils/token";
import User from "../models/db/user";
import Role from "../models/db/role";

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

router.get("/", async (ctx: ParameterizedContext, next: Next) => {
  console.log(ctx.request.body);
  let user = await User.findAll();
  ctx.body = ctx.formatResponseBody(0, user);
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
  ctx.body = ctx.formatResponseBody(0, token, { ...project, list });
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

router.get("/changePassword", async (ctx: ParameterizedContext, next: Next) => {
  console.log(ctx.request.body);
  const body = ctx.request.body;
  const { name, password } = body;
  const result = await User.update(
    { password },
    {
      where: { name },
    }
  );
  console.log("result", result);
  ctx.body = ctx.formatResponseBody(0);
});

export default router;
