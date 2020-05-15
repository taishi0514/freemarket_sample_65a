// $(function() {
//     const TAX = 1.10;

//     export function addConsumptionTax(price) {
//         const floatTax = price * tax
//         return Math.round(floatTax);
//     }
//     addConsumptionTax(1000);
// });

// $(function(){
//     $('.listingpage-main__price__text3__right').on('change', function(){
//         let  tax = $('.listingpage-main__price__text3__right').val();
//         $('.listingpage-main__price__text3__right').text(Math.ceil(tax * 0.1)+ "円");
//         $('.listingpage-main__price__text3__right').text(Math.ceil(tax - (tax * 0.1)) + "円");
//     });
// });

// $('.listingpage-main__price__text2__right').on('keyup', function(e){
//     e.preventDefault();
//     var price = $('.listingpage-main__price__text2__right').val()
//     if( 300 <= price && price <= 99999999) {
//         var num = Math.floor(price / 10);

//     }
// })


$(function(){
    $('.listingpage-main__price__text3__right2').html('---');
    $('.listingpage-main__price__text3__right').html('---');
    $('#price-calc').on('input', function(){
        var data = $('#price-calc').val();
        var profit = Math.round(data * 0.9)
        var fee = (data - profit)
        $('.listingpage-main__price__text3__right').html(fee)
        $('.listingpage-main__price__text3__right').prepend('¥')
        $('.listingpage-main__price__text3__right2').html(profit)
        $('.listingpage-main__price__text3__right2').prepend('¥')
        if(profit == '') {
        $('.listingpage-main__price__text3__right2').html('---');
        $('.listingpage-main__price__text3__right').html('---');
        }
    })
})