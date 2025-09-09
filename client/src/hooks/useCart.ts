import { useCart as useCartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import type { Shoe } from "../types";

export const useCart = () => {
  const { state, dispatch } = useCartContext();

  const addToCart = (
    shoe: Shoe,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    if (!selectedSize) {
      toast.error("Lütfen beden seçiniz");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        shoe,
        quantity: 1,
        selectedSize,
        selectedColor,
      },
    });

    toast.success("Ürün sepete eklendi");
  };

  const removeFromCart = (shoeId: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: shoeId,
    });
    toast.success("Ürün sepetten çıkarıldı");
  };

  const updateQuantity = (shoeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(shoeId);
      return;
    }

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: shoeId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Sepet temizlendi");
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      return total + item.shoe.price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };
};

