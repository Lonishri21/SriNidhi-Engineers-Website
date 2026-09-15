export const workCategories = [
  {
    id: 'mechanical', number: '01', title: 'Mechanical Works',
    summary: 'Structural fabrication and erection, tanks, pipe racks, and heavy equipment installation and alignment.',
    images: ['mechanical-01.jpeg','mechanical-02.gif','mechanical-03.jpeg','mechanical-04.jpeg','mechanical-05.jpeg','mechanical-06.jpeg','mechanical-07.jpeg','mechanical-08.jpeg','mechanical-09.jpeg','mechanical-10.jpeg','mechanical-11.jpeg','mechanical-12.jpeg','mechanical-13.png','mechanical-14.gif','mechanical-19.jpeg','mechanical-20.jpeg','mechanical-21.jpeg','mechanical-22.jpeg','mechanical-23.jpeg','mechanical-24.jpeg','mechanical-25.jpeg','mechanical-26.jpeg','mechanical-27.jpeg']
  },
  {
    id: 'ms-ss-piping', number: '02', title: 'MS/SS Piping and Equipments',
    summary: 'Fabrication, installation and routing of MS/SS process and utility piping, along with equipment installation for industrial systems.',
    images: ['ms-ss-piping-01.jpeg','ms-ss-piping-02.jpeg','ms-ss-piping-03.jpeg','ms-ss-piping-04.jpeg']
  },
  {
    id: 'civil', number: '03', title: 'Civil Works',
    summary: 'Industrial foundations, reinforced concrete structures, buildings, tanks, sumps, roads, drainage, and supporting infrastructure.',
    images: ['civil-01.jpeg','civil-02.jpeg','civil-03.jpeg','civil-04.jpeg','civil-05.jpeg','civil-06.jpeg','civil-07.jpeg','civil-08.jpeg','civil-09.jpeg','civil-10.jpeg','civil-11.jpeg','civil-12.jpeg','civil-13.jpeg','civil-14.jpeg','civil-15.jpeg']
  },
  {
    id: 'drains-and-gratings', number: '04', title: 'SS Drains and Gratings',
    summary: 'Fabrication and installation of stainless-steel drains and gratings for industrial processing areas.',
    images: ['drains-gratings-01.jpeg','drains-gratings-02.jpeg','drains-gratings-03.jpeg','drains-gratings-04.jpeg','drains-gratings-05.jpeg','drains-gratings-06.jpeg','drains-gratings-07.jpeg']
  },
  {
    id: 'paint-shop-installation', number: '05', title: 'Paint Shop Installation Work',
    summary: 'PT&ED paint shop installation work successfully completed for JSW Motors.',
    images: ['electrical-01.jpeg','electrical-02.jpeg','paint-shop-installation-03.jpeg','paint-shop-installation-04.jpeg','paint-shop-installation-05.jpeg','paint-shop-installation-06.jpeg']
  }
] as const;

export const workImagePath = (filename: string) => `/images/work/${filename}`;
