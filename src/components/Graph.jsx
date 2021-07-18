/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { InputBase, Divider, Grid, Typography, IconButton, Table, TableCell, TableSortLabel, TableHead, TableRow, Paper, TableBody, TableContainer, Card, CardContent, Button } from '@material-ui/core';// eslint-disable-next-line 
import { withRouter, Link as RouterLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { ArrowBackIos } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import GraphChart from './Chart';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';


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

export default function Graph() {
    const classes = useStyles();
    const [region, setRegion] = React.useState('East');
    const [graphData, setGraphData] = React.useState([]);

    const handleChange = (event) => {
        setRegion(event.target.value);
        console.log('event.target.value', event.target.value)

    };

    const getGraph = async () => { // API for the graph
        try {
            const response = await fetch(`http://localhost:5000/graph/?region=${region}`);
            const jsonData = await response.json();

            setGraphData(jsonData);
            console.log('jsonData', jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getGraph();
    }, [region]);


    return (
        <Container>
            <Link style={{ display: 'inline-flex', alignItems: 'center' }} underline="none" component={RouterLink} to="/">
                    <Grid item>
                        <IconButton disableRipple style={{ padding: 10 }}>
                            <ArrowBackIos style={{ color: '#f49900' }} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" className={classes.leftHeading} >GO TO MAIN PAGE</Typography>
                    </Grid>
                </Link>
            <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: '100px' }}>
                <div style={{ border: '1px solid black', boxShadow: '3px 3px 3px 3px #888888', padding: '20px' }}>
                    <Grid item md={8} sm={6} lg={8} xs={12}>
                        <Select
                            value={region}
                            onChange={handleChange}
                            style={{ marginLeft: '300px' }}
                        >
                            <MenuItem value={'East'}>East</MenuItem>
                            <MenuItem value={'West'}>West</MenuItem>
                            <MenuItem value={'North'}>North</MenuItem>
                            <MenuItem value={'South'}>South</MenuItem>
                        </Select>
                        <GraphChart data={graphData} />
                    </Grid>
                </div>

            </Grid>
        </Container>
    );
}