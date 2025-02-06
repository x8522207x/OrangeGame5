let startY = 0;

$(document).ready(() => {
    window.addEventListener('resize', updateMaxVH);

    $('.modal_wrap').css('display', 'none');
    setTimeout(() => {
        $('.loading').remove();
        $('.modal').toggleClass('hide');
        $('.modal_wrap').css('display', '');
    }, 1000);

    ['.event_banner', '.event_gnb_menu'].forEach(ele => $(ele).on('click', () => {
        $('.event_banner').toggleClass('-open');
    }));

    $('.event_gnb_gamestart').on('click', () => {
        window.open("https://galaxy.beanfun.com/webapi/view/login/twp?redirect_url=https://warsofprasia.beanfun.com/Main");
    });

    $('.modal_close').on('click', () => {
        $('.plate_modal').toggleClass('-active');
        $('.modal.type--youtube').toggleClass('hide');
        $('.modal_box_veil').toggleClass('-hide');
        $('.modal').css('opacity', '0');
        $('.youtube--2').remove();
    });

    let pcSwiperPage, mobileSwiperPage;

    function tabletTouchMove(swiper) {
        return (e) => handleSmallHeight(swiper, e);
    }

    function pcTouchMove(swiper) {
        return (e) => {
            if ($(window).height() < 911) {
                handleSmallHeight(swiper, e);
            } else {
                swiper.allowTouchMove = true;
            }
        };
    }

    let pcTouchMoveHandler, tabletTouchMoveHandler, pcWheelHandler;

    function pcTouchStart(e) {
        startY = e.touches[0].clientY;
    }

    function pcWheel(swiper) {
        return e => {
            e.stopPropagation();
            const currentSlide = swiper.slides[swiper.activeIndex];
            const slideScrollTop = currentSlide.scrollTop;
            const scrollHeight = currentSlide.scrollHeight;
            const clientHeight = currentSlide.clientHeight;
            const isAtTop = slideScrollTop === 0;
            const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);
            if (swiper.realIndex === 0) {
                if (isAtBottom && e.deltaY > 0) {
                    swiper.slideTo(swiper.realIndex + 1);
                }
            } else if ([1, 2, 3, 4, 5, 6].includes(swiper.realIndex)) {
                if (isAtTop && e.deltaY < 0) {
                    swiper.slideTo(swiper.realIndex - 1);
                } else if (isAtBottom && e.deltaY > 0) {
                    swiper.slideTo(swiper.realIndex + 1);
                }
            } else {
                if (isAtTop && e.deltaY < 0) {
                    swiper.slideTo(swiper.realIndex - 1);
                }
            }
        };
    }

    const pcSwiper = () => {
        pcSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
            },
            loop: false,
            freeMode: false,
            noSwiping: true,
            noSwipingSelector: 'button',
            autoHeight: false,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            watchSlidesProgress: true,
            allowTouchMove: false,
            on: {
                init: (swiper) => {
                    pcTouchMoveHandler = pcTouchMove(swiper);
                    tabletTouchMoveHandler = tabletTouchMove(swiper);
                    pcWheelHandler = pcWheel(swiper);
                    $('.UNI-footer').clone().appendTo('.section_soon');
                    $('.UNI-footer')[1]?.remove();
                    $('.UNI-footer').css('z-index', 100).css('position', 'absolute').css('width', '100%').css('height', 80);

                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                        swiper.slides.forEach(slide => {
                            slide.scrollTop = 0;
                        })
                    });
                    $('.UNI-footer').css('display', 'none');

                    document.querySelectorAll('.swiper-slide-page').forEach(node => {
                        if (node.children[0].classList.contains("section_spec")) {
                            if ($(window).width() <= 1280) {
                                node.addEventListener('touchmove', tabletTouchMoveHandler, { passive: true });
                            }
                        }

                        node.addEventListener('wheel', pcWheelHandler, { passive: true });

                        if (!node.children[0].classList.contains("section_spec")) {
                            node.addEventListener('touchmove', pcTouchMoveHandler, { passive: true });
                        }

                        node.addEventListener('touchstart', pcTouchStart, { passive: true });
                    });
                },
                slideChange: (swiper) => {
                    ['active', 'point'].forEach(cl => ['.depth_1', '.depth_2'].forEach(ele => $(ele).removeClass(cl)));
                    $('.swiper-slide-page').off('scroll');
                    $('.swiper-slide-page').removeClass('scrollable');
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');
                    $('.swiper-slide-page')[swiper.realIndex].classList.add('scrollable');
                    $('.depth_1')[swiper.realIndex].classList.add('active');
                    $('.depth_1')[swiper.realIndex].classList.add('point');
                    
                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if (swiper.realIndex === 5) {
                        $('.UNI-footer').css('display', 'block');
                    }
                },
            }
        });

        $('.swiper-slide-page')[0].classList.add('scrollable');
        pcSwiperPage.slideTo(0);
        $('.depth_1')[0].classList.add('active');
        $('.depth_1')[0].classList.add('point');

        for (let i = 0; i < 8; i++) {
            addPageClick(i, pcSwiperPage);
        }
    };

    const mobileSwiper = () => {
        mobileSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            slidesPerView: "auto",
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
                enabled: true,
            },
            loop: false,
            freeMode: {
                enabled: true,
                sticky: false,
                momentumBounce: false,
            },
            autoHeight: true,
            speed: 0,
            passiveListeners: true,
            allowTouchMove: true,
            on: {
                init: (swiper) => {
                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                    });

                    $('.UNI-footer').css('display', 'none');
                },
                slideChange: (swiper) => {
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');
                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if (swiper.realIndex === 5) {
                        $('.UNI-footer').css('display', 'block');
                    }
                }
            }
        });
    };


    const p1video = document.getElementById("page1Video");
    const p1source = document.getElementById("video1Source");
    const p3video = document.getElementById("page3Video");
    const p3source = document.getElementById("video3Source");
    if ($(window).width() > 768) {
        p1source.src = "img/page1/p1_bg.mp4";
        p1video.load();
        p3source.src = "img/page3/p3_bg.mp4";
        p3video.load();
        $('.event_gnb').addClass('type_clear');
        $('.event_gnb').removeClass('type_default');
        pcSwiper();
    } else {
        p1source.src = "img/page1/p1_bg_m.mp4";
        p1video.load();
        p3source.src = "img/page3/p3_bg_m.mp4";
        p3video.load();
        $('.event_gnb').addClass('type_default');
        $('.event_gnb').removeClass('type_clear');
        mobileSwiper();
    }

    function updateMaxVH() {
        const root = document.documentElement;
        const newMaxVh = `${window.innerHeight}px`;
        root.style.setProperty('--maxvh', newMaxVh);
        if ($(window).width() > 768) {
            $('.event_gnb').addClass('type_clear');
            $('.event_gnb').removeClass('type_default');
            if (mobileSwiperPage) {
                mobileSwiperPage.destroy(true, true); // 銷毀 Swiper 實例
                mobileSwiperPage = null; // 重置為 null
                p1source.src = "img/page1/p1_bg.mp4";
                p1video.load();
                p3source.src = "img/page3/p3_bg.mp4";
                p3video.load();
            }

            if (pcSwiperPage) {
                pcSwiperPage.update();
            } else {
                setTimeout(() => pcSwiper());
            }
        } else {
            if (pcSwiperPage) {
                p1source.src = "img/page1/p1_bg_m.mp4";
                p1video.load();
                p3source.src = "img/page3/p3_bg_m.mp4";
                p3video.load();
                pcSwiperPage.destroy(true, true); // 銷毀 Swiper 實例
                pcSwiperPage = null; // 重置為 null
                document.querySelectorAll('.swiper-slide-page').forEach(node => {
                    if (node.children[0].classList.contains("section_spec")) {
                        if ($(window).width() <= 1280) {
                            node.removeEventListener('touchmove', tabletTouchMoveHandler, { passive: true });
                        }
                    }

                    node.removeEventListener('wheel', pcWheelHandler, { passive: true });

                    if (!node.children[0].classList.contains("section_spec")) {
                        node.removeEventListener('touchmove', pcTouchMoveHandler, { passive: true });
                    }

                    node.removeEventListener('touchstart', pcTouchStart, { passive: true });
                });
            }

            $('.event_gnb').addClass('type_default');
            $('.event_gnb').removeClass('type_clear');
            if (mobileSwiperPage) {
                mobileSwiperPage.update();
            } else {
                setTimeout(() => mobileSwiper());
            }
        }
    }
});

const handleSmallHeight = (swiper, event) => {
    swiper.allowTouchMove = true;
    event.stopPropagation();

    const currentY = event.touches[0].clientY;
    let direction = '';
    if (currentY > startY) {
        direction = 'down';  // 向下移动
    } else if (currentY < startY) {
        direction = 'up';    // 向上移动
    }

    const currentSlide = swiper.slides[swiper.activeIndex];
    const slideScrollTop = currentSlide.scrollTop;
    const scrollHeight = currentSlide.scrollHeight;
    const clientHeight = currentSlide.clientHeight;
    const isAtTop = slideScrollTop === 0;
    const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);

    if (isAtTop) {
        if (swiper.realIndex !== 0) {
            if (direction === 'down') {
                swiper.slideTo(swiper.realIndex - 1);
            }
        }
    } else if (isAtBottom) {
        if (direction === 'up') {
            swiper.slideTo(swiper.realIndex + 1);
        }
    }
};

const addPageClick = (index, swiper) => {
    $(`.page_p${index + 1}`).on('click', () => {
        swiper.slideTo(index);
    });
};

const openVideo = (video, path) => {
    $('.plate_modal').toggleClass('-active');
    $('.modal').css('opacity', '1').css('visibility', 'inherit');
    $('.modal.type--youtube').toggleClass('hide');
    $('.modal_box_veil').toggleClass('-hide');
    if (video) {
        $('.modal_source').append(
            `<iframe width="auto" height="auto" class="modal_youtube youtube--2"
        src="https://www.youtube.com/embed/${video}?si=1_stAmmA1RL7LFrt"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>`);
    } else if (path) {
        $('.modal_source').append(
            `<video class="modal_youtube youtube--2" loop autoplay playsinline controls controlslist="nodownload" preload="metadata"><source src=${path} type="video/mp4"></video>`);
    }
};

