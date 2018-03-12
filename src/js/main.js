(function ($) {

    const moment = require('moment');

    $(document).ready(function () {

        let endpoint,
            lat = 29.7628,
            lng = -95.3831,
            unit = 'c';

        let toggleSearch = '';

        $(window).on('resize', function () {
            toggleSearch = $(window).width() >= 992 ? 'search-open' : (function () {
                $('.hlh-search--wrapper').removeClass('search-open');
                return '';
            })();
        }).resize();


        // endpoint = new YQL(`
        // select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(` +
        //   lat + `,` + lng + `) and u=` + unit + `")`)


        $('body')
            .on('click', '.hlh-search--toggle', function () {


                $('.hlh-search--wrapper').toggleClass(toggleSearch)


            })
            .on('click', '.hlh-newsletter--nav .dropdown-menu', function (e) {

                e.stopPropagation()

            })
            .on('click', '.mobile-nav--trigger', function () {

                $('body').toggleClass('nav-open')
            });

        // $('.dropdown-menu').parent().on('hide.bs.dropdown', function (e) {
        //     e.preventDefault();
        // });

        // $.ajax({
        //     method: 'GET',
        //     url: '/plugins/core/svapi',
        //     data: {
        //         "lat": 29.7628,
        //         "lng": -95.3831,
        //         "unit": "c"
        //     },
        //     success: function (res) {
        //         console.log(res);
        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // });


        (function () {
            //     $(document).on('click',
            //         '.ui-datepicker-next, .ui-datepicker-title, .ui-datepicker-prev, span.month, th.next, th.prev, th.switch, span.year',
            //         function (e) {
            //             e.stopPropagation()
            //         })
            //
            // })

            let bookingdd = $(".header_widget__rates");

            bookingdd.find('#hw-checkin, #hwmob-checkin').val(moment(new Date()).add(1, "days").format("MM/DD/YYYY"));
            bookingdd.find('#hw-checkout, #hwmob-checkout').val(moment(new Date()).add(2, "days").format("MM/DD/YYYY"));

            bookingdd.find("#hw-checkin, #hwmob-checkin").datepicker({
                minDate: '0',
                onSelect: function () {
                    setTimeout(function () {
                        let sdate = bookingdd.find("#hw-checkin, #hwmob-checkin").datepicker('getDate', '+1d');
                        sdate.setDate(sdate.getDate() + 1);
                        bookingdd.find("#hw-checkout, #hwmob-checkout").datepicker('option', 'minDate', sdate);
                        bookingdd.find("#hw-checkout, #hwmob-checkout").datepicker('setDate', sdate);
                    }, 90);
                },
                beforeShow: function (input, instance) {
                    let $pickerEl = $(instance.dpDiv);

                    $pickerEl
                        .on('click', function (e) {
                            e.stopPropagation();
                        }).insertAfter($(input));
                },
                onClose: function (a, b) {

                }
            });
            bookingdd.find("#hw-checkout, #hwmob-checkout").datepicker({minDate: '+1D'});

        })();
    });

})(jQuery);