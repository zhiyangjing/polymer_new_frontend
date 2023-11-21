import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
export interface UserDataDisplay {
  id?: number;
  username?: string;
  phone?: string;
  password?: string;
  role?: string;
  time?: string;
}

type Result = {
  success: boolean;
  data: Array<UserDataDisplay>;
};

/** 获取用户列表表数据 */
export const getUserData = () => {
  return http.request<Result>("get", baseUrlApi("user/query"));
};
/** 增加用户列表表数据 */
export const addUserData = (data: object) => {
  return http.request<Result>("post", baseUrlApi("user/add"), {
    data
  });
};
/** 修改用户列表表数据 */
export const putUserData = (id, data: object) => {
  return http.request<Result>("put", baseUrlApi(`user/put/${id}`), {
    data
  });
};
/** 删除用户列表表数据 */
export const deleteUserData = (id: number) => {
  return http.request<Result>("delete", baseUrlApi(`user/delete/${id}`));
};
