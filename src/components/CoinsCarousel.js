import { Box } from '@mui/material';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import CurrencyContext from '../context/CurrencyContext';
import { TrendingCoins } from '../endpoints/api';

const CoinsCarousel = () => {
    const [trendingcoins, setTrendingCoins] = useState([]);
    const { currency, symbol } = useContext(CurrencyContext);
    const getTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        console.log(data)
        setTrendingCoins(data);
    }

    useEffect(() => {
        getTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const items = trendingcoins.map((coin) => {
        let profit = coin?.price_change_percentage_24h;
        return (
            <Link style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "white",
            }} to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} style={{ marginBottom: 10, width: "100px", margin: "0 auto", borderRadius: 50 }} />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit > 0 && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 1,
        },
        512: {
            items: 5
        }
    }

    return (
        <Box sx={{
            padding: "16px", margin: "48px auto", height: "50%", display: "flex",
            alignItems: "center",
        }}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
            >
            </AliceCarousel>
        </Box>
    )
}

export default CoinsCarousel
