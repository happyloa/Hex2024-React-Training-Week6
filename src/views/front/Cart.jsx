import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // 取得購物車商品列表
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartItems(res.data.data.carts);
      setTotalPrice(res.data.data.total);
    } catch (error) {
      console.error("取得購物車資料時發生錯誤：", error);
    }
  };

  // 刪除購物車內商品
  const removeItem = async (cartId) => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${cartId}`);
      fetchCart(); // 刷新購物車
    } catch (error) {
      console.error("刪除購物車商品失敗：", error);
    }
  };

  // 修改商品數量
  const updateQuantity = async (cartId, newQty, productId) => {
    if (newQty < 1) return;
    try {
      await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cartId}`, {
        data: { product_id: productId, qty: newQty },
      });
      fetchCart(); // 更新購物車
    } catch (error) {
      console.error("修改數量失敗：", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      {/* Hero 區塊 */}
      <section
        className="hero position-relative text-center text-white d-flex align-items-center"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1619191163420-4a7c0798b8a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover",
          height: "400px",
        }}>
        {/* 遮罩層 */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0, 0, 0, 0.6)", zIndex: "1" }}></div>

        {/* Hero 內文 */}
        <div className="container position-relative z-2">
          <h1 className="display-4 fw-bold">🛒 購物車</h1>
        </div>
      </section>

      {/* 購物車內容 */}
      <section className="container mt-5">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-center fs-4 text-muted">你的購物車是空的 🛍️</p>
            <Link to="/product" className="btn btn-primary btn-lg mt-3">
              🛒 前往購物
            </Link>
          </div>
        ) : (
          <div className="row">
            {/* 購物車商品列表 */}
            <div className="col-lg-8">
              <div className="table-responsive">
                <table className="table align-middle text-center">
                  <thead>
                    <tr>
                      <th>商品</th>
                      <th>數量</th>
                      <th>單價</th>
                      <th>小計</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="d-flex align-items-center">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="me-3 rounded"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                          <span className="fw-bold">{item.product.title}</span>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-secondary btn-sm me-2"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.qty - 1,
                                item.product_id
                              )
                            }>
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="mx-2">{item.qty}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm ms-2"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.qty + 1,
                                item.product_id
                              )
                            }>
                            <i className="fas fa-plus"></i>
                          </button>
                        </td>
                        <td className="fw-bold text-primary">
                          NT${item.product.price}
                        </td>
                        <td className="fw-bold">
                          NT${item.product.price * item.qty}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeItem(item.id)}>
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 總結區塊 */}
            <div className="col-lg-4">
              <div className="border p-4 bg-light rounded shadow-sm">
                <h4 className="fw-bold">結帳資訊</h4>
                <p className="fs-5">
                  總金額:{" "}
                  <span className="fw-bold text-danger">NT${totalPrice}</span>
                </p>
                <button className="btn btn-success w-100 mt-3">
                  <i className="fa-solid fa-money-bill"></i> 前往結帳
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
