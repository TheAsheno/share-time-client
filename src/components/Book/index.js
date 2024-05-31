export function initTimeline() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('item-animate');
                setTimeout(function() {
                    document.querySelectorAll('body .animate-box.item-animate').forEach((el, k) => {
                        setTimeout(function() {
                            var effect = el.dataset.animateEffect;
                            if (effect === 'fadeIn') {
                                el.classList.add('fadeIn', 'animated');
                            } else if (effect === 'fadeInLeft') {
                                el.classList.add('fadeInLeft', 'animated');
                            } else if (effect === 'fadeInRight') {
                                el.classList.add('fadeInRight', 'animated');
                            } else {
                                el.classList.add('fadeInUp', 'animated');
                            }

                            el.classList.remove('item-animate');
                        }, k * 200);
                    });
                }, 100);
            }
        });
    }, {
        threshold: 0.85
    });

    document.querySelectorAll('.animate-box').forEach((el) => {
        observer.observe(el);
    });
}