import React, { useState } from "react";
import styles from "./grid-card.module.scss";

import {
    Typography,
    InputBase,
    Button,
    IconButton
} from "components/ui-libraries";

import { SearchIcon } from "components/ui-libraries/icons";

import { KEYBOARD } from "constants/common";
import { useBackgroundStyles } from "utils/theme.util";

import { useTranslation } from "react-i18next";

const ListRowSettings: React.FC<any> = ({
    rowCount,
    handleSearch,
    doCreateData
}) => {
    const classBg = useBackgroundStyles();
    const { t } = useTranslation(["common"]);
    const [textSearch, setTextSearch] = useState<string>("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTextSearch(event.target.value);
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        var code = event.keyCode || event.which;
        if (code === KEYBOARD.Enter) {
            handleSearch(textSearch);
        }
    }

    function handleBasicSearch() {
        handleSearch(textSearch);
    }

    return (
        <>
            <div className={styles.grid__filter_count}>
                <Typography
                    className={styles.grid__filter_count_number}
                    variant="subtitle1"
                    color="textPrimary"
                >
                    {rowCount || 0}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {t("total")}
                </Typography>
            </div>
            <div className={styles.grid__filter_action}>
                <div className={`${styles.search} ${classBg.bg}`}>
                    <InputBase
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className={styles.list__search_input}
                        value={textSearch}
                        placeholder={t("search")}
                        inputProps={{
                            "aria-label": "Search",
                            "max-length": 50
                        }}
                    />
                    <IconButton onClick={handleBasicSearch} aria-label="search">
                        <SearchIcon color="action" />
                    </IconButton>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={doCreateData}
                >
                    {t("add_new")}
                </Button>
            </div>
        </>
    );
};

export default ListRowSettings;
