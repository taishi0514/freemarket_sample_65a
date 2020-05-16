  $(document).on('turbolinks:load', function() {
  // items/n/editの時の処理
  if (window.location.href.match(/\/listingpage\/\d+\/edit/)){
    const prevContent = $('.listingpage-main__image__input__box').prev();
    function buildImage(loadedImageUri,i){
      var html =
      `<div class="item" data-image-id=${i}>
          <img src="${loadedImageUri}">
          <div class="item__delete">削除</div>
      </div>`
      return html
    };
    function gon_image(files){
      var insertHTML = '';
      $.each(files, function(i, file) {
        insertHTML += buildImage(file.src.url,i)
      });
      return insertHTML
    }
    if (typeof gon != "undefined") {
      if(gon.item_images){
        var files = gon.item_images
        var html = ``;
        html += gon_image(files)
        $(html).prependTo(".listingpage-main__image__input").trigger("build");
        var count = $('.item').length;
        setLabel(count)
      };
    };

      //ラベルのwidth・id・forの値を変更==================================================
    function setLabel(count) {
      //プレビューが5個あったらラベルを隠す
      if (count == 5) { 
        $('.listingpage-main__image__input__box').hide();
      } else {
        //プレビューが4個以下の場合はラベルを表示
        $('.listingpage-main__image__input__box').show();
        //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
        labelWidth = (620 - parseInt($(prevContent).css('width')));
        $('.listingpage-main__image__input__box').css('width', labelWidth);
        $('.listingpage-main__image__input__box').attr({for: `product_images_attributes_${count}_src`});
      }
    }
    // プレビューの追加
    $(document).on('change', '.hidden-field', function() {
      //hidden-fieldのidの数値のみ取得
      // var id = $(this).attr('id').replace(/[^0-9]/g, '');
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      console.log(id)
      //選択したfileのオブジェクトを取得
      var file = this.files[0];
      var reader = new FileReader();
      //readAsDataURLで指定したFileオブジェクトを読み込む
      reader.readAsDataURL(file);
      //読み込み時に発火するイベント
      reader.onload = function() {
        var loadedImageUri = this.result;
        //プレビューが元々なかった場合はhtmlを追加
        var html = buildImage(loadedImageUri,id)
        //ラベルの直前のプレビュー群にプレビューを追加
        $(html).prependTo(".listingpage-main__image__input").trigger("build");
        //プレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す=============
        if ($(`#product_images_attributes_${id}__destroy`)){
          $(`#product_images_attributes_${id}__destroy`).prop('checked',false);
        }
        //プレビューの数を取得 
        var count = $('.item').length;
        //countに応じてラベルのwidth・forの値を変更
        setLabel(count);
      };
    });

    // 画像の削除
    $(document).on('click', '.item__delete', function() {
      var id = $(this).parent().attr('data-image-id');
      console.log(id)
      if ($(`#product_images_attributes_${id}__destroy`).length){
        $(`#product_images_attributes_${id}__destroy`).prop('checked',true);
      }
      //フォームの中身を削除 
      $(`#product_images_attributes_${id}_src`).val("");
      $(this).parent().remove();
      //プレビューの数を取得
      var count = $('.item').length;
      //countに応じてラベルのwidth・forの値を変更
      setLabel(count);
    });
  };
});