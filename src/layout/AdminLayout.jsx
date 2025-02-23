import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 呼叫 API 登出
      await axios.post(`${API_BASE}/logout`);

      // 清除 token
      document.cookie =
        "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // 轉向前台登入頁面
      navigate("/login");
    } catch (error) {
      console.error("登出失敗：", error);
      alert("登出失敗，請稍後再試！");
    }
  };

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
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/products">
                  📦 產品管理
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm ms-3"
                  onClick={handleLogout}>
                  登出
                </button>
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
