import { useEffect, useRef, useState, type FC } from "react";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { FaUserAlt as User, FaSearch as Search } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserInfo: FC = () => {
  const { user } = useUser();
  const { logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // dropdown dışında tıklanırsa kapanır
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    // Ekranın her yerine tıklanırsa kapanır
    document.addEventListener("click", handleClickOutside);

    // Component unmount olduğunda event listener'ı kaldır
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex gap-6 xl:gap-10">
      <button className="cursor-pointer md:text-xl xl:text-2xl max-md:hidden">
        <Search />
      </button>

      <div ref={dropdownRef} className="cursor-pointer relative md:text-lg">
        <button onClick={() => setIsOpen(!isOpen)}>
          <User />
        </button>
        {user && isOpen && (
          <div className="absolute top-10 -left-20 bg-white shadow-lg rounded-md z-[99]">
            <div className="header-button font-semibold">
              {user.firstName} {user.lastName}
            </div>
            {user.role === "admin" && (
              <Link to="/admin">
                <div className="header-button">Admin Paneli</div>
              </Link>
            )}
            <button className="header-button" onClick={() => logout.mutate()}>
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
      <button className="bg-my-yellow text-sm md:text-base xl:text-lg size-[20px] md:size-[24px] xl:size-[32px] rounded-full grid place-items-center">
        {getTotalItems()}
      </button>
    </div>
  );
};

export default UserInfo;
