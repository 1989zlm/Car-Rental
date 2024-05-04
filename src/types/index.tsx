//CustomButton bileşeninin aldığı propsların typeni tanımlayalım

import { MouseEventHandler } from "react";

export type ButtonProps = {
  title: string;
  designs?: string;
  btnType?: "button" | "submit";
  rIcon?: string;
  handleClick?: MouseEventHandler; //içerisinde bi tıklanma olayını izleyeceğiz o yuzden reactın içerissnden gelen bi özellik olan mouse izleme olayını ekliyoruz.
};
export type CarType = {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: "gas" | "diesel" | "electricity";
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
};

export type OptionType = {
  label: string;
  value: string;
};

export type filterType = {
  //opsiyonel anımladık başlangıçta tanımlamadığımız için hata veriyor dedi hoca ?
  make?: string;
  model?: string;
  limit?: string;
  fuel?: string;
  year?: string;
};
