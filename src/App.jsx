import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "../src/assets/style.css";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
