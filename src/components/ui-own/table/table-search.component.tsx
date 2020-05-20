import React, { useState } from "react";
import styles from "./table.module.scss";
import { Formik } from "formik";

import {
    Grid,
    Popover,
    InputBase,
    IconButton,
    Divider,
    Typography,
    Button
} from "components/ui-libraries";

import SearchHeader from "./table-search-header.componen";

import { FilterIcon, SearchIcon } from "components/ui-libraries/icons";

import { useTranslation } from "react-i18next";

import { useBackgroundStyles } from "utils/theme.util";

import { KEYBOARD } from "constants/common";

const SearchGroup: React.FC<any> = ({
    rowCount,
    width,
    renderAdvanceSearch,
    isShowAdvanced,
    doCreate,
    onSearch
}) => {
    const [keyword, setKeyword] = useState<string>("");
    const { t } = useTranslation(["common"]);
    const classOwns = useBackgroundStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const open = Boolean(anchorEl);

    function handleClick(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleSearch() {
        onSearch({ keyword, start: 1 });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        var code = event.keyCode || event.which;
        if (code === KEYBOARD.Enter) {
            handleSearch();
        }
    }
    return (
        <>
            <Grid
                style={{ width }}
                className={styles.search}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <Grid container alignItems="flex-end">
                        <Typography
                            variant="button"
                            display="block"
                            component="div"
                            color="textPrimary"
                            className={styles.search_total}
                        >
                            {rowCount}
                        </Typography>
                        <Typography
                            variant="body1"
                            display="block"
                            component="div"
                            color="textSecondary"
                        >
                            {t("total")}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <div className={styles.search__filter}>
                        <div
                            className={`${styles.search__input} ${classOwns.bg}`}
                        >
                            <InputBase
                                value={keyword}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                className={styles.search__input_input}
                                placeholder={t("search")}
                                inputProps={{
                                    "aria-label": "input search",
                                    maxLength: 50
                                }}
                            />

                            <IconButton
                                onClick={handleSearch}
                                aria-label="search"
                                size="small"
                            >
                                <SearchIcon color="action" />
                            </IconButton>
                            {isShowAdvanced && (
                                <>
                                    <Divider
                                        orientation="vertical"
                                        className={styles.search__input_divider}
                                    />

                                    <IconButton
                                        onClick={handleClick}
                                        color="secondary"
                                        aria-label="filter"
                                    >
                                        <FilterIcon />
                                    </IconButton>
                                </>
                            )}
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={doCreate}
                        >
                            {t("add_new")}
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <Formik
                    initialValues={{}}
                    onSubmit={(values: any, actions: any) => {}}
                >
                    {({ handleSubmit, resetForm, ...rest }: any) => {
                        return (
                            <div className={styles.advanced_search}>
                                <SearchHeader />
                                <form onSubmit={handleSubmit}>
                                    {renderAdvanceSearch(rest)}
                                    <div
                                        className={
                                            styles.advanced_search_actions
                                        }
                                    >
                                        <Button onClick={resetForm}>
                                            {" "}
                                            {t("clear")}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            aria-label="Search"
                                            type="submit"
                                        >
                                            {t("search")}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        );
                    }}
                </Formik>
            </Popover>
        </>
    );
};

export default SearchGroup;
