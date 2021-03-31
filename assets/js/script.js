const swiper = new Swiper('.swiper-container', {
    loop: true,
    spaceBetween: 25,
});

$('#swiper-control-button .swiper-prev').on('click', () => {
    swiper.slidePrev(500)
})
$('#swiper-control-button .swiper-next').on('click', () => {
    swiper.slideNext(500)
})