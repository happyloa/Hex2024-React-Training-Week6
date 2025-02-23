import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
      setProducts(res.data.products);
    } catch (error) {
      console.error("取得產品資料失敗", error);
    }
  };

  const handleViewMore = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
      navigate(`/product/${id}`, { state: { productData: res.data } });
    } catch (error) {
      console.error("取得產品資料失敗", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      {/* Hero 區塊 */}
      <section
        className="hero text-center text-white d-flex align-items-center"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2128&auto=format&fit=crop') center/cover",
          height: "400px",
        }}>
        <div className="container">
          <h1 className="display-4 fw-bold">📚 探索你的下一本好書</h1>
          <p className="lead">
            精選數千本熱門書籍，立即租借，開啟你的閱讀旅程！
          </p>
        </div>
      </section>

      {/* 產品列表 */}
      <section className="container mt-5">
        <h2 className="text-center mb-4">📖 可租借書籍</h2>
        <div className="row">
          {products.map((product) => (
            <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm rounded border-0">
                <img
                  src={product.imageUrl}
                  className="card-img-top rounded-top"
                  alt={product.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{product.title}</h5>
                  <p className="card-text text-muted text-truncate">
                    {product.description}
                  </p>
                  <p className="fw-bold text-primary fs-5">
                    NT${product.price} / {product.unit}
                  </p>
                  <button
                    className="btn btn-primary mt-auto w-100"
                    onClick={() => handleViewMore(product.id)}>
                    查看更多
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product;
