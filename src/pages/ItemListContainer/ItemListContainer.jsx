import { useContext, useEffect, useState } from "react"
import cubeData from '../../utilities/cubesData.json'
import ItemList from "../../components/ItemList/ItemList";
import { fetchData } from "../../utilities/fetchingFn";
import Filters from "../../components/Filters/Filters";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import { FiltersContext } from "../../components/Context/Filters/filters";

const ItemListContainer = () => {

    let { categoryId } = useParams();
    console.log(categoryId)
    const options = ["minPrice", "variants", "nameSearch", "brands"];
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { filters, setFilters } = useContext(FiltersContext)


    useEffect(() => {
        fetchData(cubeData).then(res => {
            setProducts(res);
            setLoading(false);
        }).catch(err => console.log(err));
    }, [])

    
    //FUNCIÓN DE FILTRADO:
    const filterProducts = (data) => {
        return data.filter(p => {
            return (
                (p.price >= filters.minPrice) &&
                // (filters.category === 'all' || p.category === filters.category) &&
                (p.brand.toLowerCase() === filters.brand.toLowerCase() || filters.brand === 'all') &&
                (
                    !categoryId ||
                    (categoryId === "all" && (filters.category === p.category || filters.category === "all")) ||
                    (p.category === categoryId)
                ) &&
                (p.name.toLowerCase().startsWith(filters.name.toLowerCase())) &&
                (p.variants.some(variant => variant.name === filters.variant) || filters.variant === 'all')
            );
        });
    }


    const filteredProducts = filterProducts(products);

    if (loading) return <Loader message={"Loading products..."} />

    return (
        <main className="flex-col dark:bg-primary-inverted-hover bg-neutral-ultra-light">
            <Filters filters={filters} setFilters={setFilters} products={products} options={options} />
            <section className="flex justify-center items-center">
                <ItemList products={filteredProducts} />
            </section>
        </main>
    )
}

export default ItemListContainer
