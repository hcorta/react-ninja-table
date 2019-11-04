import React from 'react'
import { SortIndicator } from '../SortIndicator'


export function defaultHeaderCellRenderer({
  header,
  align,
  headerCellProps,
  headerComponentProps,
  onHeaderClick,
  onSortableClick,
  sortable,
  dataKey,
  columnSortMethod,
  sortBy,
  sortDirection
}) {

  function onClickHeader(event) {
    if (sortable && onSortableClick) {
      onSortableClick({
        sortBy: dataKey,
        event,
        columnSortMethod
      })
      onHeaderClick && onHeaderClick({
        event,
        header,
        dataKey,
        headerCellProps,
        headerComponentProps,
      })
    }
  }

  return (
    <div
      {...headerCellProps}
      className={'AwesomeTable__header-row-cell'}
      onClick={onClickHeader}>
      {typeof header === 'function' ? (
        header(headerComponentProps)
      ) : (
        <div>{header}</div>
      )}
      {dataKey === sortBy && (
        <SortIndicator
          sortDirection={sortDirection}
        />
      )}
    </div>
  )
}
