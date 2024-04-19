$(document).ready(function () {


    //Кнопка Раскрыть/Скрыть у описания Авто в наличии
    $('.car-desc .more_but').on('click', function () {
        $(this).closest('.car-desc').toggleClass('open');
        if ($(this).closest('.car-desc').hasClass('open')) $(this).find("span").text('Скрыть');
        else $(this).find("span").text('Раскрыть');
    });

    //Выбор галерей в карточке Авто в наличии
    $('.gallery_nav > div').on('click', function () {
        $('.gallery_nav > div').removeClass('active');
        $(this).addClass('active');
        $('.gallery').hide();
        if ($(this).hasClass('nav_0')) $('.gallery.gal_0').show();
        if ($(this).hasClass('nav_1')) $('.gallery.gal_1').show();
        if ($(this).hasClass('nav_2')) $('.gallery.gal_2').show();
        $('.gallery__carousel').slick('refresh');
    });


    $('.gallery__item').click(function (e) {
        var uniques = {};
        $(this).attr('data-fancybox', 'gallery');
        uniques[$(this).attr('href')] = true;
        $('.gallery__item').not(this).each(function () {
            href = $(this).attr('href');
            if (!uniques[href]) {
                $(this).attr('data-fancybox', 'gallery');
                uniques[href] = true;
            } else {
                $(this).attr('data-fancybox', '');
            }
        });
    });


    $('.tooltip').tooltipster({
        animation: 'fade',
        delay: 200,
        trigger: 'custom',
        triggerOpen: {
            mouseenter: true,
            touchstart: true
        },
        triggerClose: {
            click: true,
            scroll: false,
            tap: true
        }
    });


    let screenWidth = screen.width;


    //выбор городов
    $('body').on('click', '.city-search a', function (e) {
        // e.preventDefault();
        let sub = $('.search-city').data('sub');
        let redirect = $('.search-city').data('redirect');
        let page = $('.search-city').data('url');
        let city = $(this).attr('setcity');
        let redirect_url;

        if (city) {
            action('/netcat/modules/default/', '&action=setcity&city=' + city, '.ajax_result');
            setTimeout(function () {
                if (redirect == 0) {
                    if (page.includes('/index')) page = page.replace('/index', '');
                    if (city == 'vl') redirect_url = page;
                    else redirect_url = '/' + city + page;

                    //location.replace(redirect_url);
                    history.pushState(null, null, redirect_url);
                    location.reload(true);
                } else location.reload(true);
            }, 100);
        }
    });

    //редирект на город
    function replace_city() {
        //если выключено игнорировать город в разделе
        if ($('.search-city').data('redirect') == 0) {
            let sub = $('.search-city').data('sub');
            let redirect = $('.search-city').data('redirect');
            let city = $('.search-city').data('city');
            let page = $('.search-city').data('url');
            let page2 = location.pathname;

            if (page.includes('/index')) page = page.replace('/index', '');
            redirect_url = '/' + city + page;

            if (page2 != redirect_url) {
                //location.replace(redirect_url);
            }
        }
    }

    replace_city();


    //поиск города
    $(document).on('keyup', '.ajaxFindCity', function () {
        val_old = $(this).attr('uri');
        val_norm = val_old.replaceAll('&', '***');
        action('/netcat/modules/default/', '&action=findCity&q=' + $(this).val() + "&uri=" + val_norm, '.search-city__list');
    });

    $(document).on('submit', '.search-city__form', function () {
        return false;
    });


    $(document).on('click', '.tabsDost .filter-nav__item', function (e) {
        e.preventDefault();
        $('.tabsDost .filter-nav__item').removeClass('active');
        $(this).addClass('active');
        $('.tabsDostCont').removeClass('active');
        $('.tab' + $(this).attr('tab')).addClass('active');
    });


    /*-------------------------------
    
    $('.calc-form__radio').click(function() {
        var val = $('[name="type_vvoz"]:checked').val();
        if (val == 1) {
            $('.type_auto').hide();
            $('.type_auto_rsapil').show();
        } else {
            $('.type_auto').show();
            $('.type_auto_rsapil').hide();
        }
        //console.log(val);
    });


    $(document).on('submit', '#form_calc_tax',  function(){
        var posting = 1;
        $( '#form_calc_tax input[type="text"]' ).removeClass('red');
        $( '#form_calc_tax input[type="text"]' ).each(function(){
            if( !( $(this).attr('name') == 'f_PW' && $('[name="toplivo"]:checked').val() == 'electro' ) ) {
                if( !$(this).val() ){
                    $(this).addClass('red');
                    posting = 0;
                }
            }
        });
        if( posting ){
            AjaxForm('.calc_tax_result', 'form_calc_tax');
            return false;
        }
        return false;
    });

    -----------------------------*/


    //переключение типа двс в калке пошлины
    function calc_type_auto() {
        $('.calc_poshlina .calc-form__radio.toplivo input').each(function () {
            if ($(this).is(':checked')) {
                if ($(this).val() == 'electro') {
                    $('.calc_poshlina [name="calc_eng_v"]').prop('disabled', true);
                    $('.calc_poshlina [name="calc_pw"]').prop('disabled', true);
                } else {
                    $('.calc_poshlina [name="calc_eng_v"]').attr('disabled', false);
                    $('.calc_poshlina [name="calc_pw"]').attr('disabled', false);
                }
                if ($(this).val() == 'benz' || $(this).val() == 'dizel') {
                    $('.calc_poshlina [name="calc_kwt"]').prop('disabled', true);
                } else {
                    $('.calc_poshlina [name="calc_kwt"]').attr('disabled', false);
                }
            }
        });
    }

    calc_type_auto();


    //warn text для калькулятора
    function calc_warn_auto() {
        // текущая дата и получение проходных лет
        let date = new Date();
        let prohod_3 = date.getFullYear() - 3;
        let prohod_5 = date.getFullYear() - 5;


        if ($('.calc_poshlina [name="calc_year"]').val() != prohod_3 && $('.calc_poshlina [name="calc_year"]').val() != prohod_5) $('.prohod_3 input:checkbox, .prohod_5 input:checkbox').prop('checked', false);

        if ($('.calc_poshlina [name="calc_year"]').val() == prohod_3) {
            $('.prohod_3').addClass('active');
            $('.prohod_5 input:checkbox').prop('checked', false);
        } else $('.prohod_3').removeClass('active');

        if ($('.calc_poshlina [name="calc_year"]').val() == prohod_5) {
            $('.prohod_5').addClass('active');
            $('.prohod_3 input:checkbox').prop('checked', false);
        } else $('.prohod_5').removeClass('active');
    }

    calc_warn_auto();

    function upd_calc() {
        let form_data = $('.calc_poshlina').serialize();
        $('.calc_tax_result').load('/services/calculator-poshlina/?' + form_data + ' .calc_tax_result > * ');
        //console.log(form_data);
    }

    upd_calc();

    $(document).on('change', '.calc_poshlina .calc-form__radio input, .calc_poshlina .prohod_3 input, .calc_poshlina .prohod_5 input', function (e) {
        calc_warn_auto();
        calc_type_auto();
        upd_calc();
    });

    $(document).on('input', '.calc_poshlina input[type="text"]', function (e) {
        calc_warn_auto();
        calc_type_auto();
        upd_calc();
    });
    $(document).on('click', '.calc_poshlina .calc-form__btn', function () {
        upd_calc();
    });


    $('.js-wa-button').click(function () {
        $(this).closest('form').find('.wa-input').val('1');
    });

    $('.feedback__callback').click(function () {
        $(this).closest('form').find('.wa-input').val('0');
    });

    setTimeout(function () {
        $('form.ajax-form').append('<input type="hidden" name="ash_id" value="1" />');
    }, 3000);

    // $('.ajax-form').submit(function () {
    //     var form = $(this),
    //         fid = form.attr('id'),
    //         formData = new FormData(document.getElementById(fid));
    //     console.log(formData);
    //     $.ajax({
    //         type: "POST",
    //         cache: false,
    //         processData: false,
    //         contentType: false,
    //         url: "/callback-form/",
    //         data: formData,
    //         success: function (data) {
    //             $('.js-modal').fadeOut();
    //             if (fid === 'form-review') {
    //                 $('#js-review-thanks').fadeIn();
    //             }
    //             if (fid === 'form-feedback') {
    //                 $('#js-modal-thanks').fadeIn();
    //             }
    //             if (fid === 'feedback_form') {
    //                 $('#js-modal-thanks').fadeIn();
    //             }
    //             fbq('track', 'PageView');
    //         }
    //     });
    //     return false;
    // });


    $(document).on('click', '.pagination_ajax a', function (e) {
        e.preventDefault();
        url = $(this).data('href');
        $(this).addClass('wait');
        action(url, '', $('.ajaxLoadListAuto'));
    });


    /*
      *  Select
      */
    prepareSelect();


    $(document).on('submit', '.onlineForm', function () {
        $('.onlineForm select, .onlineForm input').each(function (e) {
            if (!$(this).val()) {
                $(this).prop('disabled', true);
            }
        });

    });

    $(document).on('change', '.onlineForm .markaAuto', function () {
        marka = $(this).val();
        $('.onlineForm .modelAuto').prop('disabled', true);
        $('.onlineForm .modelAuto').val('');
        if (marka) {
            action('/netcat/modules/default/', '&action=get_models&marka=' + marka, '.onlineForm .modelAuto', 'prepareSelect');
        }

    });

    $(document).on('change', '.onlineForm .modelAuto', function () {
        let marka = $('.onlineForm .markaAuto').val();
        console.log('Model ' + $(this).val());
        table = $(this).closest('form').attr('table');
        $('#kuzov, #color, #car-rating, #fyear0, #fyear1, #fv0, #fv1').val();
        action('/netcat/modules/default/', '&action=get_kuzov&table=main&marka=' + marka + '&model=' + $(this).val(), '#kuzov', 'prepareSelect');
        action('/netcat/modules/default/', '&action=get_color&table=main&marka=' + $('select[name="marka_name"]').val() + '&model=' + $(this).val(), '#color', '#color');
        action('/netcat/modules/default/', '&action=get_rate&table=main&marka=' + $('select[name="marka_name"]').val() + '&model=' + $(this).val(), '#car-rating', '#car-rating');

        action('/netcat/modules/default/', '&action=get_year&table=main&marka=' + $('select[name="marka_name"]').val() + '&model=' + $(this).val(), '#fyear0', '#fyear0');
        action('/netcat/modules/default/', '&action=get_year&table=main&marka=' + $('select[name="marka_name"]').val() + '&model=' + $(this).val(), '#fyear1', '#fyear1');

        action('/netcat/modules/default/', '&action=get_v&table=main&marka=' + $('select[name="marka_name"]').val() + '&model=' + $(this).val(), '#fv0', '#fv0');
        action('/netcat/modules/default/', '&action=get_v&table=main&marka=' + $('select[name="marka_name"]').val() + '&model=' + $(this).val(), '#fv1', '#fv1');

    });


    /*
   * Price breakdown
   */


    $('.select2').select2({
        width: '100%',
        allowClear: true,
        "language": {
            "noResults": function () {
                return "Список пуст";
            }
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        placeholder: function () {
            $(this).data('placeholder');
        },
        "templateResult": function (data) {
            if (!data.element)
                return data.text;

            var $element = $(data.element);
            var $wrapper = $('<span></span>');
            if ($element[0].className) {
                $wrapper.addClass($element[0].className);
            }
            $wrapper.text(data.text);
            return $wrapper;
        }
    });


});


function prepareSelect() {
    $(".select").each(function () {
        const _this = $(this),
            selectOption = _this.find("option"),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(":selected"),
            duration = 450;

        let textSelect = "";

        if (_this.children("option:disabled").text().length === 0) {
            textSelect = selectedOption.text();
        } else {
            textSelect = _this.children("option:disabled").text();
        }

        _this.hide();
        _this.wrap('<div class="select"></div>');
        $("<div>", {
            class: "new-select",
            text: textSelect,
        }).insertAfter(_this);

        const selectHead = _this.next(".new-select");
        $("<div>", {
            class: "new-select__list",
        }).insertAfter(selectHead);

        if (_this.children("option:disabled").text().length === 0) {
            selectHead.addClass("selected");
        }

        const selectList = selectHead.next(".new-select__list");
        for (let i = 1; i < selectOptionLength; i++) {
            $("<div>", {
                class: "new-select__item",
                html: $("<span>", {
                    text: selectOption.eq(i).text(),
                }),
            })
                .attr("data-value", selectOption.eq(i).val())
                .appendTo(selectList);
        }

        const selectItem = selectList.find(".new-select__item");
        selectList.slideUp(0);
        selectHead.on("click", function () {
            if (!$(this).hasClass("on")) {
                $(this).addClass("on");
                selectList.slideDown(duration);

                selectItem.on("click", function () {
                    $(this)
                        .addClass("active")
                        .siblings(".new-select__item")
                        .removeClass("active");
                    let chooseItem = $(this).data("value");

                    //$("select").val(chooseItem).attr("selected", "selected");
                    $("select").each(function () {
                        console.log($(this));
                        $(this).attr('disabled', false);
                        $(this).filter('[value="' + chooseItem + '"]').attr('selected', true);
                    });
                    selectHead.text($(this).find("span").text());
                    selectHead.addClass("selected");

                    selectList.slideUp(duration);
                    selectHead.removeClass("on");


                    let triggered = _this.closest('.filter__select').find('select');
                    triggered.trigger('change');
                    console.log('change', triggered);
                });
            } else {
                $(this).removeClass("on");
                selectList.slideUp(duration);
            }

        });
    });
}

function action(res_url, res_data, result, reload = '', isNaked = '1') {
    //console.log('pagination');
    if (!jQuery(result).attr('white')) {
        jQuery(result).attr('white', '1');
        jQuery(result).addClass('white');

        if (res_url == '/auktsiony-yaponii-on-line/ajax/' || res_url == '/netcat/modules/default/' || res_url == '/newPass.php') {
            urlt = res_url;
        } else {
            urlt = GlobalCityUrl + res_url;
        }
        //console.log( urlt );
        jQuery.ajax({
            url: urlt,
            type: 'GET',
            data: 'isNaked=' + isNaked + res_data,
            success: function (data) {
                //console.log(result);
                jQuery(result).removeAttr('white');
                jQuery(result).removeClass('white');
                if (data) {
                    $('.pagination_ajax').remove();
                    jQuery(result).html(data);
                    if (reload == 'prepareSelect') {
                        prepareSelect();
                        console.log(data);
                    } else if (reload == 'reloadModels') {
                        $('.modelAuto').prop('disabled', false);
                        //$('#car-model')[0].sumo.reload();
                    } else if (reload == '#car-pokolenie') {
                        $('.sel-cont-pokolenie').removeClass('opened');
                        //init_pokolenie();
                    } else if (reload) {
                        //$(reload)[0].sumo.reload();
                    }
                    //hover_marki();
                    setTimeout(loadImages, 100);
                }
            }
        });
    }
}

function add_favorite(a) {
    title = document.title;
    url = document.location;
    try {
        // Internet Explorer
        window.external.AddFavorite(url, title);
    } catch (e) {
        try {
            // Mozilla
            window.sidebar.addPanel(title, url, "");
        } catch (e) {
            // Opera
            if (typeof (opera) == "object") {
                a.rel = "sidebar";
                a.title = title;
                a.url = url;
                return true;
            } else {
                // Unknown
                alert('Нажмите Ctrl-D чтобы добавить страницу в закладки');
            }
        }
    }
    return false;
}

function loadImages(attrSrc = 'data-src') {
    [].forEach.call(document.querySelectorAll('img[' + attrSrc + ']'), function (img) {
        img.setAttribute('src', img.getAttribute(attrSrc));
        img.onload = function () {
            img.removeAttribute(attrSrc);
        };
    });
}

function copyToClipboard() {
    var copytext = document.createElement('input');
    copytext.value = window.location.href;
    document.body.appendChild(copytext);
    copytext.select();
    document.execCommand('copy');
    document.body.removeChild(copytext);
    return false;
}

function AjaxForm(result_id, form_id, dop_get = '') {
    if (!jQuery("#" + form_id).attr('white')) {
        jQuery("#" + form_id).attr('white', '1');

        jQuery.ajax({
            url: jQuery("#" + form_id).attr('action'),
            type: jQuery("#" + form_id).attr('method'),
            dataType: 'html',
            data: jQuery("#" + form_id).serialize() + '&isNaked=1' + dop_get,
            success: function (response) {
                jQuery(result_id).html(response);
                jQuery("#" + form_id).removeAttr('white');
            },
            error: function (response) {
                jQuery("#" + form_id).removeAttr('white');
            }
        });

        jQuery(result_id).html('<div class="load"><div class="loading"></div></div>');
    }
    return false;
}

function get_calc_ajax(el, detailpage = false, button = false) {
    if ($(el).attr('typeload') == 'ajax' || detailpage) {
        $(el).attr('typeload', '');
        params = '&onlyauth=' + $(el).data('onlyauth') + '&action=get_calc_ajax&f_AUCTION=' + $(el).data('auction') + '&f_MARKA_NAME=' + $(el).data('marka') + '&f_MODEL_NAME=' + $(el).data('model') + '&type=' + $(el).data('type') + '&kuzov=' + $(el).data('kuzov') + '&f_FINISH=' + $(el).data('finish') + '&f_YEAR=' + $(el).data('year') + '&f_ENG_V=' + $(el).data('engv') + '&f_PW=' + $(el).data('pw') + '&podpiska=' + $(el).data('podpiska') + '&uslugi_podpiska=' + $(el).data('uslugi_podpiska');
        if (detailpage) {
            params += '&detail=1';
        }
        if (button) {
            params += '&button=1';
        }
        action('/netcat/modules/default/', params, '.calc_ajax_result_' + $(el).data('message'), $(el).find('.price-breakdown'));
    }
}


//Оглавление для Новостей и статей
$('.article__nav').html('');
let article_titles = 0;
$('.article__text h2, .article__text h3').each(function (i) {
    let text = $(this).text();
    $(this).attr('id', 'anchor' + i);
    $('.article__nav').append("<li><a class='article__anchor' href='#anchor" + i + "'>" + text + "</a></li>");

    article_titles++;
});

if (article_titles == 0) {
    $('.article__nav').hide();
}


//добавление в закладки в Новостях и статьях
function bookmark(title, url) {
    if (document.all) window.external.addFavorite(url, title);
    if (window.sidebar) {
        // Firefox
        window.sidebar.addPanel(title, url, '');
    } else if (window.opera && window.print) {
        // Opera
        var elem = document.createElement('a');
        elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click(); //this.title=document.title;
    } else if (document.all) {
        // ie
        window.external.AddFavorite(url, title);
    }

}

$('.bookmark').attr('rel', 'sidebar').attr('title', document.title);

$(document).on('click', '.bookmark', function (e) {
    e.preventDefault();
    let url = window.location.href;
    let title = $('head title').text();
    if (url && title) bookmark(title, url);
});





