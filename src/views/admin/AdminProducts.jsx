import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as bootstrap from "bootstrap";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const AdminProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = `${token}`;

    checkAdmin();
    fetchProducts();
  }, []);

  // 檢查管理者身份
  const checkAdmin = async () => {
    try {
      await axios.post(`${API_BASE}/api/user/check`);
    } catch (err) {
      navigate("/");
      alert(err.response.data.message);
    }
  };

  // 取得產品列表
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products/all`
      );
      setProducts(Object.values(res.data.products)); // 轉換為陣列
    } catch (error) {
      console.error("取得產品失敗：", error);
    }
  };

  // 刪除產品
  const deleteProduct = async (id) => {
    if (!window.confirm("確定要刪除這個產品嗎？")) return;
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("刪除產品失敗：", error);
    }
  };

  // 開啟新增/編輯產品 Modal
  const openProductModal = (product = {}) => {
    setIsEdit(!!product.id);
    setTempProduct(product);

    const modalElement = document.getElementById("productModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  };

  // 處理表單輸入變更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProduct({ ...tempProduct, [name]: value });
  };

  // 送出新增/編輯產品
  const submitProduct = async () => {
    try {
      if (isEdit) {
        await axios.put(
          `${API_BASE}/api/${API_PATH}/admin/product/${tempProduct.id}`,
          {
            data: tempProduct,
          }
        );
      } else {
        await axios.post(`${API_BASE}/api/${API_PATH}/admin/product`, {
          data: tempProduct,
        });
      }
      fetchProducts();
      const modalElement = document.getElementById("productModal");
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    } catch (error) {
      console.error("儲存產品失敗：", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">📦 管理者產品列表</h1>
      <button
        className="btn btn-success mb-3"
        onClick={() => openProductModal({})}>
        <i className="fas fa-plus"></i> 新增產品
      </button>

      {/* 產品列表 */}
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>產品名稱</th>
            <th>價格</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>NT${product.price}</td>
                <td>
                  {product.is_enabled ? (
                    <i className="fas fa-check text-success"></i>
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openProductModal(product)}>
                    <i className="fas fa-edit"></i> 編輯
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(product.id)}>
                    <i className="fas fa-trash-alt"></i> 刪除
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                <i className="fas fa-spinner fa-spin"></i> 載入中...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 產品管理 Modal */}
      <div className="modal fade" id="productModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? (
                  <i className="fas fa-edit"></i>
                ) : (
                  <i className="fas fa-plus"></i>
                )}{" "}
                {isEdit ? "編輯產品" : "新增產品"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">產品名稱</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={tempProduct.title || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">價格</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={tempProduct.price || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">描述</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={tempProduct.description || ""}
                  onChange={handleInputChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">上架狀態</label>
                <select
                  name="is_enabled"
                  className="form-select"
                  value={tempProduct.is_enabled ? "1" : "0"}
                  onChange={(e) =>
                    setTempProduct({
                      ...tempProduct,
                      is_enabled: e.target.value === "1",
                    })
                  }>
                  <option value="1">
                    <i className="fas fa-check text-success"></i> 上架
                  </option>
                  <option value="0">
                    <i className="fas fa-times text-danger"></i> 未上架
                  </option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitProduct}>
                {isEdit ? "儲存變更" : "新增產品"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
