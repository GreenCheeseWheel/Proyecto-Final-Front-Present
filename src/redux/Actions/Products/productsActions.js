import { GET_PRODUCTS, GET_PRODUCT_NAME, GET_PRODUCT_ID, GET_PRODUCTS_CATEGORIES, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_FILTERED_PRODUCTS,CLEAR_FILTERS, SEARCH_PRODUCTS, ORDERED } from "../action-types";
import axios from "axios";

export const getAllProducts = () => {
    return async (dispatch) => {
        try {
            //const { data } = await axios.get('https://pf-back-deploy.onrender.com/product');
            const { data } = await axios.get('http://localhost:3001/product');

            dispatch({
                type: GET_PRODUCTS,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const getProductByName = (name) => {
    return async (dispatch) => {
        try {
            //const { data } = await axios.get(`https://pf-back-deploy.onrender.com/product?name=${name}`);
            const { data } = await axios.get(`http://localhost:3001/product?name=${name}`);

            dispatch({
                type: GET_PRODUCT_NAME,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const getProductByID = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://pf-back-deploy.onrender.com/product/${id}`);

            dispatch({
                type: GET_PRODUCT_ID,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const getCategories = () => {
    return async (dispatch) => {
        try {
            //const { data } = await axios.get('https://pf-back-deploy.onrender.com/category');
            const { data } = await axios.get('http://localhost:3001/category');
            console.log("DATA CATEG: " + JSON.stringify(data))
            dispatch({
                type: GET_PRODUCTS_CATEGORIES,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const createProduct = (body) => {
    return async (dispatch) => {
        try {
            //const { data } = await axios.post('https://pf-back-deploy.onrender.com/product', body);
            const { data } = await axios.post('http://localhost:3001/product', body);
            dispatch({
                type: CREATE_PRODUCT,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const updateProduct = (id, body) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`https://pf-back-deploy.onrender.com/product/${id}`, body);

            dispatch({
                type: UPDATE_PRODUCT,
                payload: data
            });

        } catch (error) {
            console.log(error);
        }
    }
};

export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`https://pf-back-deploy.onrender.com/product/${id}`);

            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            });

        } catch (error) {
            console.log(error);
        }
    }
};

export const filterProducts = (filter) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://pf-back-deploy.onrender.com/product${filter}`);
            dispatch({
                type: GET_FILTERED_PRODUCTS,
                payload: data
            })
            

        } catch (error) {
            console.log(error);
        }
    }
} 

export const clearFilters = () => {
    return async (dispatch) => {
        try {
            dispatch({ type:CLEAR_FILTERS })
        }catch (error) {
            alert(error.response.data) 
        }
    }
}

export const searchProducts = (searched) => {
    return { type: SEARCH_PRODUCTS, payload: searched };
  };

  export const ordered = (order) => {
    return { type: ORDERED, payload: order };
  };
  
  export const anyFilter = (filter) => {
    return async (dispatch) => {
        try {
            // https://pf-back-deploy.onrender.com/product${filter}
            const { data } = await axios.get(`http://localhost:3001/product${filter}`);
            
            if(typeof data == "string")
            {
                dispatch({
                    type: GET_FILTERED_PRODUCTS,
                    payload: []
                })
            }
            else
            {
                dispatch({
                    type: GET_FILTERED_PRODUCTS,
                    payload: [...data]
                })
            }
            

        } catch (error) {
            dispatch({
                type: GET_FILTERED_PRODUCTS,
                payload: [],
            })
            console.log(error);
        }
    }
}