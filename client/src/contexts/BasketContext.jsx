import {createContext, useContext, useState} from "react";

const BasketContext = createContext();

export const BasketProvider = ({children}) => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems((prevState)=> [...prevState, item]);
    }

    const removeItem = (item) => {
        setItems((prevState)=> prevState.filter((prevItem)=> prevItem._id !== item._id));
    }

    const providedValues = {
        items,
        setItems,
        addItem,
        removeItem
    }

    return (
        <BasketContext.Provider value={providedValues}>
            {children}
        </BasketContext.Provider>
    );
}

export const useBasket = () => useContext(BasketContext);