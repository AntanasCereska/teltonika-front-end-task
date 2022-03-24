import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationDesktop } from "./components/NavigationDesktop/NavigationDesktop";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { NewUser } from "./pages/NewUser/NewUser";
import { Category } from "./pages/Category/Category";
import { NotFound404 } from "./pages/NotFound404/NotFound404";
import { useSelector } from "react-redux";
import { CreateCategory } from "./pages/CreateCategory/CreateCategory";
import { CreateSubCategory } from "./pages/CreateSubCategory/CreateSubCategory";
import { CreateSubSubCategory } from "./pages/CreateSubSubCategory/CreateSubSubCategory";
import { ScrollToTop } from "./utils/scrollToTop";
import { Settings } from "./pages/Settings/Settings";

const App = () => {
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  });

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <div className="App__header">
          <Header />
        </div>
        <div className="App__base">
          <div className="App__navigation">
            <NavigationDesktop />
          </div>
          <div className="App__content">
            <Routes>
              <Route index element={<NewUser />} />
              <Route path="/new-user" element={<NewUser />} />
              <Route path="/create-category" element={<CreateCategory />} />
              <Route
                path="/create-sub-category"
                element={<CreateSubCategory />}
              />
              <Route
                path="/create-sub-sub-category"
                element={<CreateSubSubCategory />}
              />
              <Route path="categories/:id/:subId" element={<Category />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound404 />} />
            </Routes>
          </div>
        </div>
        <div className="App__footer">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
