
import React, { useEffect, useState } from 'react'
import BackToTop from '../components/Common/BackToTop';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header'
import Loader from '../components/Common/Loader';
import PaginationComponent from '../components/Dashboard/Pagination';
import Search from '../components/Dashboard/Search';
import TabsComponent from '../components/Dashboard/Tabs'
import { get100Coins } from '../functions/get100Coins';

function DashboardPage() {
    const [coins, setCoins] = useState([])
    const [paginatedCoins, setPaginatedCoins] = useState([])
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const handlePageChange = (event, value) => {
        setPage(value);
        var previousIndex = (value - 1) * 10;
        setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10))
    };
    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    var filteredCoins = coins.filter((item) =>
        item.name
            .toLowerCase()
            .includes(search.toLowerCase())
        || item.symbol.toLowerCase().includes(search.toLowerCase())
    )
    useEffect(() => {
        //   fetch(
        //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
        //   )
        //   .then((res)=>res.json())
        //   .then((data)=>{});
        getData();
    }, []);
    const getData = async () => {
        const myCoins = await get100Coins()
        if (myCoins) {
            setCoins(myCoins);
            setPaginatedCoins(myCoins.slice(0, 10))
            setIsLoading(false);
        }

    };
    return (
        <>
            <Header />
            <BackToTop />
            {isLoading ? (<Loader />
            ) : (
                <div>
                    <Search search={search} onSearchChange={onSearchChange} />
                    <TabsComponent
                        coins={search ? filteredCoins : paginatedCoins}
                        setSearch={setSearch}
                    />
                    {!search && (
                        <PaginationComponent
                            page={page}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            )}
            <Footer />
        </>
    );
}

export default DashboardPage