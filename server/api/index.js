import CategoriesApi from './categoriesApi';
import CustomerGroupsApi from './customerGroupsApi';
import CustomersApi from './customersApi';
import FilesApi from './filesApi';
import NotificationsApi from './notificationsApi';
import OrdersApi from './ordersApi';
import OrderStatusesApi from './orderStatuses';
import PagesApi from './pagesApi';
import PaymentMethodsApi from './paymentMethods';
import ProductsApi from './products';
import RedirectsApi from './redirectsApi';
import SettingsApi from './settingsApi';
import ShippingMethodsApi from './shippingMethodsApi';
import SitemapApi from './sitemap';
import TokensApi from './tokensApi';
import WebhooksApi from './webhooksApi';
import ProductTagsApi from './productTagsApi';
import ProductImportApi from './productImportApi';
import ShopsApi from './shopsApi';

export default {
    categories: CategoriesApi,
    customerGroups: CustomerGroupsApi,
    customers: CustomersApi,
    files: FilesApi,
    notifications: NotificationsApi,
    orders: OrdersApi,
    orderStatuses: OrderStatusesApi,
    pages: PagesApi,
    paymentMethods: PaymentMethodsApi,
    products: ProductsApi,
    redirects: RedirectsApi,
    settings: SettingsApi,
    shippingMethods: ShippingMethodsApi,
    sitemap: SitemapApi,
    tokens: TokensApi,
    webhooks: WebhooksApi,
    productTags: ProductTagsApi,
    productImport: ProductImportApi,
    shops: ShopsApi
}