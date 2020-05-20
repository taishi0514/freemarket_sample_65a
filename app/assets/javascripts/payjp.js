$(document).on('turbolinks:load',function(){

  console.log("hello")

  Payjp.setPublicKey('pk_test_0d6451e39c9dbcb0dea642a0');

  var form = $("#charge-form");


  $("#charge-submit").click(function(e) {
    e.preventDefault()
    console.log(1)
    form.find("input[type=submit]").prop("disabled", true);

    var card = {
      number: $("#card_number").val(),
      cvc: $("#cvc").val(),
      exp_month: $("#exp_month").val(),
      exp_year: $("#exp_year").val(),
    };
    console.log(card)

    Payjp.createToken(card, function(status, response) {
      console.log(3)
      if (response.error){
        console.log(2)
        form.find('.payment-errors').text(response.error.message);
        form.find('button').prop('disabled', false);
      }   
      else {
        $("#card_number").removeAttr("name");
        $("#cvc").removeAttr("name");
        $("#exp_month").removeAttr("name");
        $("#exp_year").removeAttr("name");
        var token = response.id;
        console.log(token)
        form.append($('<input type="hidden" name="payjpToken" />').val(token));
        form.get(0).submit();
      };
    });
  });
});