import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { getCategories, filterProducts, clearFilters, anyFilter } from '../../redux/Actions/Products/productsActions'

const Filters = () => {
    const dispatch = useDispatch();

    const prices = [100, 500, 5000, 7500, 10000, 25000];
    
    const [filters, setFilters] = useState({
        category: undefined,
        price: undefined,
        sort: undefined,
    })

    const allCategories = useSelector(state=>state.categories)

    useEffect(()=>{
        dispatch(getCategories())
    },[])


    const showAll = () => {
            dispatch(clearFilters())
    }

    // Filter string es la query que se pasa por la action
    const createFilterString = (filters_obj) => {
        const filtersArr = [];

        for(const key of Object.keys(filters_obj))
        {
            console.log("Key: " + key);
            if(filters_obj[key] && filters_obj[key].length > 0)
            {
                filtersArr.push("" + key + "=" + filters_obj[key]);
            }
        }

        let filterString = "?";


        filterString += filtersArr.join("&");

        return filtersArr.length ? filterString : "";
    }

    const addCategory = (event) => {
        const category = event.target.value;

        // We should create the filter string here
        // and give it to the anyFilter action
        setFilters(prev => {return {...prev, category}} );

        const filterString = createFilterString({...filters, category});
        
        dispatch(filterProducts(filterString))
    }

    const changeMaxPrice = (event) => {
        const price = event.target.value;
        setFilters(prev => {return {...prev, price}});

        const filterString = createFilterString({...filters, price});
        dispatch(filterProducts(filterString))
    }

    const changeSort = (event) => {
        const sort = event.target.value;
        setFilters(prev => {return {...prev, sort}});
        
        const filterString = createFilterString({...filters, sort});
        dispatch(filterProducts(filterString))
    }




    return(
        <div>
            <p>Filtrar por categoria: </p>

            <select onChange={addCategory}>
                <option value={''}>-- Categoria --</option>
                {allCategories.map(category=><option value={category.name} key={category.id}>{category.name}</option>)}
            </select>
            <select onChange={changeMaxPrice}>
                <option value={''}>-- Precio Max. --</option>
                {prices?.map((price, index) => <option value={price} key={index}>${price} ARS</option>)}
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