// Generated by CoffeeScript 1.6.1
(function() {
  var add_field, checkbox, graph, masks, popups, qa;

  $(document).ready(function() {
    qa('.qa');
    add_field('a.add');
    masks();
    popups();
    checkbox();
    $('.calendar_box').stickyfloat({
      duration: 0
    });
    $('.date_box').stickyfloat({
      duration: 0
    });
    $('.appointment_box').stickyfloat({
      duration: 0
    });
    $(window).scroll();
    return graph();
  });

  graph = function() {
    $('.graph').pietimer({
      timerSeconds: 10,
      color: '#00ace5',
      fill: false,
      showPercentage: true
    });
    return $('.graph').pietimer('drawTimer', 85);
  };

  checkbox = function() {
    var checks;
    checks = $('input[type="checkbox"]');
    return $(checks).each(function() {
      var check;
      check = this;
      $(check).wrap("<div class='checkbox-wrap'></div>");
      $(check).css('opacity', 0.01);
      if ($(check).val() === true) {
        $(check).parents('.checkbox-wrap').toggleClass('active');
      }
      return $(check).click(function() {
        return $(this).parents('.checkbox-wrap').toggleClass('active');
      });
    });
  };

  masks = function() {
    return $('.phone_field').mask('+380 (999) 999-99-99');
  };

  qa = function(box) {
    var wraps;
    wraps = $(box).find('.q-wrap');
    return $(wraps).each(function() {
      var wrap;
      wrap = this;
      return $(wrap).find('.q').click(function() {
        return $(wrap).toggleClass('open');
      });
    });
  };

  add_field = function(link) {
    var field;
    field = $(link).parents('.input');
    return $(link).click(function() {
      $(field).find('.hide_template_to_add input').clone().insertBefore($(link));
      $(field).find('.phone_field').mask('+380 (999) 999-99-99');
      return false;
    });
  };

  popups = function() {
    var close, dp, open, pops, pops_close, pops_open, wind;
    dp = '[data-role="popup"]';
    pops = $(dp);
    pops_open = $('[data-role="popup_open"]');
    pops_close = $('[data-role="popup_close"]');
    wind = '[data-role="popup_window"]';
    $(document).keyup(function(e) {
      if (e.keyCode === 27 && $(".open" + dp).length > 0) {
        return close(".open" + dp);
      }
    });
    open = function(pop) {
      window.location.hash = pop.replace('#', '');
      $(pop).css('display', 'block');
      $(pop).addClass('open');
      return $('body').css('overflow', 'hidden');
    };
    close = function(pop) {
      history.pushState('', document.title, window.location.pathname);
      $(pop).css('display', 'none');
      $(pop).removeClass('open');
      return $('body').css('overflow', 'auto');
    };
    $('body').click(function() {
      if ($(".open" + dp).length > 0) {
        return close(".open" + dp);
      }
    });
    $(pops).each(function() {
      var hash, id;
      id = $(this).attr('id');
      hash = window.location.hash.replace('#', '');
      if (hash !== '' && hash === id) {
        open("#" + id);
      }
      return $(this).find(wind).click(function(e) {
        return e.stopPropagation();
      });
    });
    $(pops_open).each(function() {
      return $(this).click(function() {
        var target;
        target = $(this).attr('data-target');
        if ($(target).length > 0) {
          open(target);
        }
        return false;
      });
    });
    return $(pops_close).each(function() {
      return $(this).click(function() {
        var target;
        target = $(this).parents(dp);
        if ($(target).length > 0) {
          close(target);
        }
        return false;
      });
    });
  };

}).call(this);
