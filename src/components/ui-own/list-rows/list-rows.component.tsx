import React, { useRef } from "react";
import styles from "./list-rows.module.scss";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { AutoSizer, List, Size, ListRowProps } from "react-virtualized";
import { Skeleton } from "components/ui-libraries";

import ListRowSettings from "./list-rows-settings.component";

import classnames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bg: {
      backgroundColor: theme.palette.background.default
    }
  })
);

interface iListRowsProps {
  idElement: string;
  isFirstLoad: boolean;
  isLoading: boolean;
  rowCount: number;
  scrollToIndex?: number;
  indexSelected?: number;
  rowHeight?: number;
  rowRenderer: any;
  onRowClick?: any;
  handleSearch: any;
  doCreateData?: any;
}

const Empty = React.memo(function Empty() {
  return (
    <div className={styles.empty}>
      <Skeleton className={styles.empty__row} />
      <Skeleton className={styles.empty__row} />
    </div>
  );
});

export function refreshTable(id: string) {
  const node = document.getElementById(id);
  if (node) {
    node.click();
  }
}

const ListRows: React.FC<iListRowsProps> = ({
  idElement,
  isFirstLoad,
  isLoading,
  indexSelected,
  rowCount,
  rowRenderer,
  rowHeight,
  scrollToIndex,
  handleSearch,
  doCreateData,
  onRowClick
}) => {
  const listEl: any = useRef(null);
  const classOwn = useStyles();

  function _refreshTable() {
    if (listEl.current) {
      listEl.current.forceUpdate();
    }
  }

  function _rowRenderer({ index, key, style }: ListRowProps) {
    const row = rowRenderer(index);
    return (
      <div
        onClick={() => {
          if (onRowClick) {
            onRowClick(index);
          }
        }}
        key={key}
        style={style}
        className={classnames(styles.row, {
          [styles["row--top"]]: index === 0,
          [styles["row--last"]]: index === rowCount - 1
        })}
      >
        <div
          className={classnames(styles.row__body, classOwn.bg, {
            [styles["row__body--selected"]]: index === indexSelected
          })}
        >
          {row}
        </div>
      </div>
    );
  }

  if (isFirstLoad) {
    return (
      <div className={styles.list}>
        <Empty />
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <button
        style={{ display: "none" }}
        id={idElement}
        onClick={_refreshTable}
      ></button>
      <ListRowSettings
        classBg={classOwn.bg}
        doCreateData={doCreateData}
        handleSearch={handleSearch}
        styles={styles}
        rowCount={rowCount}
      />

      <div className={styles.list__data}>
        <AutoSizer>
          {({ width, height }: Size) => {
            if (isLoading) {
              return (
                <div style={{ width, height }}>
                  <Empty />
                </div>
              );
            }
            return (
              <List
                ref={listEl}
                scrollToIndex={scrollToIndex}
                height={height}
                width={width}
                rowCount={rowCount}
                rowHeight={rowHeight || 120}
                rowRenderer={_rowRenderer}
              />
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

export default ListRows;
