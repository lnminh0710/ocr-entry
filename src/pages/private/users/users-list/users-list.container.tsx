import React from "react";
import styles from "./users-list.module.scss";

import { Paper, Typography } from "components/ui-libraries";
import { Placeholder, Table, Status } from "components/ui-own";

import { useTranslation } from "react-i18next";

const UserList: React.FC<any> = ({
  state,
  handleSearch,
  handleRowClick,
  doCreate
}) => {
  const { t } = useTranslation(["common"]);

  const columns = [
    {
      keyValue: "username",
      label: t("username"),
      type: "primary",
      width: "15%"
    },
    {
      keyValue: "organization.name",
      label: t("organization"),
      width: "25%"
    },
    {
      keyValue: "fullName",
      label: t("fullname"),
      width: "25%"
    },
    {
      keyValue: "email",
      label: t("email"),
      width: "15%"
    },
    {
      keyValue: "active",
      label: t("active"),
      width: "20%",
      align: "center",
      render: (data: any) => {
        return <Status active={data.active} />;
      }
    }
  ];

  return (
    <Paper className={styles.root}>
      <Typography variant="h6">{t("users")}</Typography>
      {state.isFirstLoad && <Placeholder />}
      {!state.isFirstLoad && (
        <Table
          onRowClick={handleRowClick}
          // order={filters.desc}
          // orderBy={filters.sortby}
          doCreate={doCreate}
          onSearch={handleSearch}
          onLoadMore={() => {}}
          columns={columns}
          isLoading={state.isLoading}
          rowCount={state.datas.length}
          datas={state.datas}
        />
      )}
    </Paper>
  );
};

export default UserList;
