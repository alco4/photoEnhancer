import { useRef } from 'react';
import Slider from "react-slick";
import { imagesData } from '../../imagesData'
import loadingGif from '../../assets/img/loading.gif'
import styles from './gallery.module.scss'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Gallery = ({ onClick }: { onClick: (e: React.MouseEvent<HTMLDivElement>, val: string) => void }) => {
    const slider = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        height: 300,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const sliderWithImgs =
        <Slider ref={slider} {...settings}>
            {imagesData.length && imagesData.map((img) => {
                return (
                    <div key={img.url} className={styles.gallery__card}>
                        <img src={loadingGif} data-src={`${img.url}?w=800&h=600`} className={`${styles.gallery__photo} lazyload`} onClick={e => onClick(e, `${img.url}?w=800&h=600`)} alt={img.name} width="200" height="200" loading="lazy" />
                    </div>
                )
            })}
        </Slider>

    return (
        <div className={styles.gallery}>
            <ArrowBackIosIcon className={styles.gallery__arrowButton} onClick={() => slider?.current?.slickPrev()}>Prev</ArrowBackIosIcon>
            <div className={styles.gallery__carousel}>
                {sliderWithImgs}
            </div>
            <ArrowForwardIosIcon className={styles.gallery__arrowButton} onClick={() => slider?.current?.slickNext()}>Next</ArrowForwardIosIcon>
        </div>
    )
}

export default Gallery
