import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-carousel-minimal';


export const CardDetail = () => {
    const [cardDetail, setCardDetail] = useState();
    const [carousel, setCarousel] = useState([]);
    const [total, setTotal] = useState('');
    const { productId } = useParams();

    //? mediaquery para prop del carrusel
    const isMobile = window.innerWidth > 900;
    const carouselWidth = isMobile ? "850px" : "100%";
    const carouselHeight = isMobile ? "600px" : "373px";

    //! esto hay que mejorarlo
    async function fetchData() {

        const result = await fetch('https://api-shopify-gamma.vercel.app/api/products');
        const { data } = await result.json();
        const cardInfo = data.products.find((product) => product.id == productId);

        setCardDetail(cardInfo);
        setTotal(cardInfo.variants[0].price)

        const caption = cardInfo.body_html
        const carouselArr = cardInfo.images.map((obj) => ({
            image: obj.src,
            caption: caption
        }));

        setCarousel(carouselArr)
    }

    const selectItem = (id, price) => {
        const element = document.getElementById('thumbnail-' + id);
        if (element) {
            element.click();
        }
        setTotal(price)
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(cardDetail);

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    return (
        <div className='detail-card'>
           
            <Link className='goback' to="/">↩ Volver</Link>
            {cardDetail ?
                <div className='info-container'>
                    <h1 className='desktop'>{cardDetail.title}</h1>
                    <h2>Elige una opción</h2>
                    <ul>
                        {cardDetail.variants.map((product, index) => (
                            <li onClick={() => selectItem(index, product.price)} key={index}>{product.title} - {product.price}€</li>
                        ))}
                    </ul>
                    <div className='price'>Total: <span> {total}</span> €</div>
                </div>
                :
                null
            }
            {carousel.length > 0 ?

                <Carousel
                    data={carousel}
                    time={6000}
                    id="test"
                    width={carouselWidth}
                    height={carouselHeight}
                    captionStyle={captionStyle}
                    radius="10px"
                    slideNumber={true}
                    slideNumberStyle={slideNumberStyle}
                    captionPosition="bottom"
                    automatic={false}
                    dots={true}
                    pauseIconColor="white"
                    pauseIconSize="40px"
                    slideBackgroundColor="white"
                    slideImageFit="cover"
                    thumbnails={true}
                    thumbnailWidth="100px"
                    style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                        margin: "40px auto",
                    }}
                />

                :
                <img className='loading' src="loading.gif"></img>
                }
            <h1 className='mobile'>{cardDetail && cardDetail.title}</h1>

        </div>
    )
}
