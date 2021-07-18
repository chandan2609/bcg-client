import React, { useMemo, useEffect, useState, useRef, forwardRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useTable, useFilters, useSortBy, useGroupBy, useExpanded, useRowSelect, useGlobalFilter, usePagination } from 'react-table';
import { useExportData } from 'react-table-plugins';
import moment from 'moment';
import PropTypes, { object, string } from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { Search, ArrowDropDown, Height, ArrowRightAlt, CalendarToday, ExpandLess, ExpandMore, UnfoldMore } from '@material-ui/icons';
import { Checkbox, Grid, Popper, IconButton, Typography, InputLabel, MenuItem, FormControl, Select, ClickAwayListener } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { flexbox } from '@material-ui/system';

// react table global component
const GreenCheckbox = withStyles({
  root: {
    color: '#939FBF',
    '&$checked': {
      color: '#4EA50F',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '1200px',
    },
    '& tfoot, & tfoot tr, & tfoot td': {
      position: 'sticky',
      bottom: 0,
      zIndex: 1,
    },
    '& thead, & thead tr, & thead th': {
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
  },
  tBody: {
    ...theme.overflowScrollBar,
  },
  tableCell: {
    backgroundColor: '#fff',
    padding: '12px 6px',
    borderBottom: '6px solid #F4F6F7',
    borderRight: '1px solid #e3e4e4',
  },
  tableCellNoBorderRight: {
    backgroundColor: '#fff',
    padding: '12px 6px',
    borderBottom: '6px solid #F4F6F7',
  },
  viewButton: {
    margin: '2px 5px',
    padding: 8,
    backgroundColor: '#B4D302',
    '&:hover, &.Mui-focusVisible': { backgroundColor: '#B4D302' },
  },
  rowLimit: {
    padding: 8,
    display: 'flex',
  },
  editButton: {
    margin: '2px 5px',
    padding: 8,
    backgroundColor: '#009ACA',
    '&:hover, &.Mui-focusVisible': { backgroundColor: '#009ACA' },
  },
  deleteButton: {
    margin: '2px 5px',
    padding: 8,
    backgroundColor: '#DE3333',
    '&:hover, &.Mui-focusVisible': { backgroundColor: '#DE3333' },
  },
  paginationButton: {
    display: 'flex',
  },
  paginationText: {
    display: 'flex',
    fontSize: '14px',
    color: '#0551A3',
    backgroundColor: '#F4F6F7',
    padding: '15px 5px',
    textAlign: 'center',
    fontWeight: 500,
  },
  paginationText2: {
    fontSize: '14px',
    color: '#0551A3',
    backgroundColor: '#F4F6F7',
    padding: '8px 5px',
    textAlign: 'center',
    fontWeight: 500,
  },
  tableRow: {
    '&:last-child': {
      '& td, th': {
        borderBottom: 'none',
      },
    },
  },
  headerButton: {
    fontSize: '0.532rem',
  },
  head: {
    borderBottomStyle: 'none',
    fontSize: '14px',
    color: '#0551A3',
    backgroundColor: '#F4F6F7',
    padding: '8px 5px',
    textAlign: 'center',
    fontWeight: 500,
  },
  footerStyle: {
    backgroundColor: '#687390',
    color: '#FFFFFF',
    fontSize: '14px',
    textAlign: 'center',
    padding: '8px',
  },
  filterHolder: {
    zIndex: 99,
    position: 'absolute',
    background: 'white',
    boxShadow: '1px 1px rgba(0,0,0,0.2)',
    marginTop: 4,
    borderRadius: 6,
  },
  customizeColumns: {
    width: 'auto',
    // display: 'flex',
    overflow: 'scroll',
    overflowY: 'hidden',
  },
  customizeColumnCheckbox: {
    padding: '10px',
    display: 'flex',
  },
}));

export default function ReactTable({
  inputData,
  inputColumns,
  sendColumn,
  fromDate,
  hideCols,
  startDate,
  endDate,
  reportName,
  toDate,
  makeGroup,
  closeColumns,
  groupColumnNames,
  enableCheckbox,
  exportFileData,
  fileName,
  startExport,
  globalFilterValue,
  enableFooter,
  pagination,
  customizeColumns,
  exportFileType, exportAll, setStartExport,
  headerAlignment,
  getRowProps = (row) => {},
}) {
  const classes = useStyles();
  const wrapperRef = useRef(null);
  const [activeHeader, setActiveHeader] = useState('');
  const [selectedGlobalFilter, setSelectedGlobalFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const columns = useMemo(() => inputColumns, []);
  const data = useMemo(() => inputData, [inputData]);
  const [closeCol, setCloseCol] = useState(false);

  const {
    getTableProps, getTableBodyProps, headerGroups, footerGroups, page, rows, prepareRow, setGlobalFilter, exportData, setGroupBy,
    state: {
      groupBy, globalFilter, pageIndex, pageSize,
    },
    selectedFlatRows,
    // page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    setHiddenColumns,
  } = useTable({ // eslint-disable-line
    columns,
    data,
    hideCols,
    initialState: {
      hiddenColumns: columns
        .filter(col => col.show === false)
        .map(col => col.accessor),
    },
    // getExportFileBlob,
  },
  useGlobalFilter,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
  usePagination,
  useRowSelect,
  useExportData,
  (hooks) => {
    if (enableCheckbox) {
      hooks.visibleColumns.push(columns => [ // eslint-disable-line
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
          disableFilters: true,
          disableSortBy: true,
          disableBorder: true,
          width: '2%',
          Footer: info =>
            (
              <div className={classes.footerStyle}>&nbsp;</div>
            ),
        },
        ...columns,
      ]);
    }
  }); // eslint-disable-line

  const handleHeaderClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActiveHeader(v => (v === id ? 0 : id));
  };

  const handleClickAway = () => {
    setAnchorEl(null);
    setActiveHeader(0);
  };

  const sendColumnsToIndex = () => {
    sendColumn(allColumns);
  };

  const getIcon = (icon) => {
    switch (icon) {
      case 'search':
        return (<Search style={{ color: '#0551A3', cursor: 'pointer' }} />);
      case 'filter':
        return (<ArrowDropDown style={{ color: '#0551A3', cursor: 'pointer' }} />);
      default:
        return ('');
    }
  };

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setActiveHeader('');
    }
  };

  const IndeterminateCheckbox = forwardRef ( // eslint-disable-line
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <GreenCheckbox inputRef={resolvedRef} indeterminate={indeterminate} name="checkedG" {...rest} />
        </>
      );
    });

  useEffect(() => {
    if (startExport && exportFileData) {
      exportFileData(selectedFlatRows);
    }
    if (startExport && exportFileType !== '') {
      exportData(exportFileType, exportAll);
      setStartExport();
    }
  }, [startExport]);

  // useEffect(() => {
  //   console.log(hideCols);
  //   setHiddenColumns(hideCols.filter(col => col.checked).map(col => col.id));
  // }, [hideCols]);

  useEffect(() => {
    setSelectedGlobalFilter(globalFilterValue);
  }, [globalFilterValue]);

  useEffect(() => {
    setGlobalFilter(selectedGlobalFilter);
  }, [selectedGlobalFilter]);

  useEffect(() => {
    if (makeGroup && groupBy.length === 0) {
      setGroupBy(groupColumnNames); // columnNames is an accessor
    }
  }, [makeGroup, groupBy]);

  useEffect(() => {
    // sendColumnsToIndex();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (closeCol === true) {
      closeColumns(); // eslint-disable-line
      setCloseCol(false);
    }
  }, [closeCol]);

  return (
    <>
      {
        customizeColumns &&
        <>
          <div>
            <Grid container direction="row" className={classes.topGrid}>
              <Grid item md={11} sm={6} xs={6} justify="flex-end" />
              <Grid item md={1} sm={6} xs={6} justify="flex-end">
                <IconButton aria-label="close" onClick={e => setCloseCol(true)} style={{ padding: '8px', marginLeft: '50px' }}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
          <div className={classes.customizeColumns} >
            <Grid container direction="row" className={classes.topGrid}>
              <Grid item md={12} sm={6} xs={6} style={{ display: 'flex' }}>
                <div style={{ display: 'flex', padding: '10px' }}>
                  <Checkbox {...getToggleHideAllColumnsProps()} style={{ marginRight: '5px' }} />
                  <Typography component="h5" style={{ marginTop: '9px', width: '70px' }}>Select all</Typography>
                </div>
                <ul style={{ display: 'flex', listStyle: 'none' }}>
                  {
                    allColumns.map(column => (
                      <li key={column.id} >
                        <div style={{ display: 'flex', padding: '10px' }}> {/*eslint-disable-line */}
                          <input type="checkbox" {...column.getToggleHiddenProps()} style={{ marginTop: '13px', marginRight: '10px' }} />
                          {column.Header.length > 9 ? <Typography component="h5" style={{ marginTop: '9px', width: '135px' }}>{column.Header}</Typography> : <Typography component="h5" style={{ marginTop: '9px', width: '70px' }}>{column.Header}</Typography>}
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </Grid>
            </Grid>
          </div>
        </>
      }
      <table {...getTableProps()} className={classes.table}>
        <thead style={{ backgroundColor: '#F4F6F7' }}>
          {headerGroups && headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers && headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} width={column.width} className={classes.head} key={column.Header}>
                  <Grid container justify={headerAlignment} wrap="nowrap" spacing={0} alignItems="center">
                    <Grid item>
                      {column.render('Header')}
                    </Grid>
                    <Grid item>
                      {column.icon &&
                        <span onClick={e => handleHeaderClick(e, column.id)} style={{ padding: '5px' }}>
                          {getIcon(column.icon)}
                        </span>
                      }
                      {
                        !column.disableSortBy &&
                        <span>
                          {column.isSorted // eslint-disable-line
                            ? (column.isSortedDesc
                              ? <ExpandMore style={{ color: '#0551A3' }} />
                              : <ExpandLess style={{ color: '#0551A3' }} />
                            )
                            : <UnfoldMore style={{ color: '#0551A3' }} />
                          }
                        </span>
                      }
                    </Grid>
                  </Grid>
                  {
                    activeHeader === column.id
                    ? (
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <Popper
                          className={classes.filterHolder}
                          anchorEl={anchorEl}
                          open={activeHeader === column.id}
                          modifiers={{
                          offset: {
                            offset: '-25px',
                          },
                        }}
                        // anchorOrigin={{
                        //   vertical: 'bottom',
                        //   horizontal: 'left',
                        // }}
                        // transformOrigin={{
                        //   vertical: 'top',
                        //   horizontal: 'center',
                        // }}
                          placement="bottom"
                        >
                          {column.canFilter ? column.render('Filter') : null }
                        </Popper>
                      </ClickAwayListener>
                    )
                    : null
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {pagination === true ?
          <tbody {...getTableBodyProps()} className={classes.tBody}>
            {page && page.map((row) => { // eslint-disable-line
              prepareRow(row);
              return (
                <tr {...row.getRowProps(getRowProps(row))}>
                  {row.cells && row.cells.map(cell =>
                    <td {...cell.getCellProps()} className={ cell.column.disableBorder ? classes.tableCellNoBorderRight : classes.tableCell}> {/* eslint-disable-line */}
                      {cell.isGrouped ? ( // eslint-disable-line
                        // If it's a grouped cell, add an expander and row count
                        <>
                          {cell.render('Cell')}
                        </>
                      ) : cell.isAggregated ? ( // eslint-disable-line
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? cell.render('Placeholder') : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                    </td>)}
                </tr>
              );
            })
            }
          </tbody>
          :
          <tbody {...getTableBodyProps()} className={classes.tBody}>
            {rows && rows.map((row) => { // eslint-disable-line
              prepareRow(row);
              return (
                <tr {...row.getRowProps(getRowProps(row))}>
                  {row.cells && row.cells.map(cell =>
                    <td {...cell.getCellProps()} className={classes.tableCell}> {/* eslint-disable-line */}
                      {cell.isGrouped ? ( // eslint-disable-line
                        // If it's a grouped cell, add an expander and row count
                        <>
                          {cell.render('Cell')}
                        </>
                      ) : cell.isAggregated ? ( // eslint-disable-line
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? cell.render('Placeholder') : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                    </td>)}
                </tr>
              );
            })
            }
          </tbody>
        }
        {enableFooter &&
          <tfoot>
            {footerGroups && footerGroups.map(footerGroup => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers && footerGroup.headers.map(column => (
                  <td {...column.getFooterGroupProps} className={classes.footerStyle}>
                    {column.render('Footer')}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        }
      </table>
      {pagination === true ?
        (
          <div className="pagination" style={{ justifyContent: 'center' }}>
            <div className={classes.paginationButton}>
              <IconButton onClick={() => gotoPage(0)}>
                {!canPreviousPage ? <FirstPageIcon style={{ color: 'grey' }} fontSize="medium" /> : <FirstPageIcon color="primary" fontSize="medium" />}
              </IconButton>{' '}
              <IconButton onClick={() => previousPage()}>
                {!canPreviousPage ? <ArrowBackIosIcon style={{ color: 'grey' }} fontSize="small" /> : <ArrowBackIosIcon color="primary" fontSize="small" />}
              </IconButton>{' '}
              <IconButton onClick={() => nextPage()}>
                {!canNextPage ? <ArrowForwardIosIcon style={{ color: 'grey' }} fontSize="small" /> : <ArrowForwardIosIcon color="primary" fontSize="small" />}
              </IconButton>{' '}
              <IconButton onClick={() => gotoPage(pageCount - 1)}>
                {!canNextPage ? <LastPageIcon style={{ color: 'grey' }} fontSize="medium" /> : <LastPageIcon color="primary" fontSize="medium" />}
              </IconButton>{' '}
            </div>
            <div className={classes.paginationText}>
              <InputLabel htmlFor="demo-customized-select-native">Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </InputLabel>
            </div>
            <div className={classes.rowLimit}>
              <InputLabel htmlFor="demo-customized-select-native" className={classes.paginationText2}>Show</InputLabel>
              <FormControl>
                <Select
                  id="demo-customized-select-native"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map(pageSizes => (
                    <option key={pageSizes} value={pageSizes} style={{ cursor: 'pointer' }}>
                      {pageSizes} rows
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        )
        :
        null
      }
    </>
  );
}

ReactTable.propTypes = {
  headerAlignment: PropTypes.string,
};

ReactTable.defaultProps = {
  headerAlignment: 'center',
};
