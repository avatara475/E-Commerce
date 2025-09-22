import React, { useState } from 'react';
import CommonChart from '../common/CommonChart';

const Chart = () => {
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [chartType, setChartType] = useState('monthly'); // For second chart


  // Bar Chart Data
  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true
      }
    },
    xaxis: {
      categories: timePeriod === 'monthly' 
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] 
        : ['Q1', 'Q2', 'Q3', 'Q4']
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#008FFB']
  };

  const barChartSeries = [{
    name: 'Sales',
    data: timePeriod === 'monthly' 
      ? [30, 40, 35, 50, 49, 60, 45, 65, 20, 33, 55, 25] 
      : [120, 150, 180, 200]
  }];

  // Pie Chart Data
  const pieChartOptions = {
    chart: {
      type: 'pie',
      height: 350,
      toolbar: {
        show: true
      }
    },
    labels: chartType === 'monthly' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['Q1', 'Q2', 'Q3', 'Q4'],
    colors: [
      '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
      '#546E7A', '#26a69a', '#D10CE8', '#FF9F43', '#4ECDC4',
      '#00A8FF', '#9C27B0'
    ],
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + "%";
      }
    }
  };

  const pieChartSeries = chartType === 'monthly' 
    ? [30, 40, 35, 50, 49, 60, 45, 65, 20, 33, 55, 25]
    : [120, 150, 180, 200];

  const handleTimePeriodClick = (index) => {
    const periods = ['monthly', 'quarterly'];
    setTimePeriod(periods[index]);
  };

  const handleChartTypeClick = (index) => {
    const types = ['monthly', 'quarterly'];
    setChartType(types[index]);
  };

  return (
    <div className='p-5'>
      {/* First Chart - Bar Chart */}
      <CommonChart
        title="Sales Performance - Bar Chart"
        options={barChartOptions}
        series={barChartSeries}
        subCategory={['Monthly', 'Quarterly']}
        onSubCategoryClick={handleTimePeriodClick}
        className="mt-5"
      />

    <div className='block lg:flex justify-between'>
      {/* Second Chart - Pie Chart */}
      <CommonChart
        title="Sales Distribution - Pie Chart"
        options={pieChartOptions}
        series={pieChartSeries}
        subCategory={['Monthly', 'Quarterly']}
        onSubCategoryClick={handleChartTypeClick}
        className="mt-5"
      />

      <CommonChart
        title="Sales Distribution - Pie Chart"
        options={pieChartOptions}
        series={pieChartSeries}
        subCategory={['Monthly', 'Quarterly']}
        onSubCategoryClick={handleChartTypeClick}
        className="mt-5"
      />

      <CommonChart
        title="Sales Distribution - Pie Chart"
        options={pieChartOptions}
        series={pieChartSeries}
        subCategory={['Monthly', 'Quarterly']}
        onSubCategoryClick={handleChartTypeClick}
        className="mt-5"
      />
      </div>
    </div>
  );
};

export default Chart;