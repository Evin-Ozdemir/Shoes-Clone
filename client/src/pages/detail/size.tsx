import { useState, type FC } from "react";
import { numbers } from "../../utils/constants";

interface Props {
  sizes: string;
  onSizeSelect?: (size: string) => void;
}

const Size: FC<Props> = ({ sizes, onSizeSelect }) => {
  const [selected, setSelected] = useState<string>("");
  const toggle = (num: string) => {
    const newSelected = selected === num ? "" : num;
    setSelected(newSelected);
    onSizeSelect?.(newSelected);
  };
  return (
    <div>
      <h2 className="font-semibold mb-4">Beden Seçiniz</h2>
      <div className="grid gap-4 grid-cols-5">
        {numbers.map((num) => {
          // Ekrana basılan numarayı stokta var mı kontrol et
          const isInStock = sizes.split(",").includes(num);

          // Ekrana basılan numara seçili mi?
          const isSelected = selected === num;
          return (
            <button
              key={num}
              disabled={!isInStock}
              onClick={() => toggle(num)}
              className={`py-2 px-4 lg:px-0 rounded-md cursor-pointer transition hover:bg-zinc-400 disabled:bg-[#d2d1d3] disabled:text-[#8f8c91] ${
                isSelected ? "bg-black text-white" : "bg-white"
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Size;
