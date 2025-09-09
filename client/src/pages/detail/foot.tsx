import type { FC } from "react";
import { FaHeart } from "react-icons/fa";
import DOMPurify from "dompurify";
import { useCart } from "../../hooks/useCart";
import type { Shoe } from "../../types";

interface Props {
  description: string;
  shoe: Shoe;
  selectedSize?: string;
  selectedColor?: string;
}
const Foot: FC<Props> = ({
  description,
  shoe,
  selectedSize,
  selectedColor,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(shoe, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(shoe, selectedSize, selectedColor);
    // TODO: Navigate to checkout page
  };

  return (
    <div>
      <div className="flex flex-col gap-2 text-white">
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-black p-4 mt-4 rounded-lg cursor-pointer hover:brightness-90 transition"
          >
            Sepete Ekle
          </button>
          <button className="bg-black p-4 mt-4 rounded-lg cursor-pointer hover:brightness-90 transition">
            <FaHeart />
          </button>
        </div>
        <button
          onClick={handleBuyNow}
          className="bg-my-blue p-4 rounded-lg cursor-pointer hover:brightness-90 transition"
        >
          Hemen Satın Al
        </button>
      </div>

      <div>
        <h2 className="font-semibold mb-2 mt-8 text-[24px] text-grey-dark">
          Bu ürün hakkında
        </h2>
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        ></p>
      </div>
    </div>
  );
};

export default Foot;
