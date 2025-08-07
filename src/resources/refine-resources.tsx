import { DashboardFilled } from "@ant-design/icons";

export const refineResources = [
  {
    name: "dashboard",
    list: "/dashboard",
    meta: {
      canDelete: false,
      icon: <DashboardFilled />,
    },
  },
  {
    name: "organizations",
    list: "/organizations",
    create: "/organizations/create",
    edit: "/organizations/edit/:id",
    show: "/organizations/show/:id",
    meta: {
      canDelete: true,
    },
  },
  // {
  //   name: "sites",
  //   list: "/sites",
  //   create: "/sites/create",
  //   edit: "/sites/edit/:id",
  //   show: "/sites/show/:id",
  //   meta: {
  //     canDelete: true,
  //   },
  // },
];
