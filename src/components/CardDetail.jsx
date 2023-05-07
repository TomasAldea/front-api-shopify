import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-carousel-minimal';
import AOS from "aos";
import { ProviderContext } from '../context/ProviderContext';


export const CardDetail = () => {
    const { products } = useContext(ProviderContext);

    const [cardDetail, setCardDetail] = useState();
    const [carousel, setCarousel] = useState([]);
    const [total, setTotal] = useState('');
    const { productId } = useParams();

    //? mediaquery para prop del carrusel
    const isMobile = window.innerWidth > 900;
    const carouselWidth = isMobile ? "850px" : "100%";
    const carouselHeight = isMobile ? "600px" : "300px";

    //! esto hay que mejorarlo
    const printDetail = (products) => {

        try {            
            const cardInfo = products.find((product) => product.id == productId);
    
            setCardDetail(cardInfo);
            setTotal(cardInfo.variants[0].price)
    
            const caption = cardInfo.body_html
            const carouselArr = cardInfo.images.map((obj) => ({
                image: obj.src,
                caption: caption
            }));
    
            setCarousel(carouselArr)
            AOS.init();
        } catch (error) {
            
        }
    }

    const selectItem = (id, price) => {
        const element = document.getElementById('thumbnail-' + id);
        if (element) {
            element.click();
        }
        setTotal(price)
    }

    useEffect(() => {
        printDetail(products);
    }, [products]);

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    return (

        <div className='detail-card' data-aos-delay="300" data-aos-duration="700" data-aos="fade-in">

            <Link className='goback' to="/">↩ Volver</Link>
            {(cardDetail && cardDetail.variants.length > 1) ?
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
                <div className='info-container'>
                    <h1 className='desktop'>{cardDetail && cardDetail.title}</h1>
                    <h2>Disponible una sola opción</h2>
                    <div className={`price ${cardDetail?.variants.length > 1 ? '' : 'extra-margin'}`}>Total: <span> {total}</span> €</div>
                </div>
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
                null
            }
            <h1 className='mobile'>{cardDetail && cardDetail.title}</h1>

        </div>

    )
}
