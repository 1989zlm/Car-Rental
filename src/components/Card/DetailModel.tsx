//! kartlara tıklanınca açılacak olan modal detayı

import { AnimatePresence, motion } from "framer-motion";
import { CarType } from "../../types";
import { generateImage } from "../../utils";

type DetailProps = {
  isOpen: boolean;
  closeModel: () => void;
  car: CarType;
};

const DetailModel = ({ isOpen, closeModel, car }: DetailProps) => {
  //   console.log(isOpen);
  //   console.log(closeModel);
  // console.log(car);
  // { Object.entries(car).map((item) => console.log(item));
  // boyle yapıp consoldan baktık aşağıda mapledik }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          className=" fixed inset-0 bg-black flex items-center justify-center z-20 p-4 bg-opacity-25"
        >
          <div className="p-6 max-w-lg bg-white w-full rounded-2xl flex flex-col gap-5 shadow-xl overflow-auto  relative max-h-[90vh]">
            {/* kapatma butonu */}
            <button
              onClick={closeModel}
              className="absolute top-1 end-1 rounded-full cursor-pointer z-10 p-1 bg-white"
            >
              <img src="/public/close.svg" alt="" />
            </button>

            {/* kart açılınca görünen büyük resim */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="w-full relative h-40 bg-pattern bg-cover bg-center rounded-lg">
                <img
                  src={generateImage(car)}
                  alt=""
                  className="h-full mx-auto"
                />
              </div>

              {/* kart açılınca görünen küçük resimler */}
              <div className="flex gap-3">
                <div className="flex-1 flex relative w-full h-24 bg-primary-100">
                  <img
                    src={generateImage(car, "29")}
                    alt=""
                    className="h-full object-contain mx-auto"
                  />
                </div>
                <div className="flex-1 flex relative w-full h-24 bg-primary-100">
                  <img
                    src={generateImage(car, "33")}
                    alt=""
                    className="h-full object-contain mx-auto"
                  />
                </div>
                <div className="flex-1 flex relative w-full h-24 bg-primary-100">
                  <img
                    src={generateImage(car, "13")}
                    alt=""
                    className="h-full object-contain mx-auto"
                  />
                </div>
              </div>
            </div>

            {/*!!!!! kart açılnca gelen araba bilgileri !!!!!*/}

            {/* apiden obje veya dizi değil objenin içindeki properityler yanı deerler özellikler(key valu şeklinde) geliyorç buyuzden özellikleri objeyi diziye cevireceğiz. */}
            {/* <div className="flex justify-between">
              <h4 className="capitalize text-gray">City Mpg</h4>
              <p className="text-black-100 font-semibold">14</p>
            </div>
           
            <div className="flex justify-between">
              <h4 className="capitalize text-gray">City Mpg</h4>
              <p className="text-black-100 font-semibold">14</p>
            </div> böyleydi bilgileri bastık*/}
            {/* {console.log(Object.entries(car))} boyle yapıp konsola baktık*/}
            {Object.entries(car).map(([key, value]) => (
              <div className="flex justify-between">
                <h4 className="capitalize text-gray">
                  {key.replace("_", " ")}
                </h4>
                <p className="text-black-100 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailModel;
