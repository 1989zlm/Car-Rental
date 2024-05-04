import { useSearchParams } from "react-router-dom";
import CustomButton from "../CustomButton";

const ShowMore = () => {
  const [params, setParams] = useSearchParams();

  //! 2) eklenen 5 parametresini number olarak tanımlıyoruz.ve ekranda halihazırda bulunan 5 aracı ilk tklamada limit 10 olarak göstersin diye || 5 yazdık
  const limit = Number(params.get("limit")) || 5;
  console.log(limit);

  //! 1) handleclick tıklanınca url e limit 5 diye parametre eklensin(eklenen parametreler herzaman string olarak eklenir bu yuzden bi tuklayınca 5 5 10 olacağına elli beş olarak anlar o yuzden 2. devam işlemi yazılır)
  const handleLimit = () => {
    //console.log("tıklanıldı");
    //parametreye limit ekle
    // params.set("limit", "5");yukarıda limit numbera çevrilince burayı güncelledik
    const newLimit = limit + 5;
    params.set("limit", String(newLimit));
    setParams(params);
  };

  return (
    <div className="w-full flex-center my-10">
      {/* limit 30 dan fazla ise durdur  //! limit 30 dan küçükse custombutonu ekrana yaz değilse sil*/}
      {limit < 30 && (
        <CustomButton handleClick={handleLimit} title="Daha Fazla" />
      )}
    </div>
  );
};

export default ShowMore;
