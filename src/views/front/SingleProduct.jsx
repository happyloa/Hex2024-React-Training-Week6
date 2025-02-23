import { useLocation } from "react-router-dom";

const SingleProduct = () => {
  const location = useLocation();
  const product = location.state?.productData.product;

  if (!product) {
    return (
      <div className="container mt-5 text-center">沒有可用的產品資料。</div>
    );
  }

  return (
    <div className="container mt-5">
      {/* 產品詳情區塊 */}
      <div className="row">
        {/* 左側 - 書籍圖片 */}
        <div className="col-md-6">
          <div className="product-image border rounded p-3 shadow-sm">
            <img
              src={product.imageUrl}
              className="img-fluid rounded"
              alt={product.title}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* 右側 - 產品資訊 */}
        <div className="col-md-6">
          <h1 className="fw-bold">{product.title}</h1>
          <p className="text-muted">分類: {product.category}</p>

          {/* 價格區塊 */}
          <div className="price-box bg-light p-3 rounded">
            <p className="text-decoration-line-through text-muted">
              原價: <span className="fw-bold">NT${product.origin_price}</span>
            </p>
            <h3 className="text-danger fw-bold">現價: NT${product.price}</h3>
            <p className="small text-muted">單位: {product.unit}</p>
          </div>

          {/* 產品描述 */}
          <div className="mt-3">
            <h5>📖 內容簡介</h5>
            <p className="text-muted">{product.description}</p>
          </div>

          {/* CTA 按鈕 */}
          <button className="btn btn-primary btn-lg w-100 mt-3">
            立即租借
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
