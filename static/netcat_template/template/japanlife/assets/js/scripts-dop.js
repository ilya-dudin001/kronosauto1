function number_format(number, decimals, dec_point, thousands_point) {

    if (number == null || !isFinite(number)) {
        throw new TypeError("number is not valid");
    }

    if (!decimals) {
        var len = number.toString().split('.').length;
        decimals = len > 1 ? len : 0;
    }

    if (!dec_point) {
        dec_point = '.';
    }

    if (!thousands_point) {
        thousands_point = ',';
    }

    number = parseFloat(number).toFixed(decimals);

    number = number.replace(".", dec_point);

    var splitNum = number.split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    number = splitNum.join(dec_point);

    return number;
}

function calc_raspil() {
    const type = $('input[name="type_vvoz"]:checked').val();

    $('.calcResult').show();

    const carPrice = $('#js-price').val(),
        ZatratyJPN = $('#js-price').data('zatraty'),
        dollar = $('#js-price').data('curs1'),
        yen = $('#js-price').data('curs'),
        typeAuto = $('select[name="type_auto"]'),
        Freight = typeAuto.children('option:selected').data('freight'),
        Comission = typeAuto.children('option:selected').data('comission'),
        Custom = typeAuto.children('option:selected').data('custom'),
        Service = typeAuto.children('option:selected').data('service'),
        Export = typeAuto.children('option:selected').data('export');

    const carPriceRub = Math.round(parseFloat(parseInt(carPrice) * parseFloat(yen)) / 100) * 100,
        ZatratyRUB = Math.round(parseFloat(parseInt(ZatratyJPN) * parseFloat(yen)) / 100) * 100,
        FreightRUB = Math.round(parseFloat(parseInt(Freight) * parseFloat(yen)) / 100) * 100,
        ComissionRUB = Math.round(parseFloat(parseInt(Comission) * parseFloat(yen)) / 100) * 100,
        CustomRUB = Math.round(parseFloat(parseInt(Custom) * parseFloat(dollar)) / 100) * 100;

    const total = Math.round(parseFloat(carPriceRub + ZatratyRUB + FreightRUB + ComissionRUB + CustomRUB + parseInt(Service) + parseInt(Export)) / 100) * 100;

    $('.calcPrice').html(number_format(carPrice, 0, '.', ' ') + ' ¥');
    $('.Zatraty').html(number_format(ZatratyJPN, 0, '.', ' ') + ' ¥');
    $('.Freight').html(number_format(Freight, 0, '.', ' ') + ' ¥');
    $('.Comission').html(number_format(Comission, 0, '.', ' ') + ' ¥');
    $('.taxPrice').html(number_format(Custom, 0, '.', ' ') + ' $');
    $('.Service').html(number_format(Service, 0, '.', ' ') + ' ₽');
    $('.Export').html(number_format(Export, 0, '.', ' ') + ' ₽');

    $('.calcPrice_RUB').html(number_format(carPriceRub, 0, '.', ' ') + ' ₽');
    $('.Zatraty_RUB').html(number_format(ZatratyRUB, 0, '.', ' ') + ' ₽');
    $('.Freight_RUB').html(number_format(FreightRUB, 0, '.', ' ') + ' ₽');
    $('.Comission_RUB').html(number_format(ComissionRUB, 0, '.', ' ') + ' ₽');
    $('.taxPrice_RUB').html(number_format(CustomRUB, 0, '.', ' ') + ' ₽');


    $('.total_calc_cont').html(number_format(total, 0, '.', ' ') + ' ₽');

    if (type == 'Конструктор') {
        $('.sborka_tr').show();
        $('.vivoz_tr').hide();
    } else {
        $('.sborka_tr').hide();
        $('.vivoz_tr').show();
    }

}

$(document).ready(function () {
    var xhr_action_turbo;

    function action_turbo(res_url, res_data, result, append = false) {

        if (xhr_action_turbo) xhr_action_turbo.abort();

        xhr_action_turbo = $.ajax({
            url: res_url,
            type: 'GET',
            data: 'isNaked=1' + res_data,
            success: function (data) {
                if (data) {
                    if (append) {
                        $(result).append(data);
                    } else {
                        $(result).html(data);
                    }
                }
            }
        });
    }

    function loadPopularAutoOnFilter_v2(append = false) {
        var blockPopular = $('.blockPopular'),
            params = "&" + blockPopular.find('form').serialize(),
            model_f = $('[name="model_f"]').val();
        if (model_f == 'all') {
            var result_cont = '.listAuto_v2';
        } else {
            var result_cont = '.listAuto_v2 .popular__row';
        }
        if (append) {
            action_turbo(blockPopular.find('form').attr('action'), params + '&append=1', result_cont);
        } else {
            action_turbo(blockPopular.find('form').attr('action'), params, result_cont);
        }
    }


    function get_marka(e) {
        //const Marka = $(this).val();
        let Marka = $('#kor-car-brand').val();
        const Model = $('#kor-car-model');

        $.ajax({
            type: "GET",
            url: "/avto/",
            data: {isNaked: 1, Marka: Marka},
            beforeSend: function () {
                $('#kor-car-model').attr('disabled', true);
            },
            success: function (response) {
                // $('#kor-car-model').html(data);
                Model.attr('disabled', true);
                Model.html('<option value="" selected>Все</option>');
                $.each(response, function (key, value) {
                    const modelOption = $('<option>' + value + '</option>');
                    Model.append(modelOption);
                });
            },
            complete: function () {
                $('#kor-car-model').attr('disabled', false);
            }
        });
    }


    $(document).on('change', '#kor-car-brand', function (e) {
        get_marka();
    });

    $(document).on('change', '#kor-car-model', function () {
        const Marka = $('#kor-car-brand').val(),
            Model = $(this).val();

        $.ajax({
            type: "GET",
            url: "/netcat/modules/default/filter_carean_auto.php",
            data: {isNaked: 1, action: 'get_kuzov', marka: Marka, model: Model},
            beforeSend: function () {
                $('#kuzov').attr('disabled', true);
            },
            success: function (data) {
                $('#kuzov').html(data);
            },
            complete: function () {
                $('#kuzov').attr('disabled', false);
            }
        });
    });


    $(document).on('change', '#car-brand', function () {
        const Marka = $(this).val();

        $.ajax({
            type: "GET",
            url: "/netcat/modules/default/",
            data: {isNaked: 1, action: 'get_models', marka: Marka},
            beforeSend: function () {
                $('#car-model').attr('disabled', true);
            },
            success: function (data) {
                $('#car-model').html(data);
            },
            complete: function () {
                $('#car-model').attr('disabled', false);
            }
        });
    });

    $(document).on('change', 'input[name="type_vvoz"]', function () {
        const type = $('input[name="type_vvoz"]:checked').val();

        $('select[name="type_auto"]').html('');
        if (type == 'Конструктор') {
            $.each(Constr, function (index, item) {
                const type_opt = $('<option data-Custom="' + item.Custom + '" data-Freight="' + item.Freight + '" data-Comission="' + item.Comission + '" data-Service="' + item.Service + '" data-Export="' + item.Export + '">' + item.Name + '</option>');
                $('select[name="type_auto"]').append(type_opt);
            });
        } else {
            $.each(Raspil, function (index, item) {
                const type_opt = $('<option data-Custom="' + item.Custom + '" data-Freight="' + item.Freight + '" data-Comission="' + item.Comission + '" data-Service="' + item.Service + '" data-Export="' + item.Export + '">' + item.Name + '</option>');
                $('select[name="type_auto"]').append(type_opt);
            });
        }

        $('select[name="type_auto"]').prop("selectedIndex", 0);
    });

    $('input[name="type_vvoz"]').trigger('change');

    $(".add_compare").click(function () {
        var action = $(this).data("action");
        if (action == 'add') {
            var rec = $(this).data('rec');
            var recs = $.cookie('recs2');
            //console.log(rec + "" + recs);
            if (recs) {
                recs = JSON.parse(recs);
                if (recs.indexOf(rec) < 0) {
                    recs.push(rec);
                }
            } else {
                recs = [rec];
            }
            $.cookie('recs2', JSON.stringify(recs), {expires: 30, path: '/'});
            $(this).html("Сравнить");
            $(this).data("action", "link");
        } else {
            $(location).attr('href', "/katalog-komplektatsiy/?compare=1");
        }
    });

    $(".del_compare").click(function () {
        var rec = $(this).data('rec');
        var recs = $.cookie('recs2');
        if (recs) {
            recs = JSON.parse(recs);
            var i = recs.indexOf(rec);
            if (recs.indexOf(rec) >= 0) {
                recs.splice(recs.indexOf(rec), 1);
            }
        }
        if (recs.length <= 0) {
            document.location.href = "/katalog-komplektatsiy/";
        }
        $.cookie('recs2', JSON.stringify(recs), {expires: 30, path: '/'});
        $(".rec" + rec).hide(30);
    });

    $(document).on('change', '#stat-brand', function () {
        const Marka = $(this).val();

        $.ajax({
            type: "GET",
            url: "/netcat/modules/default/",
            data: {isNaked: 1, action: 'get_models', marka: Marka},
            beforeSend: function () {
                $('#stat-model').attr('disabled', true);
            },
            success: function (data) {
                $('#stat-model').html(data);
            },
            complete: function () {
                $('#stat-model').attr('disabled', false);
            }
        });
    });

    $(document).on('submit', '#filterAutoInMainForm', function () {
        AjaxForm('.ajax_result', 'filterAutoInMainForm', '&go=1');
        return false;
    });

    $(document).on('click', '.filter-nav__item', function () {
        var type = $(this).attr('typename');
        $('[name="model_f"]').val('all');
        $('[name="type"]').val(type).change();
        $('.filter-nav__item').removeClass('active');
        $(this).addClass('active');

        return false;
    });

    $(document).on('keyup', '#catalog-podbor-form input.upd', function () {
        $(this).closest('#catalog-podbor-form').find('[name="marka"]').val('all');
        loadPopularAutoOnFilter_v2();
    });
    $(document).on('change', '#catalog-podbor-form input.upd', function () {
        $(this).closest('#catalog-podbor-form').find('[name="marka"]').val('all');
        loadPopularAutoOnFilter_v2();
    });
    $(document).on('click', '#catalog-podbor-form input.upd', function () {
        $(this).closest('#catalog-podbor-form').find('[name="marka"]').val('all');
        loadPopularAutoOnFilter_v2();
    });

    $(document).on('click', '.listAuto_v2 .showMoreAuto', function () {
        loadPopularAutoOnFilter_v2(true);
    });

    $(document).on('click', '.showMoreAuto', function () {
        count_page = $(this).closest('.blockPopular').attr('count_page');
        curTab = $(this).closest('.blockPopular').find('.type_auto_list.active');
        loadPopularAutoOnFilter($(this).closest('.blockPopular'), true);
        ost = curTab.attr('totalrows') - count_page;
        if (ost < 0) {
            ost = 0;
        }
        curTab.attr('totalrows', ost);
        if (ost > count_page) {
            ost = count_page;
        }
        if (ost > 0 && 1 == 2) {
            $(this).find('span').html('РџРѕРєР°Р·Р°С‚СЊ РµС‰С‘ ' + ost + ' ' + sklonenie(ost, ['РјРѕРґРµР»СЊ', 'РјРѕРґРµР»Рё', 'РјРѕРґРµР»РµР№']));
            $(this).show();
            curTab.attr('page', parseInt(curTab.attr('page')) + 1);
        } else {
            $(this).hide();
        }

        return false;
    });

    $(document).on('submit', '#formstatfilter', function () {
        $('#formstatfilter select, #formstatfilter input').each(function (e) {
            if (!$(this).val()) {
                $(this).prop('disabled', true);
            }
        });

        //$("#price_from").val($("#price_from").val().replace(/[^0-9.]/g, ''));
        //$("#price_to").val($("#price_to").val().replace(/[^0-9.]/g, ''));

    });

    $(document).on('submit', '#korea-auto-filter', function () {
        $('#korea-auto-filter select, #korea-auto-filter input').each(function (e) {
            if (!$(this).val()) {
                $(this).prop('disabled', true);
            }
        });

        //$("#price_from").val($("#price_from").val().replace(/[^0-9.]/g, ''));
        //$("#price_to").val($("#price_to").val().replace(/[^0-9.]/g, ''));

    });

    $(document).on('change', 'select[name="sortChoice"]', function () {
        const sort = $(this).val();

        $('[name="sort"]').val(sort).change();
        $('#korea-auto-filter').submit();
    });

    $(document).on('click', '.sort__link', function () {
        const AUCTION_DATE = $(this).data('date');

        $('[name="AUCTION_DATE"]').val(AUCTION_DATE).change();
        $('#formstatfilter').submit();

        return false;
    });

    $(document).on('change', '#autoMarka', function () {
        const Marka = $(this).val(),
            Model = $('#autoModel');

        $.ajax({
            type: "GET",
            url: "/avto/",
            data: {isNaked: 1, Marka: Marka},
            beforeSend: function () {
                Model.attr('disabled', true);
                Model.html('');
            },
            success: function (response) {
                Model.html('<option value="" selected>Все</option>');
                $.each(response, function (key, value) {
                    const modelOption = $('<option>' + value + '</option>');
                    Model.append(modelOption);
                });

            },
            complete: function () {
                Model.attr('disabled', false);
            }
        });
    });

    const filterTimeout = setTimeout(filterLoad, 1000);

    function filterLoad() {
        $('.filter').removeClass('filter--loading');
    }

    $(document).on('submit', '.filter-form', function () {
        const form = $(this),
            formData = form.serializeArray();
        let query = '?',
            item_name,
            item_value;

        $.each(formData, function (index, value) {
            item_name = formData[index].name;
            item_value = formData[index].value;
            if (item_value !== '' && item_value != 0 && item_value != '0') {
                if ((item_name == 'page' && item_value == 1) || (item_name == 'sortstat' && item_value == 'AUCTION_DATE asc')) {

                } else {
                    if (query == '?') {
                        query = query + item_name + '=' + item_value;
                    } else {
                        query = query + '&' + item_name + '=' + item_value;
                    }
                }
            }
        });

        window.location.href = query;

        return false;
    });


    $(document).on('click', '.pagination__link1', function () {
        const link = $(this).data('href');
        window.location.href = link;

        return false;
    });

    $(document).on('click', '.pagination__arr1 .prev_page', function (e) {
        e.preventDefault();
        let link = $(this).data('href');
        window.location.href = link;
    });


    $(document).on('click', '.type_auto_list', function () {
        $(this).closest('.blockPopular').find('.type_auto_list').removeClass('active');
        $(this).addClass('active');


        $(this).closest('.blockPopular').find('.listAuto').removeClass('active');
        if ($(this).attr('type') == 'all') {

            $(this).closest('.blockPopular').find('.list_auto_all').addClass('active');

        } else {

            $(this).closest('.blockPopular').find('.list_auto_' + $(this).attr('type')).addClass('active');
            if ($(this).attr('loaded') == '0') {
                loadPopularAutoType(this);
            }

        }
        ost = $(this).closest('.blockPopular').find('.type_auto_list.active').attr('totalrows');
        count_page = $(this).closest('.blockPopular').attr('count_page');
        if (ost > count_page) {
            ost = count_page;
        }
        if (ost > 0) {
            $(this).closest('.blockPopular').find('.showMoreAuto span').html('Показать еще ' + ost + ' ' + sklonenie(ost, ['модель', 'модели', 'моделей']));
            $(this).closest('.blockPopular').find('.showMoreAuto').show();
        } else {
            $(this).closest('.blockPopular').find('.showMoreAuto').hide();
        }

    });

    $(document).on('click', '.gnr-price-table__item', function () {
        $('.gnr-price-table__item').removeClass('active');
        $(this).addClass('active');

        $(this).find('input').prop('checked', true).trigger('change');
        ;
    });

    $(document).on('change', '.gnr-price-table__item input[name="equipment"]', function () {
        url = $(this).closest('.gnr-price-table__item').attr('href');
        action(url, '&getSost=1', '.ajaxCont54');
        set_uri(url);
    });

    $(document).on('change', '.selSostAuto input[name="condition"]', function () {
        url = $(this).closest('.selSostAuto').attr('href');
        action(url, '&getSost=1', '.ajaxCont54');
        set_uri(url);

    });

    function loadPopularAutoType($this, params = '') {
        parentBlock = '.cc_' + $($this).closest('.blockPopular').attr('cc');
        count_page = $($this).closest('.blockPopular').attr('count_page');

        action($($this).closest('.blockPopular').attr('ajaxUrl'), '&TypeAuto=' + $($this).attr('typename') + params + $($this).closest('.blockPopular').attr('dop_get'), parentBlock + ' .list_auto_' + $($this).attr('type'));
        $($this).attr('loaded', 1);
        ost = $($this).attr('totalrows') - count_page;
        if (ost < 0) {
            ost = 0;
        }
        $($this).attr('totalrows', ost);
    }

    setTimeout(loadImages, 100);

    var availablePrices = [
        "100000",
        "200000",
        "300000",
        "400000",
        "500000",
        "600000",
        "700000",
        "800000",
        "900000",
        "1000000",
        "1200000",
        "1400000",
        "1600000",
        "1800000",
        "2000000",
        "2500000",
        "3000000",
        "3500000",
        "4000000",
        "4500000",
        "5000000",
        "6000000",
        "7000000",
        "8000000",
        "9000000",
        "10000000"
    ];
    $("#Price_from_sug").autocomplete({
        source: availablePrices,
        minLength: 0,
        select: function (event, ui) {
            $(this).blur();
        },
        open: function (event, ui) {
            $(this).css({'border-bottom': 'none', 'border-radius': '10px 10px 0 0'});
        },
        close: function (event, ui) {
            $(this).css({'border-bottom': '1px solid #E2E8ED', 'border-radius': '10px 10px 10px 10px'});
        }
    }).focus(function () {
        $(this).autocomplete("search", '');
    });

    $("#Price_to_sug").autocomplete({
        source: availablePrices,
        minLength: 0,
        select: function (event, ui) {
            $(this).blur();
        },
        open: function (event, ui) {
            $(this).css({'border-bottom': 'none', 'border-radius': '10px 10px 0 0'});
        },
        close: function (event, ui) {
            $(this).css({'border-bottom': '1px solid #E2E8ED', 'border-radius': '10px 10px 10px 10px'});
        }
    }).focus(function () {
        $(this).autocomplete("search", '');
    });


    if ($('.shortcode .shortcode__slider').length > 0) {
        $('.shortcode .shortcode__slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            prevArrow:
                '<button class="prev" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="/static/netcat_template/template/japanlife/assets/img/icons/sprite.svg#arr-right"></svg></button>',
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
        });
    }

});