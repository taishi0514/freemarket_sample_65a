$(function(){
  //DataTransferオブジェクトで、データを格納する箱を作る
  var dataBox = new DataTransfer();
  //querySelectorでfile_fieldを取得
  var file_field = document.querySelector('input[type=file]')
  //fileが選択された時に発火するイベント
  $('.listingpage-main__image__input__box').change(function(){
    //アップロード情報を取得して変数に格納
    var file = $('input[type="file"]').prop('files')[0];
    //FileReaderのreadAsDataURLで指定したFileオブジェクトを読み込む
    var fileReader = new FileReader();
    //読み込みが完了すると、srcにfileのURLを格納
    fileReader.onloadend = function() {
      var src = fileReader.result
      var html= `<div class='item' data-image="${file.name}">
                  <img src=${src}>
                  <hr>
                  <div class='item__delete'>削除</div>
                </div>`
      //image_box__container要素の前にhtmlを差し込む
      $('.listingpage-main__image__input__box').before(html);
    }
    fileReader.readAsDataURL(file);
  });


  $(document).on("click", '.item__delete', function(){

    //プレビュー要素を取得
    var target_image = $(this).parent()
    //プレビューを削除
    target_image.remove();
    //inputタグに入ったファイルを削除
  })

});

