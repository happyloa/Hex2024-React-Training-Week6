import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
        setBooks(res.data.products);
      } catch (error) {
        console.error("獲取書籍時發生錯誤：", error);
      }
    };

    fetchBooks();
  }, []);

  // 直接導向詳細頁面並傳遞數據
  const handleViewMore = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
      navigate(`/product/${id}`, { state: { productData: res.data } });
    } catch (error) {
      console.error("取得產品資料失敗", error);
    }
  };

  return (
    <div>
      {/* Hero 區塊 */}
      <section
        className="hero position-relative text-center text-white d-flex align-items-center"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover",
          height: "400px",
        }}>
        {/* 遮罩層 */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0, 0, 0, 0.6)", zIndex: "1" }}></div>

        {/* Hero 內文 */}
        <div className="container position-relative z-2">
          <h1 className="display-4 fw-bold">探索無限知識，輕鬆租借書籍</h1>
          <p className="lead">
            數千本書籍任你選擇，隨時隨地輕鬆租借，開啟你的閱讀之旅！
          </p>
          <Link to="/product" className="btn btn-primary btn-lg">
            立即開始租書 <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* 特色區塊 */}
      <section className="features py-5 text-center bg-light">
        <div className="container">
          <h2 className="mb-4">✨ 為什麼選擇我們？</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=800"
                  className="card-img-top"
                  alt="海量書籍"
                />
                <div className="card-body">
                  <h4 className="mt-3">海量書籍</h4>
                  <p>超過 10,000 本各種類型書籍，滿足你的閱讀需求。</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=800"
                  className="card-img-top"
                  alt="快速租借"
                />
                <div className="card-body">
                  <h4 className="mt-3">快速租借</h4>
                  <p>線上預約，線下取書，讓你輕鬆享受閱讀時光。</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=800"
                  className="card-img-top"
                  alt="低廉租金"
                />
                <div className="card-body">
                  <h4 className="mt-3">低廉租金</h4>
                  <p>最低只需 NT$10 即可租借心儀的書籍。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最新書籍區塊 */}
      <section className="container mt-5">
        <h2 className="text-center mb-4">
          <i className="fas fa-book"></i> 最新書籍
        </h2>
        <div className="row">
          {books.length > 0 ? (
            books.slice(0, 6).map((book) => (
              <div key={book.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={book.imageUrl}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{book.title}</h5>
                    <p className="card-text text-muted text-truncate">
                      {book.description}
                    </p>
                    <p className="fw-bold text-primary fs-5">
                      NT${book.price} / 週
                    </p>
                    <button
                      className="btn btn-outline-primary w-100 mt-auto"
                      onClick={() => handleViewMore(book.id)}>
                      <i className="fas fa-eye"></i> 查看詳情
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">
              <i className="fas fa-spinner fa-spin"></i> 書籍載入中...
            </p>
          )}
        </div>
      </section>

      {/* CTA 區塊 */}
      <section className="cta bg-primary text-white py-5 text-center mt-5">
        <div className="container">
          <h2>準備好開始閱讀了嗎？</h2>
          <p className="lead">立即註冊會員，開啟你的閱讀旅程！</p>
          <Link to="#" className="btn btn-light btn-lg">
            立即註冊 <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
