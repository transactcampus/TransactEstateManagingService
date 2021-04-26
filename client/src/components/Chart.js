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



    const chartData = {
        labels: ['Number of Devices'],
        datasets: [
            {
                label: 'Campus Access Devices',
                data:
                    [
                        deviceNum.campusAccessDevices,

                    ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',


                ]
            },
            { label: 'Point of Sale', backgroundColor: 'rgba(54, 162, 235, 0.6)', data: [deviceNum.pointofSale] },
            { label: 'Door Access', backgroundColor: 'rgba(255, 206, 86, 0.6)', data: [deviceNum.doorAccess] },
            { label: 'Video Survelliance', backgroundColor: 'rgba(75, 192, 192, 0.6)', data: [deviceNum.VideoSurvillance] },
            { label: 'Smart Terminals', backgroundColor: 'rgba(153, 102, 255, 0.6)', data: [deviceNum.SmartTerminals] },
        ]
    }


    return (
        <div>

            <Bar
                data={chartData}

                options={{

                    legend: {
                        display: true,
                        position: 'right',
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    // autoSkip: true,
                                    // maxTicksLimit: 10,
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

        </div>
    )

}

export default Chart;
