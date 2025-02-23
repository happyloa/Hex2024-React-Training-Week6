import { Outlet, Link } from "react-router-dom";

const FrontendLayout = () => {
  return (
    <div>
      {/* 導覽列 */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            我的網站
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  產品頁面
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  購物車
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  登入
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 主要內容區塊 */}
      <Outlet />

      {/* 頁尾 */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">
          © 六角 2024 React 作品實戰冬季班第六週作業 - Vite、React Router
          <br />
          by{" "}
          <a href="https://www.worksbyaaron.com" target="_blank">
            Aaron
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default FrontendLayout;
