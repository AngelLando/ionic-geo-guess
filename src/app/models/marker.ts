import { Icon, IconOptions, icon } from 'leaflet';
export const defaultIcon: Icon<IconOptions> = icon({
  // This define the displayed icon size, in pixel
  iconSize: [ 37, 59 ],
  // This defines the pixel that should be placed right above the location
  // If not provided, the image center will be used, and that could be awkward
  iconAnchor: [ 30, 20 ],
  // The path to the image to display. In this case, it's a Leaflet asset
  iconUrl: 'https://www.nicepng.com/png/full/196-1963758_how-to-set-use-map-marker-svg-vector.png',
  // The path to the image's shadow to display. Also a leaflet asset
  //shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png"
});

export const redIcon: Icon<IconOptions> = icon({
  // This define the displayed icon size, in pixel
  iconSize: [ 20, 20 ],
  // This defines the pixel that should be placed right above the location
  // If not provided, the image center will be used, and that could be awkward
  iconAnchor: [ 15, 10 ],
  // The path to the image to display. In this case, it's a Leaflet asset
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Red_Circle%28small%29.svg/1024px-Red_Circle%28small%29.svg.png',
  // The path to the image's shadow to display. Also a leaflet asset
  //shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png"
});