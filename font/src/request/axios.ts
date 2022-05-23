import axios from "axios";
const baseURL: string = "http://127.0.0.1:3000/";
const token = "";
export const instance = axios.create({
    baseURL,
    headers: {
        authorization: token,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`
    return config;
})
instance.interceptors.response.use((res) => {
    return res
}, (err) => {
    if (err?.response && err?.response?.status === 401) {
        window.location.pathname = '/login';
    }
    return Promise.reject(err);
})
export interface IRegister {
    name: string;
    password: string;
    workTime: string;
    phone: string;
    email: string;
    nickName: string;
    shopName: string;
}
export const login = (name: string, password: string) => {
    return instance({
        url: "users/login",
        method: "post",
        data: {
            name,
            password,
        },
    });
};
export const register = (params: IRegister) => {
    return instance({
        url: "users/register",
        method: "post",
        data: {
            params
        },
    });
};


export const getRoleList = () => {
    return instance({
        url: "role",
        method: "get"
    });
};


export const getUsersList = (name?) => {
    return instance({
        url: "users",
        method: "post",
        data: {
            name
        }
    });
};


export const deleteRole = (id) => {
    return instance({
        url: "role/delete",
        method: "post",
        data: {
            id
        }
    });
}

export const deleteUser = (id) => {
    return instance({
        url: "users/delete",
        method: "post",
        data: {
            id
        }
    });
}


export const updateUser = (id, role) => {
    return instance({
        url: "users/update",
        method: "post",
        data: {
            id, role
        }
    });
}

export const updateRole = (id, label, pageList, disabledComponents) => {
    return instance({
        url: "role/update",
        method: "post",
        data: {
            id, label, pageList, disabledComponents
        }
    });
}

export const updateInfo = (id, item) => {
    return instance({
        url: "users/updateInfo",
        method: "post",
        data: {
            id, ...item
        }
    });
}
export const addRole = (label, pageList, disabledComponents) => {
    return instance({
        url: "role/add",
        method: "post",
        data: {
            label, pageList, disabledComponents
        }
    });
}


export const getVipList = (name?) => {
    return instance({
        url: "vip",
        method: "post",
        data: {
            name
        }
    });
};

export const addVip = (name, sex, phone, score, age) => {
    return instance({
        url: "vip/add",
        method: "post",
        data: {
            name, sex, phone, score, age
        }
    });
}

export const updateVip = (id, name, sex, phone, score, age) => {
    return instance({
        url: "vip/update",
        method: "post",
        data: {
            id, name, sex, phone, score, age
        }
    });
}

export const deleteVip = (id) => {
    return instance({
        url: "vip/delete",
        method: "post",
        data: {
            id
        }
    });
}


export const getGoodsList = (title?, sup?, cat?) => {
    return instance({
        url: "goods",
        method: "post",
        data: {
            title, sup, cat
        }
    });
}

export const addGood = (url, title, price, supplier_id, total, category_id) => {
    return instance({
        url: "goods/add",
        method: "post",
        data: {
            url, title, price, supplier_id, total, category_id
        }
    });
}

export const deleteGood = (id) => {
    return instance({
        url: "goods/delete",
        method: "post",
        data: {
            id
        }
    });
}

export const updateGood = (params) => {
    return instance({
        url: "goods/update",
        method: "post",
        data: {
            params
        }
    });
}

export const addCat = (label, parent) => {
    console.log('label', label)
    console.log('parent', parent)
    return instance({
        url: "goods/addCat",
        method: "post",
        data: {
            label, parent
        }
    });
}

export const deleteCat = (ids) => {
    return instance({
        url: "goods/deleteCat",
        method: "post",
        data: {
            ids
        }
    });
}


export const getCat = () => {
    return instance({
        url: "goods/getCat",
        method: "get",
    });
}


export const getSupplier = (name?, phone?, linkman?, address?, type?) => {
    return instance({
        url: "supplier/",
        method: "post",
        data: {
            name, phone, linkman, address, type
        }
    });
}

export const addSupplier = (name, address, phone, linkman, type) => {
    return instance({
        url: "supplier/add",
        method: "post",
        data: {
            name, address, phone, linkman, type
        }
    });
}

export const updateSupplier = (id, name, address, phone, linkman, type) => {
    return instance({
        url: "supplier/update",
        method: "post",
        data: {
            id, name, address, phone, linkman, type
        }
    });
}

export const deleteSupplier = (id) => {
    return instance({
        url: "supplier/delete",
        method: "post",
        data: {
            id
        }
    });
}

export const getRule = () => {
    return instance({
        url: "rule/",
        method: "get"
    });
}

export const addRule = (name, limit, dec, type) => {
    return instance({
        url: "rule/add",
        method: "post",
        data: {
            name, limit, dec, type
        }
    });
}

export const addAct = (name, creator, rule, startTime, endTime, list) => {
    return instance({
        url: "activity/add",
        method: "post",
        data: {
            name, creator, rule, startTime, endTime, list
        }
    });
}
export const getAct = (name?) => {
    return instance({
        url: "activity/",
        method: "post",
        data: {
            name
        }
    });
}

export const deleteActivity = (id?) => {
    return instance({
        url: "activity/delete",
        method: "post",
        data: {
            id
        }
    });
}

export const getOrder = (date?, type_id?, sup_id?, amount?, activity_id?, vip_id?, current?, pageSize?) => {
    console.log(date, type_id, sup_id, amount, activity_id, vip_id, current, pageSize)
    return instance({
        url: "order",
        method: "post",
        data: {
            amount, activity_id, sup_id, date, type_id, vip_id, current, pageSize
        }
    });
}

export const deleteOrder = (id) => {
    return instance({
        url: "order/delete",
        method: "post",
        data: {
            id
        }
    });
}

export const addOrder = (params) => {
    return instance({
        url: "order/add",
        method: "post",
        data: {
            params
        }
    });
}

export const changePassword = (name, newPassword) => {
    return instance({
        url: "users/changePassword",
        method: "post",
        data: {
            name, newPassword
        }
    });
}
export const getDash = () => {
    return instance({
        url: "dash/getDashboard",
        method: "get",
    });
}
export const getRecord = () => {
    return instance({
        url: "dash/record",
        method: "get",
    });
}
export const vipSta = () => {
    return instance({
        url: "vip/sta",
        method: "get",
    });
}