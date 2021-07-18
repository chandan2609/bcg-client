/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {IconButton, Grid, Container, OutlinedInput, InputAdornment, TextField, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { ArrowBackIos } from '@material-ui/icons';
import Link from '@material-ui/core/Link';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import CustomTextField from './TextField';


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


function EditPolicy(props) {
    var jsonData = {};
    const classes = useStyles();
    const [editData, setEditData] = React.useState({});
    const { control, handleSubmit, register, errors, setValue, getValues } = useForm({ mode: 'onChange' });


    const getIndPolicy = async () => {
        const id = props.match.params.id;
        try {
            const response = await fetch(`http://localhost:5000/policy/${id}`);
            jsonData = await response.json();
            setEditData(jsonData);
            console.log('jsonData', jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    const onSubmit = (data) => {   //api for edit policy
        const id = props.match.params.id;

         if(data.premium>1000000){
             alert('value should be less than 1000000')
         }
         else{
        try {
            const body = {
                bodily_injury_liability:data.bodily_injury_liability,
                collision:data.collision,
                comprehensive:data.comprehensive,
                fuel:data.fuel,
                personal_injury_protection:data.personal_injury_protection,
                premium:data.premium,
                property_damage_liability:data.property_damage_liability,
                vehicle_segment:data.vehicle_segment
            
            };
            const response = fetch(
                `http://localhost:5000/policy/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    };


    const checkKeyDown = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
        }
    };

    console.log('Object.values(editData)', Object.values(editData))
    useEffect(() => {
        getIndPolicy()
    }, []);
    return (
        <div className={classes.activationMain}>
            <Link style={{display: 'inline-flex',alignItems: 'center'}}underline="none" component={RouterLink} to="/">
              <Grid item>
                <IconButton disableRipple style={{padding:10}}>
                  <ArrowBackIos style={{ color: '#f49900' }} />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h6"className={classes.leftHeading} >GO TO MAIN PAGE</Typography>
              </Grid>
            </Link>
            <div className={classes.subContainer}>
                {Object.values(editData)[0] > 0 ?
                    <Container className={classes.customerMain}>
                        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
                            <Grid container direction="row">
                            </Grid>
                            <Grid container direction="row" style={{ marginTop: '30px' }} spacing={3}>
                                <Grid item md={4} xs={12} sm={6}>
                                    <Typography className={classes.Typo} style={{ color: "#939FBF" }}>
                                        Fuel<span style={{ color: "#EB8282", paddingLeft: 3 }}>*</span>
                                    </Typography>
                                    <CustomTextField
                                        name="fuel"
                                        onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                                        {...register('fuel')}
                                        defaultValue={editData.fuel}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={6}>
                                    <Typography className={classes.Typo} style={{ color: "#939FBF" }}>
                                        VEHICLE SEGMENT
                                    </Typography>
                                    <CustomTextField
                                        name="vehicle_segment"
                                        onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                                        {...register('vehicle_segment')}
                                        defaultValue={editData.vehicle_segment}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={6}>
                                    <Typography className={classes.Typo} style={{ color: "#939FBF" }}>
                                        PREMIUM
                                    </Typography>
                                    <CustomTextField
                                        name="premium"
                                        onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                                        {...register('premium')}
                                        defaultValue={editData.premium}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={6}>
                                    <Typography className={classes.Typo} style={{ color: "#939FBF" }}>
                                        DATE OF PURCHASE
                                    </Typography>
                                    <CustomTextField
                                        name="date_of_purchase"
                                        disabled="true"
                                        onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                                        {...register('date_of_purchase')}
                                        defaultValue={moment(editData.date_of_purchase).format('MM/DD/YYYY')}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={6}>
                                    <Typography className={classes.Typo} style={{ color: "#939FBF" }}>
                                        BODILY INJURY
                                    </Typography>
                                    <CustomTextField
                                        name="bodily_injury_liability"
                                        onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                                        {...register('bodily_injury_liability')}
                                        defaultValue={editData.bodily_injury_liability}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={6}>
                                    <Typography className={classes.Typo} style={{ color: "#939FBF" }}>
                                        PROPERTY DAMAGE LIABILITY
                                    </Typography>
                                    <CustomTextField
                                        name="property_damage_liability"
                                        onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                                        {...register('property_damage_liability')}
                                        defaultValue={editData.property_damage_liability}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={6}>
                                    <Typography className={classes.Typo} style={{ color: "#939FBF" }}>
                                        PERSONAL INJURY PROTECTION
                                    </Typography>
                                    <CustomTextField
                                        name="personal_injury_protection"
                                        onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                                        {...register('personal_injury_protection')}
                                        defaultValue={editData.personal_injury_protection}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={6}>
                                    <Typography className={classes.Typo} style={{ color: "#939FBF" }}>
                                        COMPREHENSIVE
                                    </Typography>
                                    <CustomTextField
                                        name="comprehensive"
                                        onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                                        {...register('comprehensive')}
                                        defaultValue={editData.comprehensive}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12} sm={6}>
                                    <Typography className={classes.Typo} style={{ color: "#939FBF" }}>
                                        COLLISION
                                    </Typography>
                                    <CustomTextField
                                        name="collision"
                                        onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                                        {...register('collision')}
                                        defaultValue={editData.collision}
                                    />
                                </Grid>
                              
                                <Grid container direction="row" justify="flex-end" style={{ paddingTop: 20 }} spacing={3}>
                                    <Grid item>
                                        <Button
                                            disableElevation
                                            variant="contained"
                                            size="large"
                                            type="submit"
                                            style={{
                                                textTransform: "none",
                                                backgroundColor: '#4EA50F',
                                                color: "#FFFFFF",
                                                height: 55,
                                                width: 130,
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                    : <p>data not avialable</p>}
            </div>
        </div>
    );
}

export default withRouter(EditPolicy);


