import axios from 'axios';
const baseURL:string = '127.0.0.1:3000';
const token = 
export const instance = axios.create({
    baseURL,
    headers:['authorization', token];
})
const login = (name:string, password:string) => {

}