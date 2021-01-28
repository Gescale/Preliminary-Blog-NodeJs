
jQuery(function(){

    var minimized_elements = $('p.minimize');
    var minimize_character_count = 100;

    minimized_elements.each(function(){
        var t = $(this).text();
        if(t.length < minimize_character_count ) return;

        $(this).html(
            t.slice(0,minimize_character_count )+'<span>... </span><a href="#" class="more">More</a>'+
            '<span style="display:none;">'+ t.slice(minimize_character_count ,t.length)+' <a href="#" class="less">Less</a></span>'
        );

    });

    $('a.more', minimized_elements).click(function(event){
        event.preventDefault();
        $(this).hide().prev().hide();
        $(this).next().show();
    });

    $('a.less', minimized_elements).click(function(event){
        event.preventDefault();
        $(this).parent().hide().prev().show().prev().show();
    });

});​




jQuery(function(){

var minimized_elements = $('p.minimize');
var maxLines = 20;

minimized_elements.each(function(){
    // var textArr = $(this).text().split(/\n/); // Not supported in IE < 9
    var textArr = $(this).html().replace(/\n?<br>/gi,"<br>").split(/<br>/);
    var countLines = textArr.length;

    if (countLines > maxLines) {
        text_less = textArr.slice(0, maxLines).join("<br>");
        text_more = textArr.slice(maxLines, countLines).join("<br>");
    }
    else return;

    $(this).html(
        text_less + '<span>... </span><a href="#" class="more">More</a>'+
        '<span style="display:none;">'+ text_more +' <a href="#" class="less">Less</a></span>'
    );
});

$('a.more', minimized_elements).click(function(event){
    event.preventDefault();
    $(this).hide().prev().hide();
    $(this).next().show();
});

$('a.less', minimized_elements).click(function(event){
    event.preventDefault();
    $(this).parent().hide().prev().show().prev().show();
});

});



$(function(){
    $("p").each(function(){
        var $ths = $(this),
            txt = $ths.text();

        //Clear the text
        $ths.text("");

        //First 100 chars
        $ths.append($("<span>").text(txt.substr(0,100)));

        //The rest
        $ths.append($("<span>").text(txt.substr(100, txt.length)).hide());

        //More link
        $ths.append(
            $("<a>").text(MORE).click(function(){
                var $ths = $(this);

                if($ths.text() == MORE){
                    $ths.prev().show();
                    $ths.text(LESS);
                }
                else{
                    $ths.prev().hide();
                    $ths.text(MORE);
                }
            })
        );
    });
});




text_truncate = function(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };
