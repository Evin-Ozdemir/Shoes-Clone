import type { FC } from "react";
import useUser from "../../hooks/useUser";
import Loader from "../loader";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../header";

interface ProtectedProps {
  allowedRoles?: string[];
}

const Protected: FC<ProtectedProps> = ({ allowedRoles }) => {
  // Oturumu acık olan kullanıcının bilgilerini alıyoruz
  const { user, isLoading, error } = useUser();

  // Kullacını verisi yüklenirken loader göster
  if (isLoading) return <Loader />;

  // Eğer rolu yetersizse login sayfasına yönlendir
  if (allowedRoles && user && !allowedRoles.includes(user.role))
    return <Navigate to="/login" />;

  // Kullanıcı verisi yüklendiyse ve erişim izni varsa olan route'u geri dön
  if (user)
    return (
      <div>
        <Header /> <Outlet />
      </div>
    );

  // Kullanıcı verisi yoksa login sayfasına yönlendir
  if (error) return <Navigate to="/login" />;
};

export default Protected;
