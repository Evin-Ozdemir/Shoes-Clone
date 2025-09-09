import { useState, type FC } from "react";
import { colors as colorsList } from "../../utils/constants";

interface Props {
  colors: string;
  onColorSelect?: (color: string) => void;
}

const Color: FC<Props> = ({ colors, onColorSelect }) => {
  const [selected, setSelected] = useState<string>("");

  const toggle = (id: string) => {
    const newSelected = selected === id ? "" : id;
    setSelected(newSelected);
    onColorSelect?.(newSelected);
  };
  return (
    <div>
      <h2 className="font-semibold mb-3">Renk Seçiniz</h2>

      <div className="flex gap-5">
        {colors.split(",").map((id) => {
          // Ekrana basılan rengin kodunu bul
          const color = colorsList.find((i) => i.id === id);
          // Ekrana basılan renk seçili mi?
          const isSelected = selected === id;
          return (
            <div
              key={id}
              className={isSelected ? "ring-3 ring-my-blue rounded-full" : ""}
            >
              <div
                onClick={() => toggle(id)}
                className="m-1 size-9 rounded-full cursor-pointer"
                style={{ backgroundColor: color?.code }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Color;
