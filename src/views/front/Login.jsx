import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, data);
      const { token, expired } = response.data;

      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common.Authorization = `${token}`;

      navigate("/admin/products");
    } catch (error) {
      alert("登入失敗: " + error.response.data.message);
    }
  };

  return (
    <div>
      {/* Hero 區塊 */}
      <section
        className="hero position-relative text-center text-white d-flex align-items-center"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920&auto=format&fit=crop') center/cover",
          height: "400px",
        }}>
        {/* 遮罩層 */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0, 0, 0, 0.6)", zIndex: "1" }}></div>

        {/* Hero 內文 */}
        <div className="container position-relative z-2">
          <h1 className="display-4 fw-bold">🔑 管理者後台登入</h1>
        </div>
      </section>

      {/* 登入表單 */}
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}>
        <div
          className="card shadow-lg p-4 border-0 rounded-3"
          style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">請先登入</h2>
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email 輸入框 */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control shadow-sm ${
                  errors.username ? "is-invalid" : ""
                }`}
                id="username"
                placeholder="name@example.com"
                {...register("username", {
                  required: "請輸入 Email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email 格式不正確",
                  },
                })}
              />
              <label htmlFor="username">📧 Email</label>
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
              )}
            </div>

            {/* 密碼輸入框 */}
            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control shadow-sm ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "請輸入密碼",
                  minLength: {
                    value: 6,
                    message: "密碼長度需至少 6 位",
                  },
                })}
              />
              <label htmlFor="password">🔒 密碼</label>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* 登入按鈕 */}
            <button
              className="btn btn-lg btn-primary w-100 mt-3 shadow-sm"
              type="submit">
              立即登入
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
