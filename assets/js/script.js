const swiper = new Swiper('.swiper-container', {
    loop: true,
    centeredSlides: true,
    spaceBetween: 5,
    slidesPerView: 1.1,
    pagination: {
        el: '.swiper-pagination',
    },

});

$('#swiper-control-button .swiper-prev').on('click', () => {
    swiper.slidePrev(500)
})
$('#swiper-control-button .swiper-next').on('click', () => {
    swiper.slideNext(500)
})