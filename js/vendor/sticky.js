$.fn.stickyfloat = function(options, lockBottom) {
  var $obj               = this;
  var parentPaddingTop   = parseInt($obj.parent().css('padding-top'));
  var startOffset        = $obj.parent().offset().top;
  var opts               = $.extend({ startOffset: startOffset, offsetY: parentPaddingTop, duration: 200, lockBottom:true }, options);
  
  $obj.css({ position: 'absolute' });
  
  if(opts.lockBottom){
    var fix = $obj.hasClass('calendar_box') ? -100 : 0
    var bottomPos = $obj.parent().height() - $obj.height() + parentPaddingTop - parseInt($obj.css('padding-top')) + fix; // fix & parseInt(...)
    if(bottomPos < 0) bottomPos = 0;
  }
  
  $(window).scroll(function () { 
    $obj.stop(); 

    var pastStartOffset      = $(document).scrollTop() > opts.startOffset;  
    var objFartherThanTopPos  = $obj.offset().top > startOffset;  
    //var objBiggerThanWindow   = $obj.outerHeight() < $(window).height();  

    if ((pastStartOffset||objFartherThanTopPos)){//&&objBiggerThanWindow) { 

      var newpos = ($(document).scrollTop() - startOffset + opts.offsetY);

      if (newpos > bottomPos) newpos = bottomPos;
      if ($(document).scrollTop() < opts.startOffset) newpos = parentPaddingTop;

      $obj.animate({ top: newpos }, opts.duration );
    }
  });
};

