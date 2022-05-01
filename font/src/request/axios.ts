import axios from 'axios';
const baseURL: string = 'http://127.0.0.1:3000/';
const token = '';
export const instance = axios.create({
    baseURL,
    headers: { 'authorization': token, 'Content-Type': 'application/json', 'Accept': 'application/json' },
})
export const login = (name: string, password: string) => {
    console.log(name, password);
    return instance({
        url: 'users/login',
        method: 'post',
        data: {
            name, password
        }
    })
}