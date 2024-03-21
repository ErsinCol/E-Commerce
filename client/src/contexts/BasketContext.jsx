import {createContext, useContext, useEffect, useState} from "react";

const BasketContext = createContext();

const initialBasket = JSON.parse(localStorage.getItem("basket")) || [];

export const BasketProvider = ({children}) => {
    const [items, setItems] = useState(initialBasket);

    useEffect(()=> {
        localStorage.setItem("basket", JSON.stringify(items));
    }, [items])

    const addItem = (item) => {
        setItems((prevState)=> [...prevState, item]);
    }

    const removeItem = (item) => {
        setItems((prevState)=> prevState.filter((prevItem)=> prevItem._id !== item._id));
    }

    const clearBasket = () => {
        localStorage.removeItem("basket");
        setItems([]);
    }

    const providedValues = {
        items,
        setItems,
        addItem,
        removeItem,
        clearBasket,
    }

    return (
        <BasketContext.Provider value={providedValues}>
            {children}
        </BasketContext.Provider>
    );
}

export const useBasket = () => useContext(BasketContext);