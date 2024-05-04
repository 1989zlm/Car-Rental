//!bu sayfada birden fazla component tanımladık. ayrı ayrı açabiliriz ama ilk kez bunu denedik import veya export etmeye gerek yok(aslında ayrı ayrı yapılmalı)

import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import { OptionType } from "../../types";
import { makes } from "../../constants";

type ButtonProps = {
  styling: string;
};

const SearchButton = ({ styling }: ButtonProps) => {
  return (
    <button className={`ml-3 z-10 ${styling}`}>
      <img src="/magnifying-glass.svg" alt="" />
    </button>
  );
};

const SearchBar = () => {
  //! 3) handle clicke setparamsı yazıp reactselect içerisindeki veriyi almak için statei tutuyoruz.(inputlardaki marka model için)
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>(""); //bunları alıp reactselecte onchange olarak yolluyoruz.

  //! 2) handleclik teki veriyi url e göndermek ve urlden veri almak için
  const [params, setParams] = useSearchParams();
  //console.log(params);size 0 geldi ilk yapınca çunku daha statei tanımlamadık

  //inputun yanındaki arama butonuna her bastığımızda sayfa yenileniyor onu engellemek için yaptığımız handle submite prevent dufaultu ekledik typescrpt old. içinde e'ninde tipini belirlemeliyiz.reacttan geldiği içinde import edip tipini yazmalıyız
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //! 1) handle submit içersine girdiğimiz yapıyı url e göndermek için veya url ekleme yapcaksak usesearch params kullnılır.sonra state tutulur
    // marka ve model bilgisi url e parametresine aktarılsın
    setParams({
      make: make.toLowerCase(),
      model: model.toLocaleLowerCase(),
    });
  };
  // sectiğimiz input verisi değiştiği zaman yeni veri istendiğinde, eskisini ön bellkete tutup tekrar sectiğimizde bize apiden değilde ön bellekten yollayan usememodur performans artışı sağlar
  //reactselect her çalıştığında usememo çalışsın
  const options: OptionType[] = useMemo(
    () =>
      makes.map((item) => ({
        label: item,
        value: item,
      })),
    [make]
  );
  // console.log(make);
  // console.log(model);
  return (
    <form className="searchbar gap-3" onSubmit={handleSubmit}>
      <div className="searchbar__item text-black">
        <ReactSelect
          className="w-full"
          options={options}
          onChange={(e) => e && setMake(e.value)}
          // onChange={(e) => console.log(e)}konsolda valuları görebiliyoruz
        />
        <SearchButton styling={"sm:hidden"} />
      </div>
      <div className="searchbar__item">
        <img
          src="/model-icon.png" //arama inputunda görünen minyatür
          width={25}
          className="absolute ml-4"
          alt=""
        />
        <input
          type="text"
          placeholder="ör:i40"
          onChange={(e) => setModel(e.target.value)} // normal bi select olsaydı e.target.value yapmazdık
          className="searchbar__input rounded text-black"
        />
        <SearchButton styling={"sm:hidden"} />
      </div>
      <SearchButton styling={"max-sm:hidden"} />
    </form>
  );
};

export default SearchBar;
