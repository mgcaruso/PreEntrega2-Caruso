import { useEffect, useState } from "react"
import './item.css'
import IconVariant from "../IconVariant/IconVariant";
import ItemCount from "../ItemCount/ItemCount";
import { Badge } from 'flowbite-react';
import { motion } from "framer-motion";
import { Link as LinkRouter } from 'react-router-dom'
import PriceItem from "./PriceItem/PriceItem";

const Item = ({ cube, products }) => {

    const getColor = (item) => {
        switch (item) {
            case ("New"):
                return "success"
            case ("Last Units"):
                return "warning"
            case ("Offer"):
                return "failure"
            default:
                return "dark";
        }
    }

    const [variant, setVariant] = useState(cube.variants[0]);
    const handleVariantImage = (v) => {
        setVariant(v)
    }

    useEffect(() => {
        setVariant(cube.variants[0])
    }, [cube.variants, products])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="item max-w-sm w-[18rem] rounded overflow-hidden shadow-lg bg-primary dark:bg-primary-inverted text-primary-inverted dark:text-primary relative">

            {
                cube.stock > 1 &&
                <div className="specials-box absolute z-30 flex">
                    {
                        cube.specials.map((item, index) =>
                            <Badge size="sm" key={index} className="m-1 font-normal" color={getColor(item)}>
                                {item}
                            </Badge>)
                    }
                </div>
            }

            <div className="image-box relative">

                {   //No stock
                    cube.stock < 1 &&
                    <div className="no-stock">
                        <div className="stock-title">OUT OF STOCK</div>
                    </div>
                }
                <img className="w-full h-[14rem] object-cover" src={variant && variant.image} alt="Sunset in the mountains" />
            </div>
            <div className="px-6 py-4">
                <LinkRouter to={`/item/${cube.id}`}>
                    <h3 className="font-bold text-xl mb-2 min-h-[3.6rem] hover:underline dark:font-normal">{cube.name.toUpperCase()}</h3>
                </LinkRouter>
                <section className="flex justify-between items-center">

                    <div className="brand-section">
                        <p className="text-primary-inverted-hover dark:text-neutral text-base">
                            {cube.brand}
                        </p>
                        <PriceItem cube={cube} />
                    </div>
                    <div className="variant-section flex gap-1">
                        {
                            cube.variants.map((vnt, index) => {
                                return (
                                    <button className={vnt.name === variant.name ? "dark:bg-neutral-lighter ring-2 ring-neutral dark:ring-key-color rounded-md" : "hover:ring-2 hover:ring-neutral-lighter rounded-md hover:shadow-md shadow-sm dark:bg-neutral-lighter"} onClick={() => handleVariantImage(vnt)} key={index}>
                                        <IconVariant variant={vnt.name} />
                                    </button>
                                )
                            }
                            )}
                    </div>
                </section>
            </div>
            <div className="cart-section px-6 pb-4 flex flex-col justify-center gap-1">
                <ItemCount cubeData={cube} />
            </div>

        </motion.div>
    )
}

export default Item
