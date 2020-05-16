$(document).on('turbolinks:load', function(){
  // 下記はedit用です。できれば別ファイルで作成することを推奨。バグの元
  var append_input = $(`<li class="input"><label class="upload-label"><div class="upload-label__text">ドラッグアンドドロップ<br>またはクリックしてファイルをアップロード<div class="input-area"><input class="hidden image_upload" type="file"></div></div></label></li>`)
  $ul = $('#previews')
  $lis = $ul.find('.image-preview');
  $input = $ul.find('.input');
  if($input.length == 0){
    if($lis.length <= 4 ){
      $ul.append(append_input)
      $('#previews .input').css({
        'width': `calc(100% - (20% * ${$lis.length}))`
      })
    }
    else if($lis.length == 5 ){
      $ul.append(append_input)
      $('#previews .input').css({
        'width': `100%`
      })
    }
    else if($lis.length <= 9 ){
      $ul.append(append_input)
      $('#previews .input').css({
        'width': `calc(100% - (20% * (${$lis.length} - 5 )))`
      })
    }
  }

  //newにおいては、下記が本題

  // プレビュー機能
  //'change'イベントでは$(this)で要素が取得できないため、 'click'イベントを入れた。
  //これにより$(this)で'input'を取得することができ、inputの親要素である'li'まで辿れる。

  $(document).on('click', '.image_upload', function(){
    //inputの要素はクリックされておらず、inputの親要素であるdivが押されている。
    //だからdivのクラス名をclickした時にイベントが作動。
    //div（this）から要素を辿ればinputを指定することが可能。

    //$liに追加するためのプレビュー画面のHTML。横長でないとバグる
    var preview = $('<div class="image-preview__wapper"><img class="preview"></div><div class="image-preview_btn"><div class="image-preview_btn_edit">編集</div><div class="image-preview_btn_delete">削除</div></div>'); 
    //次の画像を読み込むためのinput。 
    var append_input = $(`<li class="input"><label class="upload-label"><div class="upload-label__text">ドラッグアンドドロップ<br>またはクリックしてファイルをアップロード<div class="input-area"><input class="hidden image_upload" type="file"></div></div></label></li>`)
    $ul = $('#previews')
    $li = $(this).parents('li');
    $label = $(this).parents('.upload-label');
    $inputs = $ul.find('.image_upload');
    //inputに画像を読み込んだら、"プレビューの追加"と"新しいli追加"処理が動く
    $('.image_upload').on('change', function (e) {
      //inputで選択した画像を読み込む
      var reader = new FileReader();


      // プレビューに追加させるために、inputから画像ファイルを読み込む。
      reader.readAsDataURL(e.target.files[0]);

      //画像ファイルが読み込んだら、処理が実行される。 
      reader.onload = function(e){
        //previewをappendで追加する前に、プレビューできるようにinputで選択した画像を<img>に'src'で付与させる
        // つまり、<img>タグに画像を追加させる
        $(preview).find('.preview').attr('src', e.target.result);
      }

      //inputの画像を付与した,previewを$liに追加。
      $li.append(preview);

      //プレビュー完了後は、inputを非表示にさせる。これによりプレビューだけが残る。
      $label.css('display','none'); // inputを非表示
      $li.removeClass('input');     // inputのクラスはjQueryで数を数える時に邪魔なので除去
      $li.addClass('image-preview'); // inputのクラスからプレビュー用のクラスに変更した
      $lis = $ul.find('.image-preview'); // クラス変更が完了したところで、プレビューの数を数える。 
      $('#previews li').css({
        'width': `114px`
      })




      //"ul"に新しい"li(inputボタン)"を追加させる。
      if($lis.length <= 4 ){
        $ul.append(append_input)
        $('#previews li:last-child').css({
          'width': `calc(100% - (20% * ${$lis.length}))`
        })
      }
      else if($lis.length == 5 ){
        $li.addClass('image-preview');
        $ul.append(append_input)
        $('#previews li:last-child').css({
          'width': `100%`
        })
      }
      // ９個のプレビューのとき、1個のinputを追加。最後の数は9です。
      else if($lis.length <= 9 ){
        $li.addClass('image-preview');
        $ul.append(append_input)
        $('#previews li:last-child').css({
          'width': `calc(100% - (20% * (${$lis.length} - 5 )))`
        })
      }

      //inputの最後の"data-image"を取得して、input nameの番号を更新させてる。
      // これをしないと、それぞれのinputの区別ができず、最後の1枚しかDBに保存されません。
      // 全部のプレビューの番号を更新することで、プレビューを削除して、新しく追加しても番号が1,2,3,4,5,6と綺麗に揃う。だから全部の番号を更新させる
      $inputs.each( function( num, input ){
        //nameの番号を更新するために、現在の番号を除去
        $(input).removeAttr('name');
        $(input).attr({
          name:"product[images_attributes][" + num + "][name]",
          id:"product_images_attributes_" + num + "_name"
        });
      });
    })
  })
});