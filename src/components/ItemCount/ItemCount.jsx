import { useState } from "react";

const ItemCount = ({ cubeData }) => {

    const addBtnClasses = {
        disabledClass: "rounded-md border-2 border-neutral-lighter p-1 text-neutral w-full dark:border-[#333] dark:text-[#333]",
        enabledClass: "rounded-md border-2 border-primary-inverted dark:border-neutral-lighter p-1 text-primary-inverted dark:text-primary hover:text-primary hover:bg-primary-inverted dark:hover:bg-primary dark:hover:text-primary-inverted ease-in duration-300 w-full",
    }

    const itemCountClasses = {
        itemDisabledClass: "font-bold flex-grow text-neutral dark:text-[#333]",
        itemEnabledClass: "font-bold flex-grow hover:bg-neutral-lighter hover:text-primary-inverted dark:hover:bg-primary-inverted-hover dark:hover:text-primary ease-in duration-100",
    }

    const {itemDisabledClass , itemEnabledClass} = itemCountClasses;

    const {disabledClass , enabledClass } = addBtnClasses;

    const shadow = {
        strong: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        light: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
    };

    const [quantity, setQuantity] = useState(1);

    const handleAddItem = () => {
        if (quantity < cubeData.stock) {
            setQuantity(quantity + 1);
        }
    }

    const handleRemoveItem = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
            <div className="btn-box flex w-full justify-around  m-1 border-neutral-lighter dark:border-[#333] border-t-[1px] border-b-[1px] bg-primary-hover dark:bg-primary-inverted">
                <button disabled={cubeData.stock < 1 ? true : false} onClick={handleRemoveItem} className={cubeData.stock < 1 ? itemDisabledClass : itemEnabledClass} >-</button>
                
                <div className="quantity flex-grow flex items-center justify-center py-1 dark:text-neutral ">{cubeData.stock < 1 ? 0 : quantity}</div>

                <button disabled={cubeData.stock < 1 ? true : false} onClick={handleAddItem} className={cubeData.stock < 1 ? itemDisabledClass : itemEnabledClass} >+</button>
            </div>
            <button style={{
                boxShadow: shadow.light
            }} className={cubeData.stock < 1 ? disabledClass : enabledClass}>Add to Cart</button>
        </>
    )
}

export default ItemCount
