import React from "react";
import classnames from "classnames";

import { InputBase } from "components/ui-libraries";

import { FieldModel } from "../add-person-capture/add-person-capture.hook";
import useFieldHook from "./add-person-capture-field.hook";

interface IAddPersonCaptureFieldProps {
    styles: any;
    styleDarkMode: any;
    field: FieldModel;
    index: number;
    isEmpty: boolean;
    isSelected: boolean;
    onFieldKeyDown: any;
    onFocusField: any;
    onFieldChange: Function;
}

const AddPersonCaptureFieldComponent: React.FC<IAddPersonCaptureFieldProps> = ({
    styles,
    styleDarkMode,
    field,
    isEmpty,
    index,
    isSelected,
    onFieldKeyDown,
    onFocusField,
    onFieldChange
}) => {
    const { ref, fieldValue, setFieldValue } = useFieldHook(isSelected, field);

    return (
        <div
            className={classnames(styles["field__container"], {
                [styles["selected"]]: isSelected,
                [styleDarkMode.bgLevel1]: isSelected
            })}
        >
            <div className={styles["field__name"]}>{field.name}</div>
            <div className={styles["field__input-container"]}>
                <InputBase
                    fullWidth
                    inputRef={ref}
                    autoFocus={isSelected}
                    disabled={isEmpty}
                    value={fieldValue || ""}
                    inputProps={{ "aria-label": "Search" }}
                    className={classnames(styles["field__input-input"], {
                        [styleDarkMode.bgLevel2]: true
                    })}
                    multiline={true}
                    rows={8}
                    onFocus={() => onFocusField(index)}
                    onChange={(e: any) => setFieldValue(e.target.value)}
                    onBlur={() =>
                        fieldValue !== field.value
                            ? onFieldChange(field.name, { value: fieldValue })
                            : undefined
                    }
                ></InputBase>
            </div>
        </div>
    );
};

export default AddPersonCaptureFieldComponent;
