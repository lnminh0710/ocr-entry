import React from "react";

import {
  HomeIcon,
  DashboardIcon,
  TextFieldsIcon,
  BusinessIcon,
  GroupIcon,
  StorageIcon,
  CloudDownloadIcon,
  CloudUploadIcon,
  DvrIcon,
  PlaylistAddCheckIcon,
  VerifiedUserIcon,
  LibraryBooksIcon,
  PersonAddIcon
} from "components/ui-libraries/icons";

export enum ROUTES {
  Home = "/",
  Batches = "/batches",
  Dashboard = "/dashboard",
  DatabaseViewer = "/database-viewer",
  Export = "/export",
  Fields = "/fields",
  Import = "/import",
  Monitor = "/monitor",
  Quality = "/quality",
  Functions = "/functions",
  FunctionDetail = "/functions/:id",
  Organizations = "/organizations",
  OrganizationDetail = "/organizations/:id",
  Users = "/users",
  UserDetail = "/users/:id",
  AddPerson = "/add-person" 
}

export const SIDE_BAR = [
  {
    keyi18n: "home",
    linkTo: ROUTES.Home,
    icon: <DashboardIcon />
  },
  {
    keyi18n: "dashboard",
    linkTo: ROUTES.Dashboard,
    icon: <HomeIcon />
  },
  {
    keyi18n: "batches",
    linkTo: ROUTES.Batches,
    icon: <LibraryBooksIcon />
  },
  {
    keyi18n: "database_viewer",
    linkTo: ROUTES.DatabaseViewer,
    icon: <StorageIcon />
  },
  {
    keyi18n: "export",
    linkTo: ROUTES.Export,
    icon: <CloudDownloadIcon />
  },
  {
    keyi18n: "fields",
    linkTo: ROUTES.Fields,
    icon: <TextFieldsIcon />
  },
  {
    keyi18n: "export",
    linkTo: ROUTES.Import,
    icon: <CloudUploadIcon />
  },
  {
    keyi18n: "monitor",
    linkTo: ROUTES.Monitor,
    icon: <DvrIcon />
  },
  {
    keyi18n: "quality_control",
    linkTo: ROUTES.Quality,
    icon: <PlaylistAddCheckIcon />
  },
  {
    keyi18n: "organizations",
    linkTo: ROUTES.Organizations,
    icon: <BusinessIcon />
  },
  {
    keyi18n: "functions",
    linkTo: ROUTES.Functions,
    icon: <VerifiedUserIcon />
  },
  {
    keyi18n: "users",
    linkTo: ROUTES.Users,
    icon: <GroupIcon />
  },
  {
    keyi18n: "add_person",
    linkTo: ROUTES.AddPerson,
    icon: <PersonAddIcon />
  }
];
