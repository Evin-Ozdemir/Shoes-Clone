import type { FC } from "react";
import useShoes from "../../hooks/useShoes";
import Loader from "../../components/loader";
import Error from "../../components/error";
import { Link } from "react-router-dom";

const Dashboard: FC = () => {
  const { shoes, remove } = useShoes();
  const { isLoading, data, error } = shoes();
  const removeMutation = remove();

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  // Toplam ürün sayısı ve fiyat hesaplama
  const totalProducts = data?.length || 0;
  const totalValue = data?.reduce((sum, item) => sum + item.price, 0) || 0;
  const averagePrice =
    totalProducts > 0 ? (totalValue / totalProducts).toFixed(2) : 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl md:text-3xl font-semibold">Ürünler</h1>
        <Link
          to="/admin/create"
          className="bg-my-blue px-4 py-1 md:px-6 md:py-2 rounded-md text-white hover:bg-my-blue/90 transition cursor-pointer"
        >
          Ürün Ekle
        </Link>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Ürün</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalProducts}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Değer</p>
              <p className="text-2xl font-bold text-gray-900">
                ₺{totalValue.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ortalama Fiyat</p>
              <p className="text-2xl font-bold text-gray-900">
                ₺{averagePrice}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3">İsim</th>
              <th className="px-6 py-3">Fiyat</th>
              <th className="px-6 py-3 text-nowrap">İndirim (%)</th>
              <th className="px-6 py-3">Eylemler</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={item.picture[0]}
                    alt={item.name}
                    className="w-16 md:w-28 max-w-full max-h-full rounded-xl "
                  />
                </td>

                <td className="px-6 py-4 text-center font-semibold text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-center font-semibold text-gray-900">
                  {item.price}
                </td>
                <td className="px-6 py-4 text-center font-semibold text-black">
                  {item.discount > 0 ? `${item.discount}%` : "Yok"}
                </td>

                <td className="px-6 py-4 text-center">
                  <Link
                    to={`/admin/edit/${item._id}`}
                    className="text-blue-500 hover:text-my-blue/90 hover:underline pe-3 transition"
                  >
                    Düzenle
                  </Link>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `${item.name} ürününü silmek istediğinizden emin misiniz?`
                        )
                      ) {
                        removeMutation.mutate(item._id);
                      }
                    }}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
