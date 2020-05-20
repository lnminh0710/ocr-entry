import React from "react";

import classnames from "classnames";
import { AutoSizer, List, Size, ListRowProps } from "react-virtualized";

import FieldComponent from "../add-person-capture-field/add-person-capture-field.component";

import { CaptureState, FieldModel } from "./add-person-capture.hook";

interface IAddPersonCaptureProps {
    styles: any;
    styleDarkMode: any;
    isEmpty: boolean;
    datas: Array<FieldModel>;
    state: CaptureState;
    onFieldKeyDown: any;
    onFocusField: any;
    onFieldChange: Function;
}

const AddPersonCaptureContainer: React.FC<IAddPersonCaptureProps> = ({
    styles,
    styleDarkMode,
    isEmpty,
    state,
    datas,
    onFieldKeyDown,
    onFocusField,
    onFieldChange
}) => {
    const _rowRenderer = ({ index, key, style }: ListRowProps) => {
        const field = isEmpty ? state.fields[index] : datas[index];
        const isSelected = isEmpty ? false : index === state.indexSelected;

        if (!field) {
            return <div key={key} style={style}></div>;
        }

        return (
            <div
                key={key}
                style={style}
                className={classnames(styles["capture__field-container"], {
                    [styles.selected]: isSelected
                })}
            >
                <FieldComponent
                    styles={styles}
                    styleDarkMode={styleDarkMode}
                    field={field}
                    isEmpty={isEmpty}
                    onFieldKeyDown={onFieldKeyDown}
                    onFocusField={onFocusField}
                    onFieldChange={onFieldChange}
                    isSelected={isSelected}
                    index={index}
                ></FieldComponent>
            </div>
        );
    };
    return (
        <div className={styles["capture"]}>
            <AutoSizer>
                {({ width, height }: Size) => {
                    return (
                        <>
                            <List
                                className="scrollbar"
                                height={height}
                                rowCount={state.fields.length}
                                rowHeight={({ index }) =>
                                    index === state.fields.length
                                        ? height - 100
                                        : 200
                                }
                                rowRenderer={_rowRenderer}
                                width={width}
                            />
                        </>
                    );
                }}
            </AutoSizer>
        </div>
    );
};

export default AddPersonCaptureContainer;
