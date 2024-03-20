import {createContext, useContext, useState} from "react";

const BasketContext = createContext();

export const BasketProvider = ({children}) => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems((prevState)=> [...prevState, item]);
    }

    const removeItem = (item) => {
        setItems((prevState)=> prevState.filter((prevItem)=> prevItem !== item));
    }

    const isInBasket = (item) => items.includes(item);

    const providedValues = {
        items,
        setItems,
        addItem,
        removeItem,
        isInBasket,
    }

    return (
        <BasketContext.Provider value={providedValues}>
            {children}
        </BasketContext.Provider>
    );
}

export const useBasket = () => useContext(BasketContext);