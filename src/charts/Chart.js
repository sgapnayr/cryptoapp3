import React, { useEffect, useState } from 'react'
import { Charts } from '../components/app.styles'
import { Chart as Chartjs } from 'chart.js/auto'
import { Line, Bar, getDatasetAtEvent } from 'react-chartjs-2'
import axios from 'axios'
import { parsePath } from 'react-router-dom'

export default function ShowChart(props) {
    const [apiData, setApiData] = useState([])
    const url = `https://api.coingecko.com/api/v3/coins/${props.coinClicked}/market_chart?vs_currency=usd&days=1`
    console.log(url)

    async function GetData() {
        await axios.get(url).then(res => setApiData(res.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        GetData()
    }, [props.coinClicked])

    const priceData = apiData?.prices?.map(el => el[1])
    const volumeLabels = apiData?.total_volumes?.map(el => new Date(el[0]).getDate().toString()).map(el => el.length === 1 ? `0${el}` : el)

    const data = {
        labels: volumeLabels?.slice(0, 20),
        datasets: [
            {
                label: 'Unfilled',
                lineTension: .5,
                background: 'red',
                fill: false,
                data: priceData?.slice(0, 20),
            }]
    }
    // const dataMarketCap = {
    //     labels: marketCapLabels,
    //     datasets: [{
    //         label: 'Bitcoin',
    //         backgroundColor: '#60c9ec',
    //         borderColor: '#60c9ec',
    //         data: marketCapData
    //     }]
    // }
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
                    display: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
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
        </Charts>
    )
}

