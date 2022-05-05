$( function() {
  $( ".accordion__list" ).accordion({
     icons: false,
     heightStyle: "content",
     collapsible: true,
     active: false,
     animate: {
       duration: 1000,
       easing: 'easeInQuad'
     }
   });
 });
