/*eslint-disable*/
import React, { useState, useEffect, useMemo } from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { IconButton, Tooltip, Avatar, Badge, Grid, Button } from '@material-ui/core';
import {Edit} from '@material-ui/icons';
import ReactTable from './ReactTable'
import useStyles from './SettingStyle';
import CustomTextField from './TextField';
import {Search} from '@material-ui/icons';


//react-table set up
export default function RegionTable({
  data, fileName, exportFileType, exportAll, startExport, setStartExport,
}) {
  const classes = useStyles();
  const ColumnFilter = ({ column }) => { /* eslint-disable react/prop-types */
    const { filterValue, setFilter } = column;

    return (
      <CustomTextField
        placeholder="Search"
        value={filterValue || ''}
        InputProps={{ endAdornment: <Search style={{ color: '#0551A3' }} /> }}
        onChange={e => setFilter(e.target.value)}
      />
    );
  };

  ColumnFilter.propTypes = {
    column: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  const columns = React.useMemo(() => [

    {
      Header: 'policyId',
      accessor: 'policy_id',
      width: '10%',
      Filter: ColumnFilter,
      disableSortBy: true,
      icon: 'search',
      Cell: (row) => (
        <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
          {row && row.value && row.value}
        </div>
      ),
    },
    {
      Header: 'premium',
      accessor: 'premium',
      width: '13%',
      Filter: ColumnFilter,
      disableSortBy: true,
      icon: 'search',
      Cell: (row) => (
        <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
          {row && row.value && row.value}
        </div>
      ),
    },

    {
      Header: 'fuel',
      accessor: 'fuel',
      width: '8%',
      Cell: (row) => (
        <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
          {row && row.value && row.value}
        </div>
      ),
    },
    {
      Header: 'Date',
      accessor: 'date_of_purchase',
      width: '8%',
      Cell: (row) => (
        <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
          {row && row.value && moment(row.value).format('MM/DD/YYYY')}
        </div>
      ),
    },
    {
        Header: 'Segment',
        accessor: 'vehicle_segment',
        width: '8%',
        Cell: (row) => (
          <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
            {row && row.value && row.value}
          </div>
        ),
      },
      {
        Header: 'Damage',
        accessor: 'property_damage_liability',
        width: '8%',
        Cell: (row) => (
          <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
            {row && row.value && row.value}
          </div>
        ),
      },
      {
        Header: 'Personal Injury',
        accessor: 'personal_injury_protection',
        width: '8%',
        Cell: (row) => (
          <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
            {row && row.value && row.value}
          </div>
        ),
      },
      {
        Header: 'Bodily Injury',
        accessor: 'bodily_injury_liability',
        width: '8%',
        Cell: (row) => (
          <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
            {row && row.value && row.value}
          </div>
        ),
      },
      {
        Header: 'collision',
        accessor: 'collision',
        width: '8%',
        Cell: (row) => (
          <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
            {row && row.value && row.value}
          </div>
        ),
      },
      {
        Header: 'comprehensive',
        accessor: 'comprehensive',
        width: '8%',
        Cell: (row) => (
          <div className={classes.darkTypo} style={{ textAlign: 'center' }}>
            {row && row.value && row.value}
          </div>
        ),
      },
    
    {
      Header: 'ACTION',
      Filter: ColumnFilter,
      disableFilters: true,
      disableSortBy: true,
      width: '10%',
      id: 'expand-button',
      Cell: (row) => (
        <Grid
          container
          direction="row"
          spacing={2}
          style={{ justifyContent: 'center' }}
        >
            <>
              <Grid item className="p-0">
                <Tooltip arrow title="Edit">
                <RouterLink to={`/edit/${row.row.original.policy_id}`}>
                  <IconButton
                    className={classes.editButton}
                  >
                    <Edit fontSize="small" style={{ color: 'white' }} />
                  </IconButton>
                  </RouterLink>
                </Tooltip>
              </Grid>
            </>
        </Grid>
      ),
    },
  ]);

  return (
    <>
      {
        data && data.length > 0 // eslint-disable-line
          ?
            <ReactTable
              inputData={data}
              inputColumns={columns}
              fileName={fileName}
              exportFileType={exportFileType}
              exportAll={exportAll}
              startExport={startExport}
              setStartExport={setStartExport}
              pagination={false}
              enableCheckbox={false}
            />
          :
            null 
      }

    </>
  );
}
