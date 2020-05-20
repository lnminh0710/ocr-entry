import React, { useState } from "react";

import {
    Typography,
    InputBase,
    Button,
    IconButton,
    Divider
} from "components/ui-libraries";

import { SearchIcon, FilterIcon } from "../../ui-libraries/icons";

import { KEYBOARD } from "../../../constants/common";

import { useTranslation } from "react-i18next";

const ListRowSettings: React.FC<any> = ({
    isAdvanced,
    classBg,
    rowCount,
    styles,
    handleSearch,
    doCreateData
}) => {
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
            <div className={styles.list__actions}>
                <div className={styles.list__count}>
                    <Typography variant="h6" color="textPrimary">
                        {rowCount}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {t("total")}
                    </Typography>
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={doCreateData}
                    >
                        {t("add")}
                    </Button>
                </div>
            </div>

            <div className={`${styles.list__search} ${classBg}`}>
                <InputBase
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className={styles.list__search_input}
                    value={textSearch}
                    placeholder={t("search")}
                    inputProps={{ "aria-label": "Search" }}
                />
                <IconButton onClick={handleBasicSearch} aria-label="search">
                    <SearchIcon color="action" />
                </IconButton>
                {isAdvanced && (
                    <>
                        <Divider
                            className={styles.list__search_divider}
                            orientation="vertical"
                        />
                        <IconButton color="secondary" aria-label="filter">
                            <FilterIcon />
                        </IconButton>
                    </>
                )}
            </div>
        </>
    );
};

export default ListRowSettings;
