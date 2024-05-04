// Api isteği atmak için açılan sayfa

import { colors } from "../constants";
import { CarType, filterType } from "../types";

//önce hangi değerlerin geldiğini apiden kontrol edelim :)

//1)
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ef5dea0fdcmshad8336cc79568ffp1f078ajsn12be6bd18e63",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  },
};
//2)filters dedik fonksiyona çünkü istediğimiz istekleri filtrelesin
export async function fetchCars(filters: filterType) {
  //3)ilk önce sabit gelen değerleri tanımlayalım?
  //nesne parçalama yöntemiyle parçalayalım
  const {
    make = "bmw",
    model = "",
    limit = "",
    year = "",
    fuel = "",
  } = filters;

  const res = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&fuel_type=${fuel}&year=${year}&limit=${limit}`,
    options
  );
  //console.log(res.json()); // unuu yaptıktan sonra consoldan gelen diziye bak
  return await res.json();
}

//2 farklı api kullanıldı biri araç bilgileri diğeri araç resimleri için angle aracın usten arkadan yandan fotosunu demek
export const generateImage = (car: CarType, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  // jscrptte normal bi string url e parametre eklemek için
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", car.make);
  url.searchParams.append("modelFamily", car.model);
  url.searchParams.append("zoomType", "fullscreen");

  if (angle) {
    url.searchParams.append("angle", angle);
  }

  // constantta tanımladığımız arabaların renklerini random olarak yollasın(random küsüratlı geliyor diye round parantezine aldık)
  const i = Math.round(Math.random() * colors.length);
  url.searchParams.append("paintId", colors[i]);

  return String(url);
};
