exports.mapfunction = function (locations) {
  //   if (!document.getElementById('map')) return;
  //   const mapData = JSON.parse(document.getElementById('map').dataset.locations);
  //   console.log(mapData);

  let map = L.map('map', {
    center: locations[0].coordinates.reverse(),
    zoom: 6.5,
    zoomControl: false,
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  locations[0].coordinates.reverse();
  locations.map((el) => {
    el.className = 'marker';
    L.marker(el.coordinates.reverse())
      .addTo(map)
      .bindPopup(
        L.popup({
          content: el.description,
          maxWidth: 60,
          minWidth: 50,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .openPopup();
  });
};
// mapfunction();
