export const filterOptions = {
  variants: [
    {
      label: 'Không áp dụng',
      value: '{ "isVariant": false }'
    },
    {
      label: 'Có biến thể',
      value: '{ "isVariant": false, "isManageVariant": true }'
    },
    {
      label: 'Không có biến thể',
      value: '{ "isVariant": false, "isManageVariant": false }'
    }
  ],
  statuses: [
    { label: 'Ẩn', value: 0 },
    { label: 'Hết hàng', value: 1 },
    { label: 'Đang bán', value: 2 },
    { label: 'Ngừng kinh doanh', value: 3 }
  ],
  priceRanges: [
    { label: 'Không áp dụng', value: '{ "min":-1, "max": -1 }' },
    { label: '0 - 200,000 đồng', value: '{ "min":0, "max": 200000 }' },
    {
      label: '200,000 - 500,000 đồng',
      value: '{ "min": 200000, "max": 500000 }'
    },
    {
      label: '500,000 - 700,000 đồng',
      value: '{ "min": 500000, "max": 700000 }'
    },
    {
      label: '700,000 - 1,000,000 đồng',
      value: '{ "min": 700000, "max": 1000000 }'
    },
    { label: '1,000,000 trở lên', value: '{ "min": 1000000 }' }
  ]
};
