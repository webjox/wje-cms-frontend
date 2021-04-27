import config from '../../../config';

const defaultState = (setState, request) => ({
    checkout: {},
    search: '',
    userData: {},
    cart: {},
    filter: [],
    tags: [],
    categories: [],
    setCartItemsData: data => {
      setState(prevstate => {
        prevstate.cart = data;
        return { ...prevstate };
      });
    },
    setUserData: data => {
      setState(prevstate => {
        prevstate.userData = data;
        return { ...prevstate };
      });
    },
    setCheckout: data => {
      setState(prevstate => {
        prevstate.checkout = data;
        return { ...prevstate };
      });
    },
    setCartData: data => {
      setState(prevstate => {
        prevstate.cart = data;
        return { ...prevstate };
      });
    },
    setFilterData: data => {
      setState(prevstate => {
        prevstate.filter = data;
        return { ...prevstate };
      });
    },
    setCategoriesData: data => {
      setState(prevstate => {
        prevstate.categories = data;
        return { ...prevstate };
      });
    },
    setTagsData: data => {
      setState(prevstate => {
        prevstate.tags = data;
        return { ...prevstate };
      });
    },
    setSearchData: string => {
      setState(prevstate => {
        prevstate.search = string;
        return { ...prevstate };
      });
    },
    getUserData: async token => {
      const result = await request(`${config.serverAJAXurl}/customer-account`, 'POST', {
        token,
      });
      if (result.status === 200) return result.data;
      return {};
    },
    putUserData: async body => {
      const result = await request(`${config.serverAJAXurl}/customer-account`, 'PUT', body);
      if (result.status === 200) return result.data;
      return {};
    },
    getProductBySearch: async string => {
      const result = await request(`${config.serverAJAXurl}/products?search=${string}`);
      if (result.status === 200) return result.data;
      return [];
    },
    getProductBySlug: async id => {
      const result = await request(`${config.serverAJAXurl}/products?slug=${id}`);
      if (result.status === 200) return result.data[0];
      return [];
    },
    getProductById: async id => {
      const result = await request(`${config.serverAJAXurl}/products/${id}`);
      if (result.status === 200) return result.data;
      return [];
    },
    getProductByCategory: async id => {
      const result = await request(`${config.serverAJAXurl}/products?categoryId=${id}`);
      if (result.status === 200) return result.data;
      return [];
    },
    getProductsByFilter: async array => {
      let string = '';
      if (array.length !== 0) {
        array.forEach(item => {
          const replacedItem = item[1].replace(/ /g, '%20');
          string += `${item[0]}=${replacedItem}&`;
        });
      }
      const result = await request(`${config.serverAJAXurl}/products?${string}`);
      if (result.status === 200) return result.data;
      return [];
    },
    getImagesProductById: async id => {
      const result = await request(`${config.serverAJAXurl}/products/${id}/images`);
      if (result.status === 200) return result.data;
      return [];
    },
    getProductFilesById: async id => {
      const result = await request(`${config.serverAJAXurl}/products/${id}/files`);
      if (result.status === 200) return result.data;
      return [];
    },
    getCartData: async () => {
      const result = await request(`${config.serverAJAXurl}/cart`);
      if (result.status === 200) return result.data;
      return {};
    },
    putCart: async body => {
      const result = await request(`${config.serverAJAXurl}/cart`, 'PUT', body);
      if (result.status === 200) return result.data;
      return [];
    },
    addToCart: async item => {
      const result = await request(`${config.serverAJAXurl}/cart/items`, `POST`, item);
      if (result.status === 200)
        setState(prevstate => {
          prevstate.cart = result.data;
          return { ...prevstate };
        });
    },
    changeCart: async item => {
      const result = await request(`${config.serverAJAXurl}/cart/items`, `POST`, item);
      if (result.status === 200) return result.data;
      return [];
    },
    deleteItemFromCart: async id => {
      const result = await request(`${config.serverAJAXurl}/cart/items/${id}`, `DELETE`);
      if (result.status === 200) this.setCartData(await this.getCartData());
    },
    putCheckout: async body => {
      const result = await request(`${config.serverAJAXurl}/cart/checkout`, `PUT`, body);
      return result;
    },
    getTags: async () => {
      const result = await request(`${config.serverAJAXurl}/products/tags`);
      if (result.status === 200) return result.data;
      return [];
    },
    getTagId: async id => {
      const result = await request(`${config.serverAJAXurl}/products/tags/${String(id)}`);
      if (result.status === 200) return result.data;
      return [];
    },
    getCategories: async () => {
      const result = await request(`${config.serverAJAXurl}/categories`);
      if (result.status === 200) return result.data;
      return [];
    },
    getCategoryId: async id => {
      const result = await request(`${config.serverAJAXurl}/categories/${String(id)}`);
      if (result.status === 200) return result.data;
      return [];
    },
    getImagesCategoryById: async id => {
      const result = await request(`${config.serverAJAXurl}/categories/${id}/image`);
      if (result.status === 200) return result.data;
      return [];
    },
    getPages: async () => {
      const result = await request(`${config.serverAJAXurl}/pages`, 'POST', {});
      if (result.status === 200) return result.data;
      return [];
    },
    getPageById: async id => {
      const result = await request(`${config.serverAJAXurl}/pages/${String(id)}`, 'POST', {});
      if (result.status === 200) return result.data;
      return [];
    },
    registerUser: async item => {
      const result = await request(`${config.serverAJAXurl}/register`, `POST`, item);
      return result;
    },
    loginUser: async item => {
      const result = await request(`${config.serverAJAXurl}/login`, `POST`, item);
      if (result.status === 200) return result.data;
      return [];
    },
    getEffects: async () => {
      const result = await request(`${config.serverAJAXurl}/products/effects`);
      if (result.status === 200) return result.data;
      return [];
    },
    getShops: async () => {
      const result = await request(`${config.serverAJAXurl}/shops`);
      if (result.status === 200) return result.data;
      return [];
    },
    getManufacturers: async () => {
      const result = await request(`${config.serverAJAXurl}/products/manufacturers`);
      if (result.status === 200) return result.data;
      return [];
    },
    getShippingMethods: async () => {
      const result = await request(`${config.serverAJAXurl}/shipping_methods`);
      if (result.status === 200) return result.data;
      return [];
    },
    getPaymentMethods: async () => {
      const result = await request(`${config.serverAJAXurl}/payment_methods`);
      if (result.status === 200) return result.data;
      return [];
    },});

export default defaultState;
