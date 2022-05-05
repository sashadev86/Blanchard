$(function () {
  $(".accordion__list").accordion({
    icons: false,
    heightStyle: "content",
    collapsible: true,
    active: 0,
    animate: {
      duration: 1000,
      easing: 'easeInQuad'
    },
    create: function (event, ui) {
      $(".accordion__heading").attr("tabIndex", "0");
    },
  });
});
