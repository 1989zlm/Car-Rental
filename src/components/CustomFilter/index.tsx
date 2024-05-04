import { useState, useEffect } from "react";
import Select from "react-select";
import { OptionType } from "../../types";
import { useSearchParams } from "react-router-dom";

//!aracın yakıt ve model inputunu oluşturduğumuz sayfa

type CustomFilterType = {
  title: string;
  options: OptionType[];
};

const CustomFilter = ({ title, options }: CustomFilterType) => {
  // selecteki verileri state te tutmak için
  const [selected, setSelected] = useState<OptionType | null>();
  const [params, setParams] = useSearchParams();
  // console.log(selected);

  //? seleckte sectiğimiz model ve yakıt turunu ustundeki arama urline parametre olarak atması için useeffect yapıyoruz.
  useEffect(() => {
    //burada if else yapısıda kuullanılabilir(urle eklenecek parametreyi belirleme)
    const key = title === "Yakıt Tipi" ? "fuel" : "year";
    // console.log(key);

    // değer varsa gelsin yoksa yok
    if (selected?.value) {
      params.set(key, selected.value.toLocaleLowerCase());
    } else {
      params.delete(key);
    }

    // url i güncelle
    setParams(params);
  }, [selected]);

  return (
    <div>
      <Select
        options={options}
        placeholder={title}
        className="text-black min-w-[120px]"
        onChange={(e) => setSelected(e)}
      />
    </div>
  );
};

export default CustomFilter;
