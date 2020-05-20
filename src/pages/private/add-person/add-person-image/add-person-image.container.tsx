import React from "react";
// import { useTranslation } from "react-i18next";

import styles from "./add-person-image.module.scss";

import ImageComponent from "./add-person-image.component";
import ImageEmptyComponent from "../add-person-image-empty/add-person-image-empty.component";
import useAddPersonImageHook from "./add-person-image.hook";
import Circular from "../../../../components/ui-own/progress/loader/loader.component";

interface IAddPersonImageProps {
    getDataById: Function;
    changeValueByRecordId: Function;
    recordId: number;
    fieldFocused: string;
    isEmpty: boolean;
    isPinTable: boolean;
}

const AddPersonImageContainer: React.FC<IAddPersonImageProps> = ({
    getDataById,
    changeValueByRecordId,

    isEmpty,
    isPinTable,
    recordId,
    fieldFocused
}) => {
    // const { t } = useTranslation(["common"]);
    const { state, getCard } = useAddPersonImageHook(getDataById, isEmpty);
    if (state.isLoading) {
        return (
            <div className={styles["add-person-image-empty"]}>
                <Circular></Circular>
            </div>
        );
    }

    if (isEmpty) {
        return (
            <ImageEmptyComponent
                getCard={getCard}
                styles={styles}
            ></ImageEmptyComponent>
        );
    }

    return (
        <ImageComponent
            styles={styles}
            isPinTable={isPinTable}
            onCaptureRect={(data: any) =>
                changeValueByRecordId(recordId, fieldFocused, data)
            }
            fieldFocused={fieldFocused}
        ></ImageComponent>
    );
};

export default AddPersonImageContainer;
