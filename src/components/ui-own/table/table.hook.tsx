import React, { useState } from "react";
import styles from "./table.module.scss";

import { ListRowProps, CellMeasurer, Index } from "react-virtualized";
import {
  Typography,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "components/ui-libraries";

import { formatDateDefault } from "utils/date.util";
import { useBackgroundStyles } from "utils/theme.util";

import classnames from "classnames";

import _get from "lodash/get";

export default function useTableHook({
  columns,
  datas,
  onRowClick,
  _cache,
  indexSelected,
  order,
  orderBy,
  onSearch
}: any) {
  const [loadedRowsMap] = useState<any>({});
  const classBG = useBackgroundStyles();

  function handleRequestSort(property: any) {
    if (property) {
      const isOrder = !order;
      onSearch({ start: 1, desc: isOrder, sortby: property });
    }
  }

  function _headerRenderer(width: number) {
    return (
      <Table>
        <TableHead
          className={classBG.bg}
          style={{ width, display: "inline-table" }}
        >
          <TableRow>
            {columns.map(
              (
                {
                  label,
                  width,
                  className,
                  render,
                  keyValue,
                  keySort,
                  ...other
                }: any,
                i: number
              ) => {
                return (
                  <TableCell
                    {...other}
                    style={{ width }}
                    className={classnames(className, styles.th)}
                    key={i}
                  >
                    {keySort && keySort.length > 0 ? (
                      <TableSortLabel
                        onClick={e => handleRequestSort(keySort)}
                        direction={!order ? "asc" : "desc"}
                        active={keySort === orderBy}
                      >
                        <Typography variant="subtitle2">{label}</Typography>
                      </TableSortLabel>
                    ) : (
                      <Typography variant="subtitle2">{label}</Typography>
                    )}
                  </TableCell>
                );
              }
            )}
          </TableRow>
        </TableHead>
      </Table>
    );
  }

  function _handleRowClick(row: any) {
    if (onRowClick) {
      onRowClick(row);
    }
  }

  function _cellRenderer(type: string, keyValue: string, row: any) {
    const value = _get(row, keyValue, "");

    if (type === "date") {
      return formatDateDefault(value);
    }

    return value;
  }

  function _rowRenderer({ index, key, parent, style }: ListRowProps) {
    const row = datas[index];

    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {() => (
          <div
            onClick={() => _handleRowClick(row)}
            style={style}
            className={classnames(styles.row__body, {
              [styles["row__body--selected"]]: index === indexSelected,
              [styles["row__body--disable-click"]]: onRowClick === undefined
            })}
          >
            {columns.map(
              (
                {
                  width,
                  className,
                  render,
                  align,
                  keyValue,
                  keySort,
                  type,
                  ...colProps
                }: any,
                i: number
              ) => {
                let body = render
                  ? render(row)
                  : _cellRenderer(type, keyValue, row);

                return (
                  <div
                    {...colProps}
                    style={{ width }}
                    className={classnames(className, styles.td)}
                    key={i}
                  >
                    <Typography
                      component="div"
                      noWrap
                      align={align}
                      variant="body1"
                      color={type === "primary" ? "primary" : "textSecondary"}
                    >
                      <>{body}</>
                    </Typography>
                  </div>
                );
              }
            )}
          </div>
        )}
      </CellMeasurer>
    );
  }

  function _isRowLoaded({ index }: Index) {
    return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
  }

  return {
    _headerRenderer,
    _rowRenderer,
    _isRowLoaded
  };
}
