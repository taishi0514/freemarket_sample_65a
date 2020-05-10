$(document).on('turbolinks:load', function() {
  // items/newの時の処理
  if(window.location.href.match(/\/items\/new/)){
    //DataTransferオブジェクトで、データを格納する箱を作る
    var dataBox = new DataTransfer();
    //querySelectorでfile_fieldを取得
    var file_field = document.querySelector('input[type=file]')
    var files_array = [];

    function buildImage(loadedImageUri,i){
      var html =
        `<li class="item-image-container__unit--preview" data-image-id=${i}>
          <div class="item-image-container__unit--caption">
            <img src="${loadedImageUri}">
          </div>
          <div class="image-option">
            <div class="image-option__list">
              <div class="image-option__list--delete">削除</div>
            </div>
          </div>
        </li>`
      return html
    };

    function imageUpdate(files){
      $.each(files, function(i, file){
        //DataTransferオブジェクトに対して、fileを追加
        dataBox.items.add(file)
        //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に代入
        file_field.files = dataBox.files
        $('.item-image-container__unit--preview').length + 1 + i
        //FileReaderのreadAsDataURLで指定したFileオブジェクトを読み込む
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        //読み込みが完了すると、srcにfileのURLを格納
        fileReader.onloadend = function() {
          var loadedImageUri = fileReader.result
          var html = buildImage(loadedImageUri,i)
          $(html).appendTo(".item-image-container__unit ul").trigger("build");
        };
        if(dataBox.items.length > 4){
          return false;
        };
      });
    }
    //fileが選択された時に発火するイベント
    $('.listingpage-main__image__input__box').change(function(){
      //選択したfileのオブジェクトをpropで取得
      var files = this.files
      imageUpdate(files);
      $('.listingpage-main__image__input__box__text').css('display','none');
      $('#click-delete').css('display','none');
    });

    $('.item-image-container__unit--guide').on('dragover',function(e){
      e.preventDefault();
    });
    $('.item-image-container__unit--guide').on('drop',function(e){
      e.preventDefault();
      var files = e.originalEvent.dataTransfer.files;
      imageUpdate(files)
      $('#d-d-delete').css('display','none')
      $('#click-delete').css('display','none');
    });

    $(document).on('click','.image-option__list--delete',function(){
      var index = $(".image-option__list--delete").index(this);
      var id = $(this).parent().parent().parent().attr('data-image-id')
      files_array.splice(index - 1, 1);
      $(this).parent().parent().parent().remove();
      dataBox.items.remove(dataBox.items[id])
      file_field.files = dataBox.files
      if(dataBox.items.length == 0){
        $('#d-d-delete').css('display','block')
        $('#click-delete').css('display','block');
      }
    });
  }
});