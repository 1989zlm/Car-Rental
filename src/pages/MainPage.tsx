import { useEffect, useState } from "react";
import CustomFilter from "../components/CustomFilter";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { fuels, years } from "../constants";
import { useSearchParams } from "react-router-dom";
import { fetchCars } from "../utils";
import { CarType } from "../types";
import ShowMore from "../components/ShowMore";

const MainPage = () => {
  //ekrandaki ilk 5 araba için state
  const [cars, setCars] = useState<CarType[]>([]);

  //
  const [params, setParams] = useSearchParams();
  //console.log(params);

  useEffect(() => {
    //searchparams sayfasında setParamsı obje olarak gönderdik o yuzden obje olarak geldi .
    //bir obje içindeki değerleri anahtar/değer çifti şeklinde bir nesne oluşturur (örn:make:'audi)
    const paramsObj = Object.fromEntries(params.entries());
    //console.log(paramsObj);
    //const res = fetchCars(paramsObj);
    //then diyecez catch demeye gerek yok await ile hatayı zaten yakalırız dedi hoca
    fetchCars(paramsObj).then((res: CarType[]) => setCars(res));
    //console.log(res)
  }, [params]);
  // console.log(cars);

  return (
    <div>
      <Hero />

      <div id="catalogue" className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Araba Kataloğu</h1>
          <p>Beğenebileceğin arabaları keşfet</p>
        </div>
        {/* filtreleme alanı */}
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            {/* searchbar sayfasında statetleri tanımladıktan sonra constantta yeralan optionsları buraya yazıyoruz ve import ediyoruz. sonra customfilter sayfasına gidip options tipini yazıyoruz.*/}
            <CustomFilter title="Yakıt Tipi" options={fuels} />
            <CustomFilter title="Yıl" options={years} />
          </div>
        </div>
        {!cars || cars.length < 1 ? (
          <div className="home__error-container">
            <h2>Üzgünüz herhangi bir sonuç bulunamadı</h2>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {cars.map((car, i) => (
                <Card car={car} key={i} /> //bu işlemden sonra Card index.tsx te car'ın type ını tanımlayıp Card a prop olarak yuklemelıyız
              ))}
            </div>
          </section>
        )}

        <ShowMore />
      </div>
    </div>
  );
};

export default MainPage;
