import React from "react";
import style from "./layout.module.scss";

import { Paper } from "components/ui-libraries";
import Breadcrumbs from "../breadcrumbs/breadcrumbs.component";

const ColumnList: React.FC = props => {
  return (
    <Paper
      classes={{
        root: `${style.layout__column} ${style["layout__column--list"]}`
      }}
      {...props}
    />
  );
};

const ColumnDetail: React.FC = props => {
  return (
    <Paper
      classes={{
        root: `${style.layout__column} ${style["layout__column--detail"]}`
      }}
      {...props}
    />
  );
};

const Layout: React.FC = ({ children, ...rest }) => {
  return (
    <div className={style.layout}>
      <Breadcrumbs />
      <div className={style.layout__body} {...rest}>
        {children}
      </div>
    </div>
  );
};

export { Layout, ColumnList, ColumnDetail };
