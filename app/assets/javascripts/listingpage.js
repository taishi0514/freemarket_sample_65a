$(document).on('turbolinks:load', function() {
  // items/n/editの時の処理
  if (window.location.href.match(/\/items\/\d+\/edit/)){
    const prevContent = $('.item-image-container__unit--guide').prev();
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
    function gon_image(files){
      var insertHTML = '';
      $.each(files, function(i, file) {
        insertHTML += buildImage(file.image.url,i)
      });
      return insertHTML
    }
    if (typeof gon != "undefined") {
      if(gon.item_images){
        var files = gon.item_images
        var html = ``;
        html += gon_image(files)
        $(".item-image-container__unit ul").append(html).trigger("build");
        var count = $('.item-image-container__unit--preview').length;
        setLabel(count)
      };
    };

      //ラベルのwidth・id・forの値を変更==================================================
    function setLabel(count) {
      //プレビューが5個あったらラベルを隠す
      if (count == 5) { 
        $('.item-image-container__unit--guide').hide();
      } else {
        //プレビューが4個以下の場合はラベルを表示
        $('.item-image-container__unit--guide').show();
        //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
        labelWidth = (620 - parseInt($(prevContent).css('width')));
        $('.item-image-container__unit--guide').css('width', labelWidth);
        //forの値を変更
        $('.label-box').attr({for: `item_item_images_attributes_${count}_image`});
      }
    }
    // プレビューの追加
    $(document).on('change', '.hidden-field', function() {
      //hidden-fieldのidの数値のみ取得
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
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
        $(".item-image-container__unit ul").append(html).trigger("build");
        //プレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す=============
        if ($(`#item_item_images_attributes_${id}__destroy`)){
          $(`#item_item_images_attributes_${id}__destroy`).prop('checked',false);
        }
        //プレビューの数を取得 
        var count = $('.item-image-container__unit--preview').length;
        //countに応じてラベルのwidth・forの値を変更
        setLabel(count);
      };
    });

    // 画像の削除
    $(document).on('click', '.image-option__list--delete', function() {
      var id = $(this).parent().parent().parent().attr('data-image-id')
      if ($(`#item_item_images_attributes_${id}__destroy`).length){
        $(`#item_item_images_attributes_${id}__destroy`).prop('checked',true);
      }
      //フォームの中身を削除 
      $(`#item_item_images_attributes_${id}_image`).val("");
      $(this).parent().parent().parent().remove();
      //プレビューの数を取得
      var count = $('.item-image-container__unit--preview').length;
      //countに応じてラベルのwidth・forの値を変更
      setLabel(count);
    });
  };

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
    $('.image-upload-dropfile-hidden').change(function(){
      //選択したfileのオブジェクトをpropで取得
      var files = this.files
      imageUpdate(files);
      $('#d-d-delete').css('display','none');
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

  //ここからカテゴリの段階的表示機能
  function buildHTML(result){
    var html =
      `<option value= ${result.id}>${result.name}</option>`
    return html
  }

  $("#parent").on("change",function(){
    var str = document.getElementById("parent").value
    if(str == 0){
      $('#child').remove();
      $('#item_category_id').remove();
      $('.items-second__head--fourth').css('display','none');
      $("#item_product_size_id").remove();
    }else{
      $.ajax({
        url: "/api/categories",
        type: 'GET',
        dataType: 'json',
        data: {id: str}
      })
      .done(function(categories) {
        var insertHTML = `<select name="child" id="child">
                          <option value=0>---</option>`;
        $.each(categories, function(i, category) {
          insertHTML += buildHTML(category)
        });
        insertHTML += `</select>`
        if($('#child').length){
          $('#child').replaceWith(insertHTML);
          $('#item_category_id').remove();
          $('#item_product_size_id').remove();
          $('.items-second__head--fourth').css('display','block');
        } else {
          $('.items-second__head--second').append(insertHTML);
        };
      })
      .fail(function(){
        alert("サーバとの通信に失敗しました");
      });
    };
  })

  $(document).on("change","#child",function(){
    var strparent = document.getElementById("parent").value
    var strchild = document.getElementById("child").value
    var str = strparent + '/' + strchild
    if(strchild == 0){
      $('#item_category_id').remove();
      $('.items-second__head--fourth').css('display','none');
      $("#item_product_size_id").remove();
    } else {
      $.ajax({
        url: "/api/categories",
        type: 'GET',
        dataType: 'json',
        data: {id: str}
      })
      .done(function(categories) {
        var insertHTML = `<select name="item[category_id]" id="item_category_id">
                          <option value=0>---</option>`;
        $.each(categories, function(i, category) {
          insertHTML += buildHTML(category)
        });
        insertHTML += `</select>`
        if($('#item_category_id').length){
          $('#item_category_id').replaceWith(insertHTML);
          $('#item_product_size_id').remove();
          $('.items-second__head--fourth').css('display','none');
        } else {
          $('.items-second__head--third').append(insertHTML);
        };
      })
      .fail(function() {
        alert("サーバとの通信に失敗しました");
      });
    };
  })

  $(document).on("change","#item_category_id",function(){
    var str = document.getElementById("item_category_id").value
    if(str == 0){
      $('.items-second__head--fourth').css('display','none');
      $("#item_product_size_id").remove();
    } else {
      $.ajax({
        url: "/product_sizes",
        type: 'GET',
        dataType: 'json',
        data: {id: str}
      })
      .done(function(product_sizes) {
        var insertHTML = `<select name="item[product_size_id]" id="item_product_size_id">`;
        $.each(product_sizes, function(i, product_size) {
          insertHTML += buildHTML(product_size)
        });
        insertHTML += `</select>`
        if($('#item_product_size_id').length){
          $('#item_product_size_id').replaceWith(insertHTML);
        } else {
          $('.items-second__head--fourth').css('display','block');
          $('.items-second__head--fourth').append(insertHTML);
        }
      })
      .fail(function() {
        alert("サーバとの通信に失敗しました");
      });
    };
  })

  //ここから配送方法の段階的表示機能
  $("#shippingway").on("change",function(){
    var str = document.getElementById("shippingway").value
    if(str == 0){
      $('#item_shippingway_id').remove();
      $(".items-third__center").css('display','none');
    }else{
      $.ajax({
        url: "/shippingways",
        type: 'GET',
        dataType: 'json',
        data: {id: str}
      })
      .done(function(shippingways) {
          var insertHTML = ` <select name="item[shippingway_id]" id="item_shippingway_id">`;
        $.each(shippingways, function(i, shippingway) {
          insertHTML += buildHTML(shippingway)
        });
        insertHTML += `</select>`
        if($('#item_shippingway_id').length){
          $('#item_shippingway_id').replaceWith(insertHTML);
        } else {
          $(".items-third__center").css('display','block');
          $('.items-third__center').append(insertHTML);
        };
      })
      .fail(function() {
        alert("サーバとの通信に失敗しました");
      });
    }
  });

  //ここから価格設定後の金額表示処理
  const NumberWithDelimiter = (number) => {
    if (number != "") {
      number = "¥" + String(number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
    return number;
  }
  $("#item_price").change(function () {
    let price = parseInt($("#item_price").val().replace(/[^0-9]/g, ''));
    let rate = parseFloat($("#item_feerate").val());
    let commission_price = "";
    let prifit_price = "";
    if (Number.isFinite(price) && Number.isFinite(rate)) {
      commission_price = Math.floor(price * rate)
      prifit_price = price - (commission_price);
    }
    //販売手数料の更新(label)
    $("#item_commission_price_label").val(NumberWithDelimiter(commission_price));
    //販売利益の更新(label)
    $("#item_profit_price_label").val(NumberWithDelimiter(prifit_price));
    //販売利益の更新(hidden)
    $("#profit_price_hdn").val(prifit_price);
  });
});