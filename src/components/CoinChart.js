import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Line } from 'react-chartjs-2'
import CurrencyContext from '../context/CurrencyContext'
import { Button, Stack } from '@mui/material'
import { HistoricalChart } from '../endpoints/api'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CoinChart = ({ coin }) => {
    const [days, setDays] = useState(1);
    const [historicalData, setHistoricalData] = useState([])

    const { currency } = useContext(CurrencyContext)

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin?.id, days, currency))
        setHistoricalData(data.prices);
    }


    useEffect(() => {
        fetchHistoricalData();
        // eslint-disable-next-line
    }, [currency, days])

    // console.log(historicalData)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = historicalData.map((data) => {
        let date = new Date(data[0]);
        let time = date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`

        return days === 1 ? time : date.toLocaleDateString();
    });

    const data = {
        labels,
        datasets: [
            {
                label: `Price (in past ${days} days) in ${currency}`,
                data: historicalData.map((data) => data[1]),
                borderColor: '#1976d2',
                backgroundColor: '#1976d2',
                pointStyle: 'circle',
                pointRadius: 1,
                pointHoverRadius: 5
            }
        ],
    };

    const daysOptions = [
        {
            label: "24 Hours",
            value: 1
        },
        {
            label: "30 Days",
            value: 30
        },
        {
            label: "3 Months",
            value: 90
        },
        {
            label: "1 Year",
            value: 365
        },
    ]
    return (
        <>
            <Line data={data} options={options} />
            <Stack direction='row' justifyContent="space-between" sx={{ width: "100%", marginTop: 2, marginBottom: 5 }} spacing={0.5} >
                {
                    daysOptions.map((option) => {
                        return <Button variant={option.value === days ? "contained" : "outlined"} key={option.value} onClick={() => { setDays(option.value) }}>
                            {option.label}
                        </Button>
                    })
                }
            </Stack >
        </>
    )
}


export default CoinChart
