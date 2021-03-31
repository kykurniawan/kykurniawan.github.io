const swiper = new Swiper('.swiper-container', {
    loop: true,
    spaceBetween: 25,
    pagination: {
        el: '.swiper-pagination',
    },
    effect: 'coverflow',

});

$('#swiper-control-button .swiper-prev').on('click', () => {
    swiper.slidePrev(500)
})
$('#swiper-control-button .swiper-next').on('click', () => {
    swiper.slideNext(500)
})