import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="position-relative vh-100 d-flex align-items-center justify-content-center text-center text-white"
      style={{
        background:
          "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat",
      }}>
      {/* 遮罩層 */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ background: "rgba(0, 0, 0, 0.6)", zIndex: "1" }}></div>

      {/* 內容 */}
      <div className="position-relative z-2">
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="mb-4">你要找的內容不存在</h2>
        <Link to="/" className="btn btn-light btn-lg">
          回到首頁
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
