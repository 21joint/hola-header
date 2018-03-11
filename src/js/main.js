(function ($) {


    $(document).ready(function () {

        let endpoint,
            lat = 29.7628,
            lng = -95.3831,
            unit = 'c';


        // endpoint = new YQL(`
        // select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(` +
        //   lat + `,` + lng + `) and u=` + unit + `")`)

        console.log(endpoint)

        $('body').on('click', '.hlh-search--toggle', function () {


            $('.hlh-search--wrapper').toggleClass('search-open')


        }).on('click', '.hlh-newsletter--nav .dropdown-menu', function (e) {

            e.stopPropagation()

        }).on('click', '.navbar-toggler', function () {

            $('body').toggleClass('nav-open')
        })

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

        $(function () {
            $(document).on('click',
                '.ui-datepicker-next, .ui-datepicker-title, .ui-datepicker-prev, span.month, th.next, th.prev, th.switch, span.year',
                function (e) {
                    e.stopPropagation()
                })

        })

    })

})(require('jquery'))