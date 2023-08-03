import { Card } from 'flowbite-react';
import PriceItem from '../Item/PriceItem/PriceItem';
import IconVariant from '../IconVariant/IconVariant';
import ItemCount from '../ItemCount/ItemCount';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cubeData from '../../utilities/cubesData.json'
import { fetchData } from '../../utilities/fetchingFn';
import { Spinner } from 'flowbite-react';
import Loader from '../Loader/Loader';

const ItemDetail = () => {

    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [variant, setVariant] = useState(null);



    useEffect(() => {
        fetchData(cubeData).then(res => {
            let itemFound = res.filter(item => item.id == id);
            setItem(itemFound[0]);
            setLoading(false);
            setVariant(item.variants[0])
        }).catch(err => console.log(err));
    }, [id, item]) //no agregar variant aca


    const handleVariantImage = v => {
        setVariant(v);
    };

    const customImageTheme = {
        img: {
            horizontal: {
                off: "rounded-t-lg",
                on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-[40%] md:rounded-none md:rounded-l-lg"
            }
        }
    };

    if (loading) {
        return <Loader message="Loading product..." />;
    }


    return (
        <main className="justify-center items-center font-body bg-neutral-lighter dark:bg-primary-inverted-hover">
            {
                item &&

                <Card
                    horizontal
                    theme={customImageTheme}
                    imgAlt={variant && item?.name}
                    imgSrc={variant && variant.image}
                    className='max-w-xl md:max-w-[80%] bg-primary dark:bg-primary-inverted'
                >
                    <h5 className="text-2xl font-bold tracking-tight text-primary-inverted dark:text-primary">
                        {item?.name}
                    </h5>
                    <div className="price-variants flex justify-between">
                        <PriceItem cube={item} />
                        <p className="font-normal text-primary-inverted-hover dark:text-neutral-light dark:text-neutral-lighter">
                            <span className='font-bold text-primary dark:font-normal'>Category:</span> {item?.category}
                        </p>
                    </div>
                    <p className="font-normal text-primary-inverted-hover dark:text-neutral-light text-justify dark:text-neutral-lighter">
                        {item?.description}
                    </p>


                    <div className="variants-box">
                        <p className='text-primary-inverted py-2'>Select a variant:</p>
                        <div className="variants flex gap-3">
                            {!variant ?

                                <Spinner />
                                :
                                item?.variants?.map((v, i) =>
                                    <button className={v.name === variant.name ? "ring-2 ring-neutral rounded-md" : "hover:ring-2 hover:ring-neutral-lighter rounded-md hover:shadow-md shadow-sm"} onClick={() => handleVariantImage(v)} key={i}>
                                        <IconVariant variant={v.name} />
                                    </button>
                                )}

                        </div>
                    </div>
                    <section className="purchase-section flex flex-wrap w-full  md:w-[60%] sm:w-[60%]">
                        <ItemCount cubeData={item} />
                    </section>

                </Card>
            }
        </main>
    )
}

export default ItemDetail
