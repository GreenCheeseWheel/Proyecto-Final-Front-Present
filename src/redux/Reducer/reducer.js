import { GET_PRODUCTS, GET_PRODUCT_NAME, GET_PRODUCT_ID, GET_PRODUCTS_CATEGORIES, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_FILTERED_PRODUCTS, CLEAR_FILTERS, ROLE } from "../Actions/action-types";

const initialState = {
    products: [],
    productsCopy: [],
    categories: [],
    updatedProduct: [],
    users: [],
    userRole: "USER",
    allUsers: [],
    searchType: "users",
}

console.log('PRODUCTS');
console.log(initialState.products);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsCopy: action.payload
            };
        case GET_PRODUCTS_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case GET_PRODUCT_NAME:
            console.log(action.payload);
            return {
                ...state,
                products: action.payload
            };
        case GET_PRODUCT_ID:
            return {
                ...state,
                products: [action.payload]
            };
        case CREATE_PRODUCT:
            return {
                ...state,
                products: action.payload
            };
        case UPDATE_PRODUCT:
            state.updatedProduct = action.payload;

            return {
                ...state
            };
        case DELETE_PRODUCT:
            const productToDelete = action.payload;
            const fileteredProducts = state.products.filter((product) => product.id !== productToDelete);

            return {
                ...state,
                products: fileteredProducts
            }
        case GET_FILTERED_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case CLEAR_FILTERS:
            return {
                ...state,
                products: [...state.productsCopy]
            }

            case ROLE:
                return {...state, userRole: action.payload};
          
              case "GET_PRODUCTS":
                return { ...state, allProducts: action.payload };

              case "SET_SEARCH_TYPE":
                return { ...state, searchType: action.payload.component };

              case "SEARCH_USERS":
                console.log("en reducer users: " + action.payload + state.products);
                return {
                  ...state,
                  products: state.allUsers.filter((user) =>
                    user.name.toUpperCase().includes(action.payload.toUpperCase())
                  ),
                };

              case "SEARCH_PRODUCTS":
                console.log(state.products);
                console.log(action.payload);
                return {
                  ...state,
                  products: state.allProducts.filter((product) =>
                    product.name.toUpperCase().includes(action.payload.toUpperCase())
                  ),
                };
              case "ORDERED": {
                const sortedProducts = [...state.products].sort((a, b) => {
                  if (action.payload) {
                    return a.name.localeCompare(b.name);
                  } else {
                    return b.name.localeCompare(a.name);
                  }
                });
                console.log(sortedProducts);
                return {
                  ...state,
                  products: sortedProducts,
                };
              }
        
        default:
            return {...state}
    }
}

export default reducer;

// Reemplazar lógica case ORDERED para traerlo desde el back
// Error búsqueda por nombre cuando se omiten la mayúscula inicial en cada palabra