import Koa, { Next, ParameterizedContext } from 'koa';
const app = new Koa();
import json from 'koa-json';
// import onerror from 'koa-onerror';  // 缺少 @types 包
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koajwt from 'koa-jwt';

import { customizeResponseBody } from './middlewares/response';
import { verifyAuthorization } from './middlewares/authorization';
import jwtconf from './config/jwt';
import index from './routes/index';
import users from './routes/users';
import roles from './routes/role';
import vip from './routes/vip'
import good from './routes/goods'
import cors from 'koa2-cors';
import activity from './routes/activity';
import supplier from './routes/supplier';
import rule from './routes/rule'
import order from './routes/order'

// error handler
// onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(cors({
    origin: '*'
}));
app.use(require('koa-static')(__dirname + '/public'));
app.use(customizeResponseBody());

// logger
app.use(async (ctx: ParameterizedContext, next: Next) => {
    const start: any = new Date();
    await next();
    const current: any = new Date();
    const ms = current - start;
});
// 这个错误处理必须放在 koajwt 前面，否则 koajwt 无效
app.use(verifyAuthorization());
app.use(
    koajwt({ secret: jwtconf.secret })
        .unless({
            path: [/\/users\/(login|register)/]
        })
);

// routes
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());
app.use(roles.routes()).use(roles.allowedMethods());
app.use(vip.routes()).use(vip.allowedMethods());
app.use(good.routes()).use(good.allowedMethods());
app.use(supplier.routes()).use(supplier.allowedMethods());
app.use(activity.routes()).use(activity.allowedMethods());
app.use(rule.routes()).use(rule.allowedMethods());
app.use(order.routes()).use(order.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;
