import Router from 'koa-router';
import { Next, ParameterizedContext } from 'koa';
import { getToken } from '../utils/token';
import User from '../models/db/user';

const router: Router<any, {}> = new Router();

router.prefix('/users');

router.get('/', async (ctx: ParameterizedContext, next: Next) => {
    console.log(ctx.request.body);
    let user = await User.findAll();
    ctx.body = ctx.formatResponseBody(0, user);
});

router.get('/login', async (ctx: ParameterizedContext, next: Next) => {
    console.log(ctx.request.body);
    const body = ctx.request.body;
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
    const token = await getToken({ id: 'token' });
    ctx.body = ctx.formatResponseBody(0, token);
});

router.get('/register', async (ctx: ParameterizedContext, next: Next) => {
    console.log(ctx.request.body);
    const body = ctx.request.body;
    const { name, password } = body;
    const haveSame = await User.findOne({ where: { name } });
    if(haveSame) {
        ctx.body = ctx.formatResponseBody(100);
        return;
    }
    if (!haveSame) {
        const result = await User.create({ name, password });
        console.log('result', result);
        ctx.body = ctx.formatResponseBody(0);
        return;
    }
    else {
        ctx.body = ctx.formatResponseBody(100);
    }
});

router.get('/changePassword', async (ctx: ParameterizedContext, next: Next) => {
    console.log(ctx.request.body);
    const body = ctx.request.body;
    const { name, password } = body;
    const result = await User.update(
        { password }, {
        where: { name }
    });
    console.log('result', result);
    ctx.body = ctx.formatResponseBody(0);
});


export default router;
