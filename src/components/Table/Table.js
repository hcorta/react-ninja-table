'use strict'

import React, { useState, useMemo } from 'react'
import cx from 'classnames'
import { utils } from '../../utils'
import { defaultTableBodyRenderer } from './defaultTableBodyRenderer'
import { defaultTableHeaderRenderer } from './defaultTableHeaderRenderer'
import { useColumns } from '../../hooks'
import { defaultTablePaginationRenderer } from './defaultTablePaginationRenderer'

export function Table ({
  // GENERAL table props
  id,
  className,
  columns: columnsData,
  data,
  style,
  width,
  height,
  disabled,
  children,

  // EXTRA table props
  minColumnWidth,
  freezeColumns,

  // HEADER props
  headerClassName,
  tableHeaderRenderer,
  headerCellRenderer,
  headerHeight,
  headerRowRenderer,
  disableHeader,
  headerRowProps,
  headerCellProps,
  headerComponentProps,
  onHeaderClick,

  // BODY props
  rowClassName,
  tableBodyRenderer,
  rowRenderer,
  cellRenderer,
  rowHeight,
  rowProps,
  cellProps,
  cellComponentProps,
  onRowClick,
  onCellClick,

  // NODATA props
  noDataRenderer,
  noDataComponent,
  noDataMessage,
  noDataProps,
  noDataComponentProps,

  // LOADING props
  loading,
  loadingRenderer,
  loadingComponent,

  // PAGINATION props
  changePageTo,
  tablePaginationRenderer,
  paginationComponent,
  pagination,
  paginationProps,
  paginationHeight,
  pageSize,
  onNextPageClick,
  onPreviousPageClick,
  currentPage,

  // VIRTUALIZED props
  virtualized,
  overscanRowCount,

  // INFINITE LOADING props
  loadMoreRows,
  threshold,

  // SORTING props
  onScroll,
  sortMethod,
  onColumnSort,
  defaultSorted,

  ...rest
}) {
  const [scroll, setScroll] = useState({
    scrollTop: 0,
    scrollLeft: 0
  })

  // MEMOIZED values
  const columns = useMemo(() => {
    return columnsData || utils.normalizeColumns(children)
  }, [])

  const { computedRowGrid, rowWidth } = useMemo(() => {
    return utils.computeRowGrid({
      width,
      columns,
      minColumnWidth,
      freezeColumns
    })
  }, [width])

  const tableBodyHeight = useMemo(() => {
    return utils.calculateBodyHeight({
      height,
      rowHeight,
      headerHeight,
      disableHeader,
      pagination,
      paginationHeight,
      pageSize
    })
  }, [height])

  // COMMON
  const commonRenderersProps = {
    columns,
    freezeColumns,
    minColumnWidth,
    rowWidth,
    computedRowGrid
  }

  function renderTableHeader (props) {
    return tableHeaderRenderer
      ? tableHeaderRenderer(props)
      : defaultTableHeaderRenderer(props)
  }

  function renderTableBody (props) {
    return tableBodyRenderer
      ? tableBodyRenderer(props)
      : defaultTableBodyRenderer(props)
  }

  function renderTablePagination (props) {
    return tablePaginationRenderer
      ? tablePaginationRenderer(props)
      : defaultTablePaginationRenderer(props)
  }

  return (
    <div
      id={id}
      role={'table'}
      className={cx('AwesomeTable', className)}
      style={{
        height,
        width,
        ...style
      }}>

      {!disableHeader && (
        renderTableHeader({
          ...commonRenderersProps,
          headerClassName,
          headerRowProps,
          headerCellProps,
          disableHeader,
          headerHeight,
          headerComponentProps,
          headerRowRenderer,
          headerCellRenderer,
          onHeaderClick,
          scroll
          // onSortableClick,
          // sortDirection,
          // sortBy,
        }))
      }

      {renderTableBody({
        ...commonRenderersProps,
        rowClassName,
        data,
        rowHeight,
        height,
        rowProps,
        cellProps,
        cellComponentProps,
        loading,
        loadingComponent,
        loadingRenderer,
        rowRenderer,
        cellRenderer,
        onRowClick,
        onCellClick,
        tableBodyHeight,
        virtualized,
        overscanRowCount,
        loadMoreRows,
        threshold,
        setScroll
      })}

      {pagination && (
        renderTablePagination({
          pagination,
          pageSize,
          paginationComponent,
          paginationHeight,
          paginationProps,
          changePageTo,
          tablePaginationRenderer,
          onNextPageClick,
          onPreviousPageClick,
          currentPage
        })
      )}
    </div>
  )
}

Table.defaultProps = {
  freezeColumns: 0,
  virtualized: false,
  disabled: false,
  loading: false,
  overscanRowCount: 10,
  disableHeader: false,
  columns: null,
  data: null,
  paginationHeight: 20,
  rowHeight: 20,
  headerHeight: 20,
  footerHeight: 20,
  loadMoreRows: null,
  threshold: 10,
  minColumnWidth: 50
}
