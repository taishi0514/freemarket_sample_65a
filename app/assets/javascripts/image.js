$(document).on('turbolinks:load', function() {
  // items/newの時の処理
  if(window.location.href.match(/\/listingpage\/new/)){
    //DataTransferオブジェクトで、データを格納する箱を作る
    var dataBox = new DataTransfer();
    //querySelectorでfile_fieldを取得
    var file_field = document.querySelector('input[type=file]')
    var files_array = [];


    function buildImage(loadedImageUri,i){
      var html =
        `<div class="item" data-image-id=${i}>
            <img src="${loadedImageUri}">
            <div class="item__delete">削除</div>
        </div>`
      return html
    };

    function imageUpdate(files){
      $.each(files, function(i, file){
        //DataTransferオブジェクトに対して、fileを追加
        dataBox.items.add(file)
        //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に代入
        file_field.files = dataBox.files

        $('.item').length + 1 + i
        //FileReaderのreadAsDataURLで指定したFileオブジェクトを読み込む
        var fileReader = new FileReader();
        // fileReaderの読み込み
        fileReader.readAsDataURL(file);

        //読み込みが完了すると、srcにfileのURLを格納
        //読み込みが完了すると発火するメソッドonloadend
        fileReader.onloadend = function() {
          // result＝システム識別子を読み込む作業(画像を表示しようとしているブラウザーを読み込んで表示させる)
          var loadedImageUri = fileReader.result
          var html = buildImage(loadedImageUri,i)
          // $(html).appendTo(".listingpage-main__image__input").trigger("build");
          $(html).prependTo(".listingpage-main__image__input").trigger("build");
        };
        if(dataBox.items.length > 4){
          return false;
        };
      });
    }
    //fileが選択された時に発火するイベント
    $('.image-upload-dropfile-hidden').change(function(){
      //選択したfileのオブジェクトをpropで取得
      var files = this.files
      // 非同期てきに表示する記述
      imageUpdate(files);
    });
    

    $('.listingpage-main__image__input__box').on('dragover',function(e){
      e.preventDefault();
    });
    $('.listingpage-main__image__input__box').on('drop',function(e){
      e.preventDefault();
      var files = e.originalEvent.dataTransfer.files;
      imageUpdate(files)
    });

    $(document).on('click','.item__delete',function(){
      var index = $(".item__delete").index(this);
      var id = $(this).attr('data-image-id')
      files_array.splice(index - 1, 1);
      $(this).parent().remove();
      dataBox.items.remove(dataBox.items[id])
      file_field.files = dataBox.files
    });
  }

});