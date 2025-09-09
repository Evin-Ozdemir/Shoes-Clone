import axios from "axios";
import type { AuthResponse } from "../types";

// Axios instance oluştur - tüm API istekleri için temel konfigürasyon
const api = axios.create({
  // API'nin temel URL'i - tüm istekler bu adrese yapılacak
  baseURL: "http://localhost:5000/api",
  // Cookie'leri her istekte otomatik olarak gönder - authentication için gerekli
  withCredentials: true,
  // Her istekte gönderilen verilerin JSON formatında olduğunu belirt
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor - API'den gelen tüm yanıtları yakala ve işle
api.interceptors.response.use(
  // Başarılı yanıtlar için - hiçbir şey yapma, direkt geçir
  (res) => res,
  // Hata durumları için - token yenileme ve hata yönetimi yap
  async (err) => {
    // Hata alınan orijinal API isteğini sakla - sonra tekrar denemek için
    const originalReq = err.config;

    // 401 hatası (Unauthorized) ve access token süresi dolmuşsa
    if (
      err.response.status === 401 &&
      !originalReq._retry && // Bu istek daha önce tekrar denenmemişse
      err.response.data.message === "Access token expired" // Token süresi dolmuş mesajı
    ) {
      // Bu isteği tekrar denediğimizi işaretle - sonsuz döngüyü önle
      originalReq._retry = true;

      try {
        // Refresh token ile yeni access token al
        const res = await api.post<AuthResponse>("/auth/refresh");

        // Yeni access token ile orijinal isteği tekrar dene
        return api(originalReq);
      } catch (error) {
        // Refresh token da geçersizse kullanıcıyı logout yap ve login sayfasına yönlendir
        await api.post("/auth/logout");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    // Diğer hataları olduğu gibi geçir
    return Promise.reject(err);
  }
);

export default api;
