import React, { useEffect, useState } from 'react'
import { Charts } from '../components/app.styles'
import { Chart as Chartjs } from 'chart.js/auto'
import { Line, Bar, getDatasetAtEvent } from 'react-chartjs-2'
import axios from 'axios'

function ShowChart() {
    const [apiData, setApiData] = useState([])
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30'

    async function GetData() {
        const { data } = await axios.get(url)
        setApiData(data)
    }

    useEffect(() => {
        GetData()
    }, [])

    const volumeData = apiData?.prices?.map(el => el[1])
    const marketCapData = apiData?.market_caps?.map(el => el[1])
    const volumeLabels = apiData?.total_volumes?.map(el => new Date(el[0]).getDate().toString()).map(el => el.length === 1 ? `0${el}` : el)
    const marketCapLabels = apiData?.market_caps?.map(el => new Date(el[0]).getDate().toString()).map(el => el.length === 1 ? `0${el}` : el)

    const data = {
        labels: volumeLabels,
        datasets: [{
            label: 'Bitcoin',
            backgroundColor: '#60c9ec',
            borderColor: '#60c9ec',
            data: volumeData
        }]
    }
    const dataMarketCap = {
        labels: marketCapLabels,
        datasets: [{
            label: 'Bitcoin',
            backgroundColor: '#60c9ec',
            borderColor: '#60c9ec',
            data: marketCapData
        }]
    }
    const options = {
        plugins: {
            legend: {
                display: true,
            },
            layout: {
                padding: 1,
            },
            responsive: true,
            maintainAspectRatio: false,
        },
        elements: {
            point: {
                radius: 1,
            },
        },
        scales: {
            y: {
                grid: {
                    display: true,
                    drawTicks: false,
                },
                ticks: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: true,
                },
                ticks: {
                    display: true,
                },
            },
        },
    };
    return (
        <Charts>
            <Line data={data} options={options} />
            <Bar data={dataMarketCap} options={options} />
        </Charts>
    )
}

export default ShowChart
