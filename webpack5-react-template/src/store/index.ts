import { atom } from "recoil";
import {IRegister} from '@/request/axios'
export const globalPageList = atom({
    key: "ROLE",
    default: [] as string[],
});
export const disableComponents = atom({
    key: "DISABLE_COMPONENTS",
    default: [] as string[],
});
export const userInfo = atom({
    key: "USER_INFO",
    default: undefined as IRegister,
});

