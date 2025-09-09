import type { FC } from "react";

interface Props {
  pictures: string[];
}
const Images: FC<Props> = ({ pictures }) => {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-[48px] h-fit">
      {pictures.map((url, key) => (
        <img src={url} key={key} alt={`Shoe image ${key + 1}`} />
      ))}
    </div>
  );
};

export default Images;
