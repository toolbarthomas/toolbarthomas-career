(function (win, doc, $) {

    window.setPortfolio = function() {
        var portfolios = $('.portfolio').not('.js-portfolio--is-ready');

        if(portfolios.length === 0) {
            return;
        }

        portfolios.each(function() {

            var portfolio = $(this);
            var portfolio__block_aside =  portfolio.find('.portfolio__block--aside');
            var portfolio__item =  portfolio.find('.portfolio__item');

            if (portfolio__block_aside.length === 0 || portfolio__item.length === 0) {
                return;
            }

            win.on({
                'scroll resize load': function() {
                    translatePortfolioBlockAside(portfolio__block_aside);
                    translatePortfolioItem(portfolio__item);
                }
            });

            portfolio.addClass("js-portfolio--is-ready");
        });
    }


    function translatePortfolioBlockAside(portfolio__block_aside) {

        // portfolio__block--aside widht & height
        var aside_height = portfolio__block_aside.outerHeight();
        var aside_aside = portfolio__block_aside.outerWidth();

        // Width & height of window object
        var win_height = win.height();
        var win_width = win.width();

        // Scroll top of window object
        var scroll_top = win.scrollTop();

        // Position of the current .portfolio__block--aside element
        var position = portfolio__block_aside.position();

        // if((scroll_top + win_height) <= position.top) {
        //     console.log('in beeld');
        // }

        var start = (scroll_top + win_height) - position.top;
        var end = win_height;


        if(start < 0 || start > end) {
            return;
        }

        // Get percentage value of scroll position
        var difference_in_percentage = (start / end ) * 100;

        portfolio__block_aside.css({
            transform: "translateX(-" + (100 - difference_in_percentage) + "%)",
            opacity: (1 / 100 * difference_in_percentage)
        });

        if(difference_in_percentage === 100) {

        }
    }

    function translatePortfolioItem(portfolio__item) {
        if (typeof $.fn.visible != 'function') {
            return;
        }

        portfolio__item.each(function() {
                var timeout;
                clearTimeout(timeout);

                var portfolio__item = $(this);

                setTimeout(function() {
                    if (portfolio__item.visible(true)) {
                        portfolio__item.addClass("js-portfolio__item--is-visible");
                    } else {
                        portfolio__item.removeClass("js-portfolio__item--is-visible");
                    }
                }, 300);
            });
    }

})(window.jQuery(window), window.jQuery(document), window.jQuery);