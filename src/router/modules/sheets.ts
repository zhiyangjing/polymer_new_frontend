import { $t } from "@/plugins/i18n";
import { sheets } from "@/router/enums";

export default {
  path: "/sheets",
  redirect: "/sheets/index",
  meta: {
    icon: "setUp",
    title: $t("menus.hsSheets"),
    rank: sheets
  },
  children: [
    {
      path: "/sheets/index",
      name: "Sheets",
      component: () => import("@/views/sheets/index.vue"),
      meta: {
        title: $t("menus.hsSheets")
      }
    }
  ]
} as RouteConfigsTable;
