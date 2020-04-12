$(function() {
    $('li.notifications').click(function() {
        var index = $('li.notifications').index(this);
        
        $('li.notifications').removeClass('active');

        $(this).addClass('active');
    });
});