$(function() {

    let scroll = $(this).scrollTop(),
        heightIntro = $('.intro').outerHeight(),
        heightHeader = $('.header').outerHeight();

        update(scroll, heightIntro, heightHeader);

    /* Tabs */
    removeTabs();

    $('#first').addClass('active');
    $('#watches').addClass('active');

    $('.section__product:nth-child(3).section__name').addClass('active');

    $('[data-tabs]').click(function(event) {
        event.preventDefault();
        let blockID = $(this).data('tabs');

        removeTabs();

        $(this).addClass('active');
        $(blockID).addClass('active');
    });

    function removeTabs() {
        $('.section__name').removeClass('active');
        $('.section__content_showcase').removeClass('active');
    }

    /* Scroll */
    $('[data-scroll]').click(function(event) {
        event.preventDefault();

        let blockID = $(this).data('scroll'),
            blockOffSet = $(blockID).offset().top;
            heightHeader = $('.header').outerHeight();


        $('html,body').animate({
            scrollTop: blockOffSet - heightHeader
        }, 700);
    })

    /* Fixed Header*/
    $(window).scroll(function(event) {
        scroll = $(this).scrollTop();
        heightIntro = $('.intro').outerHeight();

        update(scroll, heightIntro, heightHeader);
    });

    function update(scroll, heightIntro, heightHeader) {
        if (scroll > heightHeader) {
            $('.header').css('opacity','0');
        } else if (scroll <= heightHeader) {
            $('.header').css('opacity','1');
            $('.header').removeClass('fixed');
        }

        if (scroll >= (heightIntro - heightHeader)) {
            $('.header').css('opacity','1');
            $('.header').addClass('fixed');
            $('.button__return').addClass('active');
        } else if (scroll < (heightIntro - heightHeader)) {
             $('.header.fixed').css('opacity','0');
             $('.button__return').removeClass('active');
        }
    }

    /* Arrow Return */
    $('.arrow__return').click(function(event) {
        event.preventDefault();

        $('html,body').animate({
            scrollTop: 0,
        }, 700);
    });

    /* Line-Scroll */
    $(window).scroll(function(event) {
        event.preventDefault();

        checkLineWidth();
    });

    function checkLineWidth(params) {
        let heightIntro = $('.intro').outerHeight(),
            scroll = $(this).scrollTop(),
            heightFull = $(document).outerHeight(true) - heightIntro,
            lineScrollWidth = (scroll / heightFull) * 100;

            if (scroll >= heightIntro) {

                $('.line__scroll').css({
                    width: lineScrollWidth + '%'
                });
            }
    }

    checkLineWidth();

    /* Arrow Scroll */
    $('.intro__arrow').click(function(event) {
        event.preventDefault();

        let blockOffSetAbout = $('#arrives').offset().top,
        heightHeader = $('.header').outerHeight();

        $('html,body').animate({
            scrollTop: blockOffSetAbout - heightHeader / 2
        }, 700);
    });

    /* Select */
    $('.search__select').each(function() {
        const _this = $(this),
            selectOption = _this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            duration = 450; // длительность анимации 

        _this.hide();
        _this.wrap('<div class="select"></div>');
        $('<div>', {
            class: 'new-select',
            text: _this.children('option:disabled').text()
        }).insertAfter(_this);

        const selectHead = _this.next('.new-select');
        $('<div>', {
            class: 'new-select__list'
        }).insertAfter(selectHead);

        const selectList = selectHead.next('.new-select__list');
        for (let i = 1; i < selectOptionLength; i++) {
            $('<div>', {
                class: 'new-select__item',
                html: $('<span>', {
                    text: selectOption.eq(i).text()
                })
            })
            .attr('data-value', selectOption.eq(i).val())
            .appendTo(selectList);
        }

        const selectItem = selectList.find('.new-select__item');
        selectList.slideUp(0);
        selectHead.on('click', function() {
            if ( !$(this).hasClass('on') ) {
                $(this).addClass('on');
                selectList.slideDown(duration);

                selectItem.on('click', function() {
                    let chooseItem = $(this).data('value');

                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectHead.text( $(this).find('span').text() );

                    selectList.slideUp(duration);
                    selectHead.removeClass('on');
                });

            } else {
                $(this).removeClass('on');
                selectList.slideUp(duration);
            }
        });
    });
});