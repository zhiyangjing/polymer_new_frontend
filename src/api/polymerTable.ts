import { http } from "@/utils/http";
import { baseUrlApi, queryStr } from "./utils";
import { downloadByData } from "@pureadmin/utils";

export interface PolymerDataDisplay {
  id?: number;
  sample_name?: string;
  temp_initial?: GLfloat;
  temp_max?: GLfloat;
  residue_mass?: GLfloat;
  time?: Date;
  pdf_url?: string;
}

type Result = {
  success: boolean;
  data: {
    count: number;
    rows: Array<PolymerDataDisplay>;
  };
};

/** 获取高分子材料列表表数据 */
export const getPolymerData = (currentPage, pageSize, searchStr: string) => {
  return http.request<Result>(
    "get",
    baseUrlApi(
      `polymer-info/query?page=${currentPage}&size=${pageSize}&` + searchStr
    )
  );
};

/** 获取高分子材料统计数据 */
export const getPolymerStaticData = () => {
  return http.request<Result>("get", baseUrlApi("polymer-info/static/query"));
};

/** 增加高分子材料列表表数据 */
export const addPolymerData = (data: object) => {
  return http.request<any>("post", baseUrlApi("polymer-info/add"), {
    data
  });
};
/** 修改高分子材料列表表数据 */
export const putPolymerData = (id, data: object) => {
  return http.request<any>("put", baseUrlApi(`polymer-info/put/${id}`), {
    data
  });
};

/** 删除高分子材料列表表数据 */
export const deletePolymerData = (id: number) => {
  return http.request<any>("delete", baseUrlApi(`polymer-info/delete/${id}`));
};

/** 添加高分子材料列表列数据 */
export const addPolymerColumn = (data: object) => {
  return http.request<any>("post", baseUrlApi("polymer-info/addcolumn"), {
    data
  });
};

export const addSearchPerformance = (data: object) => {
  return http.request<any>("post", baseUrlApi("polymer-info/addperformance"), {
    data
  });
};

export const deleteSearchPerformance = (data: object) => {
  return http.request<any>("post", baseUrlApi("polymer-info/deleteperformance"), {
    data
  });
};


/**上传高分子材料介绍Pdf文件 */
export const uploadPdf = (data: FormData) => {
  return http.request<any>(
    "post",
    baseUrlApi(`polymer-info/upload-pdf`),
    {
      data
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};
export const uploadGif = (data: FormData) => {
  return http.request<any>(
    "post",
    baseUrlApi(`polymer-info/upload-gif`),
    {
      data
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

export const downloadExcel = () => {
  http
    .request<any>("get", baseUrlApi("polymer-info/static-excel"), {
      responseType: "blob"
    })
    .then(res => {
      downloadByData(res, "polymer-template模板.xlsx");
    });
};

export const downloadPdfById = (data: any) => {
  return http
    .request<any>(
      "get",
      baseUrlApi("polymer-info/pdf/query" + queryStr(data)),
      {
        responseType: "blob"
      }
    )
    .then(res => {
      downloadByData(res, data.fileName + ".pdf");
    });
};
