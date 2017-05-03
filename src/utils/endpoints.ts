const ENDPOINTS = [
  {
    key: 'product',
    label: 'Product',
    path: 'products/438457'
  },
  {
    key: 'store',
    label: 'Store',
    path: 'stores/511'
  },
  {
    key: 'inventory',
    label: 'Inventory',
    path: 'stores/511/products/438457/inventory'
  },
  {
    key: 'product-inventory',
    label: 'Product Inventories',
    path: 'inventories?product_id=438457'
  },
  {
    key: 'stores-with-product',
    label: 'Stores with Product',
    path: 'stores?product_id=438457'
  },
  {
    key: 'stores-near-point',
    label: 'Stores Near Point',
    path: 'stores?lat=43.65838&lon=-79.44335'
  },
  {
    key: 'stores-near-with-product',
    label: 'Stores Near Point with Product',
    path: 'stores?lat=43.65838&lon=-79.44335&product_id=438457'
  }
];

export default ENDPOINTS;
