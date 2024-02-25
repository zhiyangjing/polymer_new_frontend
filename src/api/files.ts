import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import axios from "axios";
import {
  downloadByOnlineUrl,
  downloadByBase64,
  downloadByData,
  downloadByUrl
} from "@pureadmin/utils";

type Result = {
  success: boolean;
  data?: Array<any>;
};

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("dept"), { data });
};

export const formUpload = data => {
  return http.request<Result>(
    "post",
    baseUrlApi("upload"),
    { data },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

export const get_file_list = () => {
  return http.request<Result>("get", baseUrlApi("get_file_list"));
};

// type FileType = {
//   data:Blob;
// };

export const download_file = (id: number, filename: string): boolean => {
  let is_success = true;
  http
    .request<Blob>("get", baseUrlApi(`download/${id}`), {
      responseType: "blob"
    })
    .then(res => {
      console.log(res);
      // console.log(res.data)
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // 设置下载文件的名称
      document.body.appendChild(link);
      link.click(); // 触发下载
      document.body.removeChild(link); // 下载后移除链接
      window.URL.revokeObjectURL(url); // 释放URL对象
    })
    .catch(err => {
      is_success = false;
      return false;
    });
  return is_success;
};
