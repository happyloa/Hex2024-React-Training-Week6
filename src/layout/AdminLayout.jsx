import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      {/* 導覽列 */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/admin/products">
            🛠️ 線上書屋 | 管理者後台
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
            aria-controls="adminNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/products">
                  📦 產品管理
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/orders">
                  📑 訂單管理
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
        <p className="mb-0">© 2024 管理者後台 | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
