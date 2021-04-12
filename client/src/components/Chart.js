import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../actions';
import { Bar, Line, Pie } from 'react-chartjs-2';
import clsx from 'clsx';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './Chart.css';

function Chart(props) {

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [deviceNum, setDeviceNum] = useState([]);

    useEffect(() => {
        setDeviceNum(props.deviceCategory)
    })

    console.log(deviceNum)

    const chartData = {
        labels: ['Campus Access Devices', 'Point of Sale', 'Door Access', 'Video Survelliance', 'Smart Terminals'],
        datasets: [
            {
                label: 'Number of Devices',
                data:
                    [
                        deviceNum.campusAccessDevices,
                        deviceNum.pointofSale,
                        deviceNum.doorAccess,
                        deviceNum.VideoSurvillance,
                        deviceNum.SmartTerminals
                    ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
            }
        ]
    }


    return (
        <div className="chart" >

            <Grid container spacing={12}>

                <Grid item xs={12} md={8} lg={6}>
                    <Bar
                        data={chartData}

                        options={{
                            title: {
                                display: true,
                                text: 'Number of Devices In UTA',
                                fontSize: 25
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            responsive: true,

                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 10,
                                            beginAtZero: true
                                        },
                                        gridLines: {
                                            display: false
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        gridLines: {
                                            display: false
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                </Grid>


                <Grid item xs={12} md={8} lg={7}>
                    <Pie
                        data={chartData}

                        options={{
                            title: {
                                display: true,
                                text: 'Number of Devices In UTA',
                                fontSize: 25
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            label: {
                                display: false
                            },

                        }}
                    />
                </Grid>


            </Grid>





        </div>
    )

}

export default Chart;
