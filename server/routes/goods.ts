import Good from "../models/db/goods";
import Router from "koa-router";
import { ParameterizedContext } from "koa";
import { Op } from "sequelize";
import category from "../models/db/category";
import supplier from "../models/db/supplier";
import record from "../models/db/record";

const router: Router<any, {}> = new Router();
router.prefix("/goods");

router.post('/', async (ctx: ParameterizedContext) => {
    category.hasOne(Good, { foreignKey: 'category_id', sourceKey: 'id' })
    Good.belongsTo(category, { foreignKey: 'category_id', targetKey: 'id' })
    supplier.hasOne(Good, { foreignKey: 'supplier_id', sourceKey: 'id' })
    Good.belongsTo(supplier, { foreignKey: 'supplier_id', targetKey: 'id' })
    const query: any = {}
    const { title, sup, cat } = ctx.request.body;
    if (title) {
        query.title = title;
    }
    if (sup) {
        query['supplier_id'] = sup;
    }
    if (cat) {
        query['category_id'] = cat;
    }
    const goods = await Good.findAll({
        where: {
            ...query,
            title: {
                [Op.substring]: title || ''
            },
        },
        include: [category, supplier]
    })
    ctx.body = ctx.formatResponseBody(0, goods);
})

router.post('/add', async (ctx: ParameterizedContext) => {
    try {
        const { url, title, price, supplier_id, total, category_id } = ctx.request.body;
        const haveSame = await Good.findOne({ where: { title } });
        if (haveSame) {
            ctx.body = ctx.formatResponseBody(100);
            return;
        }
        if (!haveSame) {
            await Good.create({
                url, title, price, supplier_id, total, category_id
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
        console.log(label, parent)
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
        console.log(err);
        ctx.body = ctx.formatResponseBody(-1);
    }
})

router.post('/deleteCat', async (ctx: ParameterizedContext) => {
    const { ids } = ctx.request.body;
    for (let i = 0; i < ids.length; i++) {
        await category.destroy({
            where: {
                id: ids[i]
            }
        })

    }
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
    const { params } = ctx.request.body;
    const s = new Date()
    const date = `${s.getFullYear()}-${s.getMonth() + 1 < 10 ? '0' + (s.getMonth() + 1) : s.getMonth() + 1}`
    console.log('goods```````````````````````````````````', params)
    const { id, url, title, price, supplier_id, total, category_id } = params
    await Good.update({ url, title, price, supplier_id, category_id }, {
        where: {
            id
        }
    })
    const good = await Good.findOne({
        where: {
            id
        }
    })
    console.log('good', good)
    await Good.increment({ total: total }, { where: { id } })
    const r = await record.findOrCreate({
        where: {
            date
        },
        defaults: {
            num: 0, costing: 0
        }
    })
    console.log('```````````````````', Math.abs(total), good.price, +(Math.abs(total) * +good.price))
    if (total < 0) {
        await Good.increment({ sales: Math.abs(total) }, { where: { id } })
        await record.increment({
            num: +(Math.abs(total) * +good.price),
        }, {
            where: {
                date
            },
        })
    } else {
        await record.increment({
            costing: +(Math.abs(total) * +good.inPrice)
        }, {
            where: {
                date
            }
        })
    }

    ctx.body = ctx.formatResponseBody(0);
})


export default router;