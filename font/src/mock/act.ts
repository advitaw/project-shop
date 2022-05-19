export const actMap = {
    0: '满减',
    1: '打折',
    2: '赠礼',
}
export const actRule = [
    {
        id: 0,
        name: '五月满减',
        type: [0],
        limit: [100],
        dec: [20],
        desc: ['满100减20','满200减40','满300减50','满400减80']
    },
    {
        id: 1,
        name: '五月打折',
        type: [1],
        limit: [100],
        discount: [0.8],
        desc: ['满100打九折','满200打八折']
    },
    {
        id: 2,
        name: '五月满赠',
        type: [2],
        limit: [100],
        gift: [1],
        num: [1],
        desc: ['满100送可乐*1','满200送可乐*2','满300送可乐*3','满400送可乐*4']
    },
    {
        id: 3,
        name: '验收新建满减',
        type: [0],
        limit: [100,200,300],
        dec: [10,20],
    },
]
export const act = [
    {
        id: 0,
        name: '五月满减',
        creator: 'admin',
        rule: 0,
        startTime: 1651334400000,
        endTime: 1654012800000
    }, {
        id: 1,
        name: '五月打折',
        creator: 'admin',
        rule: 1,
        startTime: 1651334400000,
        endTime: 1654012800000
    }, {
        id: 2,
        name: '五月赠礼',
        creator: 'admin',
        rule: 2,
        startTime: 1651334400000,
        endTime: 1654012800000
    }, {
        id: 3,
        name: '五月综合',
        creator: 'admin',
        rule: 0,
        startTime: 1651334400000,
        endTime: 1654012800000
    }, {
        id: 4,
        name: '活动132',
        creator: 'admin',
        rule: 1,
        startTime: 1651334400000,
        endTime: 1654012800000
    }, {
        id: 5,
        name: '活动132',
        creator: 'admin',
        rule: 1,
        startTime: 1651334400000,
        endTime: 1654012800000
    }, {
        id: 6,
        name: '活动132',
        creator: 'admin',
        rule: 1,
        startTime: 1651334400000,
        endTime: 1654012800000
    }, {
        id: 7,
        name: '活动132',
        creator: 'admin',
        rule: 1,
        startTime: 1651334400000,
        endTime: 1654012800000
    },
]