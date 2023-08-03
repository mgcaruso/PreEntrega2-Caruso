import { fetchItem } from "../../utilities/fetchingFn";
import cubesData from '../../utilities/cubesData.json'
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {

    const { cubeId } = useParams();
    // console.log(cubeId, categoryId)
    const [product, setProduct] = useState({});


    useEffect(() => {
        fetchItem(cubesData.filter(cube => cube.id == cubeId))
            .then(res => {
                setProduct(res);
            })
    }, [cubeId])


    return (
        <>
            <ItemDetail item={product[0]} />
        </>
    )
}

export default ItemDetailContainer;
