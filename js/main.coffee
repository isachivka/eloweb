$(document).ready () ->
  qa('.qa')
  add_field('a.add')
  masks()
  popups()
  checkbox()
  $('.calendar_box').stickyfloat({duration: 0})
  $('.date_box').stickyfloat({duration: 0})
  $('.appointment_box').stickyfloat({duration: 0})
  $(window).scroll()
  graph()

graph = () ->
  $('.graph').pietimer({
    timerSeconds: 10,
    color: '#00ace5',
    fill: false,
    showPercentage: true
  })
  $('.graph').pietimer('drawTimer', 85);

checkbox = () ->
  checks = $('input[type="checkbox"]')
  $(checks).each ->
    check = this
    $(check).wrap("<div class='checkbox-wrap'></div>")
    $(check).css('opacity', 0.01)
    $(check).parents('.checkbox-wrap').toggleClass('active') if $(check).val() == true
    $(check).click ->
      $(this).parents('.checkbox-wrap').toggleClass('active')

masks = () ->
  $('.phone_field').mask('+380 (999) 999-99-99')

qa = (box) ->
  wraps = $(box).find('.q-wrap')
  $(wraps).each ->
    wrap = this
    $(wrap).find('.q').click ->
      $(wrap).toggleClass('open')

add_field = (link) ->
  field = $(link).parents('.input')
  $(link).click ->
    $(field).find('.hide_template_to_add input').clone().insertBefore($(link))
    $(field).find('.phone_field').mask('+380 (999) 999-99-99')
    false

popups = () ->
  dp = '[data-role="popup"]'
  pops = $(dp)
  pops_open = $('[data-role="popup_open"]')
  pops_close = $('[data-role="popup_close"]')
  wind = '[data-role="popup_window"]'

  $(document).keyup((e) ->
    if e.keyCode == 27 && $(".open#{dp}").length > 0
      close(".open#{dp}")
  )

  open = (pop) ->
    window.location.hash = pop.replace('#', '')
    $(pop).css('display', 'block')
    $(pop).addClass('open')
    $('body').css('overflow', 'hidden')

  close = (pop) ->
    history.pushState('', document.title, window.location.pathname);
    $(pop).css('display', 'none')
    $(pop).removeClass('open')
    $('body').css('overflow', 'auto')

  $('body').click ->
    if $(".open#{dp}").length > 0
      close(".open#{dp}")

  $(pops).each ->

    id = $(this).attr('id')

    hash = window.location.hash.replace('#', '')
    if hash != '' && hash == id
      open("##{id}")

    $(this).find(wind).click((e) ->
      e.stopPropagation();
    )

  $(pops_open).each ->
    $(this).click ->
      target = $(this).attr('data-target')
      if $(target).length > 0
        open(target)
      false

  $(pops_close).each ->
    $(this).click ->
      target = $(this).parents(dp)
      if $(target).length > 0
        close(target)
      false