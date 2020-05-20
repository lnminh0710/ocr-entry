import React from "react";
import styles from "./grid-card.module.scss";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import {
    Grid,
    Avatar,
    IconButton,
    CardContent,
    Card,
    Tooltip
} from "components/ui-libraries";
import { TypographyNowrap } from "components/ui-own";
import { EditIcon, CheckIcon } from "components/ui-libraries/icons";

import Filter from "./grid-card-filter.component";
import classNames from "classnames";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        active: {
            color: theme.palette.getContrastText(theme.palette.secondary.light),
            backgroundColor: theme.palette.secondary.light
        }
    })
);

const GridCard: React.FC<any> = ({
    handleSearch,
    onItemClick,
    doCreateData,
    keyValue,
    datas
}) => {
    const classes = useStyles();
    const { t } = useTranslation(["common"]);

    return (
        <div className={styles.grid}>
            <div className={styles.grid__filter}>
                <Filter
                    rowCount={datas.length}
                    doCreateData={doCreateData}
                    handleSearch={handleSearch}
                />
            </div>
            <div className={styles.grid__table}>
                <Grid container spacing={3}>
                    {datas.map((data: any, i: number) => (
                        <Grid item lg={3} md={3} sm={4} xs={2} key={i}>
                            <Card>
                                <CardContent className={styles["grid-item"]}>
                                    <Avatar
                                        className={classNames({
                                            [classes.active]: data.active
                                        })}
                                        aria-label="capital"
                                    >
                                        {data.active ? <CheckIcon /> : ""}
                                    </Avatar>
                                    <TypographyNowrap
                                        className={styles["grid-item_text"]}
                                        component="div"
                                        title={data[keyValue]}
                                    >
                                        {data[keyValue]}
                                    </TypographyNowrap>
                                    <IconButton
                                        onClick={() => onItemClick(i)}
                                        aria-label="settings"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default GridCard;
