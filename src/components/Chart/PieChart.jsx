import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ data = [], categories = [], realData = [] }) => {
    const series = data;

    const options = {
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: categories,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
        tooltip: {
            y: {
                formatter: (_value, { seriesIndex }) => {
                    const realValue = realData[seriesIndex];
                    return `${realValue} CV`;
                },
            },
        },
    };

    return (
        <div className="p-3">
            <div className="" id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="pie"
                    width={450}
                />
            </div>
        </div>
    );
};

export default PieChart;
