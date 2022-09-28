import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import logo from "./assets/images/logo.svg";

import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <img src={logo} alt="logo" />
        </div>
      </header>
      <main className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
