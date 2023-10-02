import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { getCategories, filterProducts, clearFilters, anyFilter } from '../../redux/Actions/Products/productsActions'

const Filters = () => {
    const dispatch = useDispatch();

    

    const prices = [50, 500, 5000, 7500, 10000];
    const [filters, setFilters] = useState({
        category: undefined,
        price: undefined,
        sort: undefined,
    })

    const allCategories = useSelector(state=>state.categories)

    useEffect(()=>{
        dispatch(getCategories())
    },[])

    const handleFilter = (event) => {
            dispatch(filterProducts(event.target.value))
        } 

    const showAll = () => {
            dispatch(clearFilters())

    }


    // ESTO ACA ABAJO ES LO MIO
    const createFilterString = (filters_obj) => {
        const filtersArr = [];
        let filterString = "?";

        filters_obj.category ? filtersArr.push(`category=${filters_obj.category}`) : "";
        filters_obj.price ? filtersArr.push(`price=${filters_obj.price}`) : ""
        filters_obj.sort ? filtersArr.push(`sort=${filters_obj.sort}`) : "";
        

        filterString += filtersArr.join("&");
        return filterString.length > 1 ? filterString : "";
    }

    const addCategory = (event) => {
        const category = event.target.value;
        // We should create the filter string here
        // and give it to the anyFilter action
        setFilters(prev => {return {...prev, category}} );

        const filterString = createFilterString({...filters, category});
        dispatch(anyFilter(filterString));
        
        //dispatch(filterProducts(event.target.value))
    }

    const changeMaxPrice = (event) => {
        const price = event.target.value;
        setFilters(prev => {return {...prev, price}});

        const filterString = createFilterString({...filters, price});
        dispatch(anyFilter(filterString));
    }

    const changeSort = (event) => {
        const sort = event.target.value;
        setFilters(prev => {return {...prev, sort}});
        
        const filterString = createFilterString({...filters, sort});
        dispatch(anyFilter(filterString));
    }




    return(
        <div>
            <p>Filtrar por categoria: </p>

            <select onChange={addCategory}>
                <option value={''}>-- Categoria --</option>
                {allCategories.map(category=><option value={category.name} key={category.id}>{category.name}</option>)}
            </select>
            <select onChange={changeMaxPrice}>
                <option value={''}>-- Precio --</option>
                {prices?.map((price, index) => <option value={price} key={index}>${price} USD</option>)}
            </select>
            <select onChange={changeSort} >
                <option value={''}>-- Ordenar por Precio --</option>
                <option value={"asc"}>Ascendente</option>
                <option value={"desc"}>Descendente</option>
            </select>

            <button onClick={showAll}> Restablecer filtros </button>

        </div>
    )
}

export default Filters;