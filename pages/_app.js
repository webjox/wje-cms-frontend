import '../styles/globals.css'
import globalState from '../src/state/globalStateContext/context';
import { useEffect, useState } from 'react';
import api from '../server/api';
import store from 'store';
import { useHttp } from '../src/hooks/useHttp';
import config from '../config';


function MyApp({ Component, pageProps }) {
  const {request} = useHttp();

  const [state, setState] = useState({
    checkout:   {},
    search:     '',
    userData:   {},
    cart:       {},
    filter:     [],
    tags:       [],
    categories: [],
    setCartItemsData: (data) => {
      setState(prevstate => {
        prevstate.cart = data;
        return {...prevstate};
      })
    },
    setUserData: (data) => {
      setState(prevstate => {
        prevstate.userData = data;
        return {...prevstate};
      })
    },
    setCheckout: (data) => {
      setState(prevstate => {
        prevstate.checkout = data;
        return {...prevstate};
      })
    },
    setCartData: (data) => {
      setState(prevstate => {
        prevstate.cart = data;
        return {...prevstate};
      })
    },
    setFilterData: (data) => {
      setState(prevstate => {
        prevstate.filter = data;
        return {...prevstate};
      })
    },
    setCategoriesData: (data) => {
      setState(prevstate => {
        prevstate.categories = data;
        return {...prevstate};
      }) 
    },
    setTagsData: (data) => {
      setState(prevstate => {
        prevstate.tags = data;
        return {...prevstate};
      }) 
    },
    setSearchData: (string) => {
      setState(prevstate => {
        prevstate.search = string;
        return {...prevstate};
      }) 
    },
    getUserData: async (token) => {
      const result = await request(`${config.serverAJAXurl}/customer-account`, 'POST', {
        token,
      })
      if(result.status === 200) return result.data;
      else return {};
    },
    putUserData: async (body) => {
      const result = await request(`${config.serverAJAXurl}/customer-account`, 'PUT', body)
      if(result.status === 200) return result.data;
      else return {};
    },
    getProductBySearch: async (string) => {
      const result = await request(`${config.serverAJAXurl}/products?search=${string}`);
      if(result.status === 200) return result.data;
      else return [];
    },
    getProductBySlug: async (id) => {
      const result = await request(`${config.serverAJAXurl}/products?slug=${id}`);
      if(result.status === 200) return result.data[0];
      else return [];
    },
    getProductById: async (id) => {
      const result = await request(`${config.serverAJAXurl}/products/${id}`);
      if(result.status === 200) return result.data;
      else return [];
    },
    getProductByCategory: async (id) => {
      const result = await request(`${config.serverAJAXurl}/products?categoryId=${id}`);
      if(result.status === 200) return result.data;
      else return [];
    },
    getProductsByFilter: async (array) => {
      let string = '';
      if(array.length !== 0){
        array.forEach(item => {
          let replacedItem = item[1].replace(/ /g, '%20');
          string += `${item[0]}=${replacedItem}&`
        })
      }
      const result = await request(`${config.serverAJAXurl}/products?${string}`);
      if(result.status === 200) return result.data
      else return [];
    },
    getImagesProductById: async (id) => {
      const result = await request(`${config.serverAJAXurl}/products/${id}/images`);
      if(result.status === 200) return result.data
      else return [];
    },
    getProductFilesById: async (id) => {
      const result = await request(`${config.serverAJAXurl}/products/${id}/files`);
      if(result.status === 200) return result.data
      else return [];
    },
    getCartData: async () => {
      const result = await request(`${config.serverAJAXurl}/cart`);
      if(result.status === 200) return result.data
      else return {};
    },
    putCart: async (body) => {
      const result = await request(`${config.serverAJAXurl}/cart`, 'PUT', body);
      if(result.status === 200) return result.data
      else return [];
    },
    addToCart: async (item) => {
      const result = await request(`${config.serverAJAXurl}/cart/items`, `POST`, item);
      if(result.status === 200) setState(prevstate => {
        prevstate.cart = result.data;
        return {...prevstate}
      })
    },
    changeCart: async (item) => {
      const result = await request(`${config.serverAJAXurl}/cart/items`, `POST`, item);
      if(result.status === 200) return result.data
      else return [];
    },
    deleteItemFromCart: async (id) => {
      const result = await request(`${config.serverAJAXurl}/cart/items/${id}`, `DELETE`);
      if(result.status === 200) state.setCartData(await state.getCartData())
    },
    putCheckout: async (body) => {
      const result = await request(`${config.serverAJAXurl}/cart/checkout`, `PUT`, body);
      return result;
    },
    getTags: async () => {
      const result = await request(`${config.serverAJAXurl}/products/tags`);
      if(result.status === 200) return result.data
      else return [];
    },
    getTagId: async (id) => {
      const result = await request(`${config.serverAJAXurl}/products/tags/${String(id)}`);
      if(result.status === 200) return result.data
      else return [];
    },
    getCategories: async () => {
      const result = await request(`${config.serverAJAXurl}/categories`);
      if(result.status === 200) return result.data
      else return [];
    },
    getCategoryId: async (id) => {
      const result = await request(`${config.serverAJAXurl}/categories/${String(id)}`);
      if(result.status === 200) return result.data
      else return [];
    },
    getImagesCategoryById: async (id) => {
      const result = await request(`${config.serverAJAXurl}/categories/${id}/image`);
      if(result.status === 200) return result.data
      else return [];
    },
    getPages: async () => {
      const result = await request(`${config.serverAJAXurl}/pages`, 'POST', {});
      if(result.status === 200) return result.data
      else return [];
    },
    getPageById: async (id) => {
      const result =  await request(`${config.serverAJAXurl}/pages/${String(id)}`, 'POST', {});
      if(result.status === 200) return result.data
      else return [];
    },
    registerUser: async (item) => {
      const result = await request(`${config.serverAJAXurl}/register`, `POST`, item);
      return result;
    },
    loginUser: async (item) => {
      const result = await request(`${config.serverAJAXurl}/login`, `POST`, item);
      if(result.status === 200) return result.data
      else return [];
    },
    getEffects: async () => {
      const result = await request(`${config.serverAJAXurl}/products/effects`);
      if(result.status === 200) return result.data
      else return [];
    },
    getShops: async () => {
      const result = await request(`${config.serverAJAXurl}/shops`);
      if(result.status === 200) return result.data
      else return [];
    },
    getManufacturers: async () => {
      const result = await request(`${config.serverAJAXurl}/products/manufacturers`);
      if(result.status === 200) return result.data
      else return [];
    },
    getShippingMethods: async () => {
      const result = await request(`${config.serverAJAXurl}/shipping_methods`)
      if(result.status === 200) return result.data;
      else return [];
    },
    getPaymentMethods: async () => {
      const result = await request(`${config.serverAJAXurl}/payment_methods`)
      if(result.status === 200) return result.data;
      else return [];
    },
  });

  // get user data
  useEffect(async () => {
    if(Object.keys(state.userData).length == 0) {
      const authData = store.get('auth_data') || null;
      if(authData) {
      const userData = await request(`${config.serverAJAXurl}/customer-account`, 'POST', {
        token: authData.token
      })
      if(userData){
        const featuredProducts = localStorage.getItem('featuredProducts');
        if(!featuredProducts){
          localStorage.setItem('featuredProducts', JSON.stringify(userData.customer_settings.featured_products));
        }
        else{
          const concated = Array.from(new Set (userData.customer_settings.featured_products.concat(JSON.parse(featuredProducts))));
          userData.customer_settings.featured_products = concated;
        }
        state.setUserData(userData);
      }
    }}
  }, [])

  // get featured
  useEffect(async() => {
      if(state.userData.customer_settings){
        const featuredProducts = localStorage.getItem('featuredProducts');
        if(!featuredProducts){
          localStorage.setItem('featuredProducts', JSON.stringify(state.userData.customer_settings.featured_products));
        }
        else{
          const concated = Array.from(new Set (state.userData.customer_settings.featured_products.concat(JSON.parse(featuredProducts))));
          localStorage.setItem('featuredProducts', JSON.stringify(concated));
        }  
      }
  }, [state.userData])
  
  // get categories
  useEffect(async() => {
    state.setCategoriesData(await state.getCategories())
  }, [])
  // get tags
  useEffect(async() => {
    state.setTagsData(await state.getTags())
  }, [])

  // get cart
  useEffect(async() => {
    state.setCartData(await state.getCartData())
  }, [])

  const stateObject = {state, setState}

  return (
      <globalState.Provider value={stateObject}>
        <script src="https://api-maps.yandex.ru/2.1/?apikey=9715d01b-4d9a-4324-b7de-12087ac8b9b4&lang=ru_RU" type="text/javascript"/>
        <Component {...pageProps} />  
      </globalState.Provider>
  )
}

export default MyApp
