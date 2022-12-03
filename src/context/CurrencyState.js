import React, { useEffect, useState } from 'react'
import CurrencyContext from './CurrencyContext'

const CurrencyState = ({ children }) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [mode, setMode] = useState("light");

    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
        else if (currency === "EUR") setSymbol("€");
    }, [currency]);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, symbol, mode, setMode }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyState;
