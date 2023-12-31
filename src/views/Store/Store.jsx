/*
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { getAllProducts } from "../../redux/Actions/Products/productsActions";
import Filters from '../../components/Filters/Filters'
import OrderByName from "../../components/OrderBYName/OrderByName";
import Searchbar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

const Store = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    
    return(
        <div>
            <Searchbar />
            <Filters/>
            <OrderByName/>
            <div>
                <Cards products={allProducts}/>
            </div>
        </div>
    )
    
    
}

export default Store;
*/

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { getAllProducts } from "../../redux/Actions/Products/productsActions";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";

const ITEMS_PER_PAGE = 6;
import OrderByName from "../../components/OrderBYName/OrderByName";
import Searchbar from "../../components/SearchBar/SearchBar";

const Store = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Esto preserva los filtros, aunque
    // no evita que los elementos <select> en filters
    // se reseteen
    if(allProducts.length == 0)
    {
      dispatch(getAllProducts());
    }
    
  }, [dispatch]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setItems(allProducts.slice(startIndex, endIndex));
    }
  }, [allProducts, currentPage]);

  const nextHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Searchbar />
      <Filters />
            <OrderByName/>
      <div>
        <Pagination
          currentPage={currentPage}
          items={items}
          nextHandler={nextHandler}
          prevHandler={prevHandler}
        />
        <Cards products={items} />
      </div>
    </div>
  );
};

export default Store;