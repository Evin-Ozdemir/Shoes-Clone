import type { FC } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useShoes from "../../hooks/useShoes";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Images from "./images";
import Head from "./head";
import Color from "./color";
import Size from "./size";
import Foot from "./foot";

const Detail: FC = () => {
  const { id } = useParams();
  const { shoe } = useShoes();
  const { isLoading, data, error } = shoe(id as string);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <Images pictures={data?.picture!} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Head item={data!} />
        <Color colors={data?.color!} onColorSelect={setSelectedColor} />
        <Size sizes={data?.size!} onSizeSelect={setSelectedSize} />
        <Foot
          description={data?.description!}
          shoe={data!}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
      </div>
    </div>
  );
};

export default Detail;
