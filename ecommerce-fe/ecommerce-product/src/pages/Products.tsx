import { useEffect } from "react";
import { CategoryService } from "../../services/category/categoryService";
import { useDispatch } from "react-redux";
import { setCategories } from "../store/slices/categorySlice";
import { SubNavBar } from "../components/SubNavBar";
import { ProductList } from "../components/ProductList";

const Products = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const categoryService = new CategoryService();
    categoryService.getCategories().then((res: any) => {
      dispatch(setCategories(res.data));
    });
  }, []);
  return (
    <>
      <SubNavBar />
      <ProductList />
    </>
  );
};

export default Products;
