import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { useParams } from "react-router-dom";

const Coin = (props) => {
    const [coin, setCoin] = useState({});
    const [content, setContent] = useState(true)
    const [coinClicked, setCoinClicked] = useState('')
    const params = useParams();

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

    async function getData() {
        await axios
            .get(url)
            .then((res) => setCoin(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getData()
    }, [])

    const showContent = () => {
        setContent(!content)
    }

    const handleCoinClicked = () => {
        setCoinClicked(params.coinId)
        props.chartData(params.coinId)
    }

    return <>
        <div className="CoinAll">
            <Link to='/'>
                <div className="Link">
                    Go Back
                </div>
            </Link>
            <div className="CoinTitle">
                <h1>
                    {coin.name}
                </h1>
            </div>
            <div className="CoinWrapper">
                <div className="CoinContent">
                    <div className="CoinImage">
                        {coin.image ? <img src={coin.image.small} alt="..." /> : null}
                    </div>
                    <p className="CoinName">{coin.name}</p>
                    <p>({coin.symbol})</p>
                    <div className="CoinRank">
                        Rank # {coin.market_cap_rank}
                    </div>
                </div>
            </div>
            <div className="CoinInfo">
                {coin?.description?.en.length === 0 ? 'There is no description for this coin.' : content && coin?.description?.en.length > 200 ? coin?.description?.en.slice(0, 250) + ' ...' : coin?.description?.en}
                <button onClick={showContent}>{coin?.description?.en.length < 200 ? null : content ? 'Show More' : 'Show Less'}</button>
            </div>
        </div>
    </>;
};

export default Coin;
