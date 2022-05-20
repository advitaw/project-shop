import Good from "../models/db/goods";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import { Op } from "sequelize";
import category from "../models/db/category";

const router: Router<any, {}> = new Router();
router.prefix("/goods");

router.post('/', async (ctx: ParameterizedContext) => {
    const query: any = {}
    const { title, supplier, category } = ctx.request.body;
    if (title) {
        query.title = title;
    }
    if (supplier) {
        query.supplier = supplier;
    }
    if (category) {
        query.category = category;
    }
    const goods = await Good.findAll({
        where: {
            ...query,
            title: {
                [Op.substring]: title || ''
            }
        }
    })
    ctx.body = ctx.formatResponseBody(0, goods);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { url, title, price, supplier, total, category } = ctx.request.body;
        const haveSame = await Good.findOne({ where: { title } });
        if (haveSame) {
            ctx.body = ctx.formatResponseBody(100);
            return;
        }
        if (!haveSame) {
            await Good.create({
                url, title, price, supplier, total, category
            });
            ctx.body = ctx.formatResponseBody(0);
            return;
        }
    } catch (err) {
        ctx.body = ctx.formatResponseBody(-1);
    }
})
router.post('/addCat', async (ctx: ParameterizedContext) => {
    try {
        const { label, parent } = ctx.request.body;
        const haveSame = await category.findOne({ where: { label } });
        if (haveSame) {
            ctx.body = ctx.formatResponseBody(100);
            return;
        }
        if (!haveSame) {
            await category.create({
                label, parent
            });
            ctx.body = ctx.formatResponseBody(0);
            return;
        }
    } catch (err) {
        ctx.body = ctx.formatResponseBody(-1);
    }
})

router.post('/deleteCat', async (ctx: ParameterizedContext) => {
    const { id } = ctx.request.body;
    await category.destroy({
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);
})

router.get('/getCat', async (ctx: ParameterizedContext) => {
    const cats = await category.findAll();
    ctx.body = ctx.formatResponseBody(0, cats);
})


router.post('/delete', async (ctx: ParameterizedContext) => {
    const { id } = ctx.request.body;
    await Good.destroy({
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);

})
router.post('/update', async (ctx: ParameterizedContext) => {
    const { id, url, title, price, supplier, total, category } = ctx.request.body;
    await Good.update({ url, title, price, supplier, total, category }, {
        where: {
            id
        }
    })
    ctx.body = ctx.formatResponseBody(0);
})


export default router;