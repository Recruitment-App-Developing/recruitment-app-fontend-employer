import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const DistributedChart = ({
    data = [],
    categories = [],
    seriesName = 'Số lượng tin',
}) => {
    const series = [
        {
            name: seriesName,
            data: data,
        },
    ];

    const options = {
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {},
            },
        },
        colors: [
            '#008FFB',
            '#00E396',
            '#FEB019',
            '#FF4560',
            '#775DD0',
            '#546E7A',
            '#26A69A',
            '#D10CE8',
        ],
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'left',
            labels: {
                colors: 'black',
            },
        },
        xaxis: {
            categories: categories,
            labels: {
                show: false,
            },
        },
        yaxis: {
            tickAmount: 15,
            labels: {
                style: {
                    colors: 'black',
                    fontSize: '12px',
                },
            },
        },
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default DistributedChart;
