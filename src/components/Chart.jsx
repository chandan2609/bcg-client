import Chart from "react-google-charts";
import React, { useState, useEffect } from 'react';



export default function ChartBar({data})
{

    const [val, setVal] = React.useState();
    const datapoint=[
        ['Month', 'No of Policy'],
        ['Jan', 0],
        ['Feb', 0],
        ['Mar', 0],
        ['Apr', 0],
        ['May', 0],
        ['June', 0],
        ['July', 0],
        ['Aug', 0],
        ['Sep', 0],
        ['Oct', 0],
        ['Nov', 0],
        ['Dec', 0,],
      ];

      useEffect(() => {
        if(data)
        setVal(1)
        {
       data.map(data => (
          datapoint[data.txn_month][1]=Number(data.count),
          console.log('datapoint',datapoint)
         ))
      }
      console.log('datapointoutside',datapoint)
      setVal(datapoint)
      console.log('val',val)
    }, [data]);


return (
    <div>
{ {val} ?
<Chart
  width={'700px'}
  height={'300px'}
  chartType="Bar"
//   loader={<div>Loading Chart</div>}
  data={val}
  options={{
    chart: {
      title: 'No of policies',
      subtitle: 'polies for all the regions',
    },
  }}

/>:<p>no value</p>}
</div>
);
}