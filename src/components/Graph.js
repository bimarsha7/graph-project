import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Row, Col } from 'react-bootstrap';
import { loadCSV } from "../utils/csvParser";

export const Graph = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // get the csv data and send it to be formatted.
    const fetchData = async () => {
      try {
        const data = await loadCSV();
        if (data) formatData(data)
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();

  }, []);

  const formatData = (data) => {
    try {
      const categories = [
        { name: 'SL', color: '#f1190f' },
        { name: 'SCL', color: '#17d414' },
        { name: 'IGV-4', color: '#000000' },
        { name: 'IGV-3', color: '#000000' },
        { name: 'IGV-2', color: '#000000' },
        { name: 'IGV-1', color: '#000000' },
        { name: 'IGV-0', color: '#000000' },
        { name: 'IGV-n1', color: '#000000' },
        { name: 'IGV-n2', color: '#000000' },
      ];

      // format the data for xaxis and yaxis for each of 'SL' ,'SCL' and 'SL | CC' data
      const processData = (data, category) => {
        return data?.filter((item) => item.Category === category).map((item) => ({
          x: parseFloat(item['Volumetric Flow']),
          y: parseFloat(item['Pressure Ratio']),
        }));
      };

      // format the data into required structure with `name`, `data`, and `color` code.
      // Change the name to match the required name for the legend.
      const seriesData = categories.map(({ name, color }) => ({
        name: name === 'SL' ? 'SL | Turbolog' : name === 'SCL' ? 'SCL | Turbolog' : `SL | CC (${name})`,
        data: processData(data, name),
        color,
      }));

      // update the state of `graphData`
      setGraphData({
        series: seriesData,
        options: {
          chart: {
            type: 'line',
          },
          xaxis: {
            title: {
              text: 'Volumetric Flow [m3/h]',
              style: {
                fontSize: '16px',
                fontWeight: 500,
              }
            },
            // categories: [150, 200, 250, 300, 350, 400],
            min: 150,
            max: 400,
            stepSize: 50,
            tickAmount: 4,
            labels: {
              style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
              }
            }
          },
          yaxis: {
            title: {
              text: 'Pressure Ratio [-]',
              style: {
                fontSize: '16px',
                fontWeight: 500,
              }
            },
          },
          title: {
            text: 'Compression Map',
            align: 'center',
            style: {
              fontSize: '18px',
              fontWeight: 700,
            }
          },
          stroke: {
            curve: 'straight',
            width: 3,
          },
          markers: {
            size: 5,
            strokeWidth: 1,
            fillOpacity: 1,
            hover: {
              size: 8,
            },
          },
          legend: {
            position: 'right',
            horizontalAlign: 'center',
            floating: false,
            markers: {
              shape: 'diamond',
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error)
    };
  };

  return (
    <Row className="mt-4 mb-4">
      <Col>
        {graphData?.series && (
          <Chart
            options={graphData?.options}
            series={graphData?.series}
            type="line"
          />
        )}
      </Col>
    </Row>
  )
};
