ymaps.ready(init);
function init() {
  const mapElem = document.querySelector('myMap');
  const myMap = new ymaps.Map(
    "myMap",
    {
      center: [55.760236, 37.614877],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition:  { top: "200px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "120px", right: "20px" }
    }
  );

  myMap.behaviors.disable('scrollZoom');

  const myPlacemark = new ymaps.Placemark(
    [55.760236, 37.614877],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/contacts/customPoint.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [-20, -20],
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.container.fitToViewport();
}
