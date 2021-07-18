/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { InputBase, Divider, Grid, Typography, IconButton, Table, TableCell, TableSortLabel, TableHead, TableRow, Paper, TableBody, TableContainer, Card, CardContent, Button } from '@material-ui/core';// eslint-disable-next-line 
import { AddCircleOutline, Delete, Edit, Search, Close } from '@material-ui/icons';// eslint-disable-next-line 
import { Pagination } from '@material-ui/lab';// eslint-disable-next-line 
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import GraphChart from './Chart';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import SingleSearch from './SingleSearch';
import PolicyTable from './PolicyTable';

const useStyles = makeStyles(theme => ({
    customerMain: {
        minHeight: 360,
        padding: '20px 0',
    },
    buttonStyle: {
        backgroundColor: '#4EA50F',
        color: '#FFFFFF',
    },
    Typo: {
        fontSize: 12,
        fontFamily: 'adobe-clean, sans-serif',
        fontWeight: 400,
    },
    mainContainer: {
        minHeight: 360,
        paddingTop: 20,
    },
    subContainer: {
        padding: '0px 20px 20px 20px',
        background: '#FFFFFF',
        borderRadius: 10,
        borderRadius: 10,
    },


    activationMain: {
        margin: '0px 40px 0px 40px',
        background: '#FFFFFF',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        [theme.breakpoints.down('md')]: {
            margin: '0px 10px 0px 10px',
        },

    },
}));


export default function search() {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [policyData, setPolicyData] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const handleChange = (event) => {
        setRegion(event.target.value);
        console.log('event.target.value', event.target.value)

    };

    const getPolicySearch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/?search=${searchTerm}`);
            const jsonData = await response.json();
            setPolicyData(jsonData);
            console.log('jsonSearch', jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm !== '' && searchTerm.trim() !== '') {
        getPolicySearch();
        }
      };

      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };

// search bar
    return (
        <Container>
            <Link style={{display: 'inline-flex',alignItems: 'center'}}underline="none" component={RouterLink} to="/graph">
              <div style={{paddingLeft:'1000px',display:'flex',paddingTop:'10px'}}>
              <Grid item >
                <Typography variant="h6"className={classes.leftHeading} style={{paddingTop:'10px'}}> GRAPH PAGE</Typography>
              </Grid>
              <Grid item >
                <IconButton disableRipple >
                  <ArrowForwardIosIcon style={{ color: '#f49900' }} />
                </IconButton>
              </Grid>
              </div>
            </Link>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item md={8} sm={6} lg={8} xs={12} style={{marginTop:'60px'}}>
                    <SingleSearch
                        onSearch={e => handleSubmit(e)}
                        search={searchTerm}
                        handleSearchInputChange={e => handleSearchChange(e)}
                        placeholder="Search by policy id or premium"
                    />
                </Grid>
            </Grid>
            <Grid item style={{marginTop:'30px'}}>
            { policyData ? <PolicyTable  data={policyData}/> :null}
            </Grid>
        </Container>
    );
}