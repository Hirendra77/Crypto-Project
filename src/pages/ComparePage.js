import React, { useEffect, useState } from 'react'
import CoinInfo from '../components/Coin/CoinInfo';
import LineChart from '../components/Coin/LineChart';
import PriceType from '../components/Coin/PriceType';
import SelectDays from '../components/Coin/SelectDays';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header'
import Loader from '../components/Common/Loader';
import SelectCoins from '../components/Compare/SelectCoins';
import List from '../components/Dashboard/List';
import { coinObject } from '../functions/coinObject';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import { settingChartData } from '../functions/settingChartData';

function ComparePage() {
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    const [crypto1Data, setCrypto1Data] = useState({})
    const [crypto2Data, setCrypto2Data] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [days, setDays] = useState(30)
    const [priceType, setPriceType] = useState("prices")
    const [chartData, setChartData] = useState({});

    async function handleDaysChange(event) {
        setIsLoading(true);
        setDays(event.target.value);
        const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
        const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);
        settingChartData(setChartData, prices1, prices2);
        setIsLoading(false);
    }

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        setPriceType(newType);
        const prices1 = await getCoinPrices(crypto1, days, newType);
        const prices2 = await getCoinPrices(crypto2, days, newType);
        settingChartData(setChartData, prices1, prices2);
        setIsLoading(false);

    };

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
        setIsLoading(true);
        const data1 = await getCoinData(crypto1);
        if (data1) {
            const data2 = await getCoinData(crypto2);
            coinObject(setCrypto1Data, data1)

            if (data2) {
                coinObject(setCrypto1Data, data2)
                const prices1 = await getCoinPrices(crypto1, days, priceType);
                const prices2 = await getCoinPrices(crypto2, days, priceType);
                settingChartData(setChartData, prices1, prices2);
                console.log("BOTH PRICES FETCHED", prices1, prices2)
                setIsLoading(false);
            }
        }
    }
    const handelCoinChange = async (event, isCoin2) => {
        setIsLoading(true);
        if (isCoin2) {
            setCrypto2(event.target.value);
            const data = await getCoinData(event.target.value);
            coinObject(setCrypto2Data, data)
            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto2, days, priceType);
            if (prices1.length > 0 && prices2.length > 0) {
                // settingChartData(setChartData, prices)
                console.log("BOTH PRICES FETCHED", prices1, prices2)
                setIsLoading(false);
            }
        } else {
            setCrypto1(event.target.value);
            const data = await getCoinData(event.target.value);
            coinObject(setCrypto1Data, data)
        }

    };

    return (
        <div>
            <Header />
            {isLoading || !crypto1Data || !crypto2Data || !chartData ?          
                (<Loader />) : (
                    <>
                        <div className='coins-days-flex'>
                            <SelectCoins
                                crypto1={crypto1}
                                crypto2={crypto2}
                                handelCoinChange={handelCoinChange}
                            />
                            <SelectDays
                                days={days}
                                handleDaysChange={handleDaysChange}
                                noPTag={true}
                            />
                        </div>
                        <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                            <List coin={crypto1Data} />
                        </div>
                        <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                            <List coin={crypto2Data} />
                        </div>
                        <div className='grey-wrapper'>
                            <PriceType priceType={priceType}
                                handlePriceTypeChange={handlePriceTypeChange}
                            />
                            <LineChart
                                chartData={chartData}
                                priceType={priceType}
                                multiAxis={true}
                            />
                        </div>
                        <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
                        <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
                    </>
                )}
                <Footer />
        </div>
    );
}

export default ComparePage;