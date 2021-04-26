import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../actions';
import { Bar, Line, Pie } from 'react-chartjs-2';
import clsx from 'clsx';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './Chart.css';

function StatusPieChart(props) {

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [deviceStat, setDeviceStat] = useState([]);

    useEffect(() => {
        setDeviceStat(props.totalcount)
    })

    console.log(deviceStat)

    const chartData = {
        labels: ['Online Devices', 'Offline Devices'],
        datasets: [
            {
                label: 'Number of Devices',
                data:
                    [
                        deviceStat.onlinecount,
                        deviceStat.offlinecount
                    ],
                backgroundColor: [
                    'rgba(18, 162, 233)',
                    'rgba(219, 71, 40)',
                ]
            }
        ]
    }


    return (
        <div  >

            <Pie
                data={chartData}

                options={{

                    legend: {
                        display: true,
                        position: 'right'
                    },
                    label: {
                        display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false,

                }}
            />

        </div >
    )

}

export default StatusPieChart;
