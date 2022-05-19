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
    console.log('cfg', config);
    config.headers.authorization = `Bearer ${token}`
    return config;
})
instance.interceptors.response.use((res) => {
    console.log(res);
    return res
}, (err) => {
    console.log(err.response)
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
    console.log(name, password);
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

export const addVip = (name, sex, phone, score) => {
    return instance({
        url: "vip/add",
        method: "post",
        data: {
            name, sex, phone, score
        }
    });
}

export const updateVip = (id, name, sex, phone, score) => {
    return instance({
        url: "vip/update",
        method: "post",
        data: {
            id, name, sex, phone, score
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