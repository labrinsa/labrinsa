import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
    const slides = [
        {
            id: 1,
            image: 'vaca.jpg',
            title: 'Laboratorios Rincón S.A.',
            subtitle: 'La solución a tus necesidades veterinarias',
            buttonText: 'Catálogo',
            link: '/products',
        },
        {
            id: 2,
            image: 'pc.jpg',
            title: 'Contáctenos',
            subtitle: 'Comuníquese con nosotros de la forma que más le convenga​',
            buttonText: 'Contactar',
            link: '/contact',
        },
        {
            id: 3,
            image: 'quienes.jpg',
            title: '¿Quiénes somos?',
            subtitle: 'Laboratorios Rincón sucesora de Laboratorio Esteva la cual fue adquirida por el Dr. Temístocles Rincón Martínez en el año 1945',
            buttonText: 'Saber más',
            link: '/about',
        },
    ];

    return (
        <div className="relative w-full h-[600px] group">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    nextEl: '.button-next',
                    prevEl: '.button-prev',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            {/* Overlay oscuro para legibilidad */}
                            <div className="absolute inset-0 bg-black/30 z-10" />

                            {/* Imagen de Fondo */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Contenido de Texto */}
                            <div className="relative z-20 h-full flex flex-col justify-center px-10 md:px-24 max-w-5xl">
                                <h1 className="text-white text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="text-white text-lg md:text-xl mb-8 font-light italic">
                                    {slide.subtitle}
                                </p>
                                <Link to={slide.link}>
                                    <button className="cursor-pointer bg-[#d32f2f] hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full w-fit transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                                        {slide.buttonText}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Flechas Personalizadas (Estilo minimalista de la imagen) */}
                <button className="button-prev cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button className="button-next cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-white transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </Swiper>

            {/* Estilos adicionales para los puntos de paginación de Swiper */}
            <style>{`
        .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { opacity: 1; background: #d32f2f !important; }
      `}</style>
        </div>
    );
};

export default HeroSlider;