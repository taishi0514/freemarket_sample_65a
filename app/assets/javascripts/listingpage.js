$(document).on('turbolinks:load', function() {
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
                          <option value=0>選択してください</option>`;
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
        var insertHTML = `<select name="products[category_id]" id="item_category_id">
                          <option value=0>選択してください</option>`;
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
        var insertHTML = `<select name="products[product_size_id]" id="item_product_size_id">
                          <option value=0>選択してください</option>`;
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
          var insertHTML = ` <select name="products[shippingway_id]" id="item_shippingway_id">`;
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
});