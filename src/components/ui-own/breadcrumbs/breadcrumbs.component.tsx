import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "./breadcrumbs.module.scss";

import { Breadcrumbs, Typography } from "../../ui-libraries";

import { HomeIcon } from "../../ui-libraries/icons";

import { useTranslation } from "react-i18next";

import { ROUTES } from "constants/navigation";

const BreadcrumbsComp: React.FC<RouteComponentProps> = props => {
  const [paths, setPaths] = useState<any>([]);
  const { t } = useTranslation(["common"]);
  const { match } = props;

  useEffect(() => {
    const { url, path }: any = match;
    const pathNames: string[] = path.split("/");
    const params: string[] = url.split("/");

    const p: any = [
      {
        i18n: "dashboard",
        path: ROUTES.Dashboard
      }
    ];

    if (params.length > 1) {
      for (let i = 1; i < params.length; i++) {
        if (ROUTES.Dashboard === `/${params[i]}`) {
          continue;
        }

        let str = "";
        for (let j = 1; j < i; j++) {
          str = `${str}/${params[j]}`;
        }

        str = `${str}/${params[i]}`;

        const pathName = pathNames[i];
        const i18n = !pathName.includes(":")
          ? pathName.replace("-", "_")
          : `url_${pathName.substr(1)}`;

        p.push({
          i18n,
          path: str
        });
      }
    }
    setPaths(p);
  }, [match]);

  return (
    <Breadcrumbs className={styles.breadcrumbs} aria-label="breadcrumb">
      {paths.map((e: any, i: number) => {
        if (i + 1 === paths.length) {
          return (
            <Typography key={i} color="textPrimary">
              {i === 0 && <HomeIcon />}
              {t(e.i18n)}
            </Typography>
          );
        }

        return (
          <Link key={i} to={e.path}>
            {i === 0 && <HomeIcon />}
            {t(e.i18n)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default withRouter(BreadcrumbsComp);
