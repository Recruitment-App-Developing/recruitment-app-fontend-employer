import React from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaChart = ({
    data = [],
    categories = [],
    subtitle = 'Số lượng tin tuyển dụng',
    serieName = 'Số lượng tin',
}) => {
    const seriesData = {
        monthDataSeries1: {
            prices: data,
            dates: categories.map((item) => item),
        },
    };

    const series = [
        {
            name: serieName,
            data: seriesData.monthDataSeries1.prices,
        },
    ];

    const options = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
        },
        subtitle: {
            text: subtitle,
            align: 'left',
        },
        labels: seriesData.monthDataSeries1.dates,
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            opposite: true,
        },
        legend: {
            horizontalAlign: 'left',
        },
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="area"
                    height={350}
                />
            </div>
        </div>
    );
};

export default AreaChart;
