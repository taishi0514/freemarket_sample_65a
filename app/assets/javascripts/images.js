// $(function(){

//     $('.listingpage-main__image__input__box').change(function(){
//         var file = $('input[type="file"]').prop('files')[0];
//         var fileReader = new FileReader();

//         fileReader.onloadend = function() {
//             var src = fileReader.result
//             var html = `<div class= 'item' data-image="${file.name}">
//                          <img src=${src}>
//                          <hr>
//                         <div class= 'item_delete'>削除</div>
//                         </div>`
//             $('listingpage-main__image__input__box').before(html);             
//         }
//         fileReader.readAsDataURL(file);
//     });


//     $(document).on("click", 'item_delete',  function(){

//         var target_image = $(this).parent()

//         target_image.remove();
//     })
// });


$(document).on('click', '.image-preview_btn_delete', function(){
    var append_input = $(`<li>`)
})