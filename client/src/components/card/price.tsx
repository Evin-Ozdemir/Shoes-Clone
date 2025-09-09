import type { FC } from "react";
import type { Shoe } from "../../types";

interface Props {
  item: Shoe;
  designs?: string;
}

const Price: FC<Props> = ({ item, designs }) => {
  let price = item.price;
  // İndirim varsa indirimli fiyatı hesapla
  if (item.discount) {
    price = (item.price * (100 - item.discount)) / 100;
  }

  return (
    <div>
      <span
        className={`${
          item.discount ? "text-my-yellow" : "text-white"
        } ${designs}`}
      >
        ${price.toFixed(2)}
      </span>
    </div>
  );
};

export default Price;
