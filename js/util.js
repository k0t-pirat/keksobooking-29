const RANGE_FILTER_TYPE = 'price';
const LIST_FILTER_TYPE = 'features';
const Price = {
  LOW: 10000,
  HIGH: 50000,
};

const getFilteredData = (data, filter) => {
  let filteredData = [...data];

  Object.entries(filter).forEach(([filterType, filterValue]) => {
    if (filterType === RANGE_FILTER_TYPE) {
      filteredData = filteredData.filter((item) => {
        const price = Number(item.offer[filterType]);

        switch (filterValue) {
          case 'low':
            return price < Price.LOW;
          case 'middle':
            return price >= Price.LOW && price <= Price.HIGH;
          case 'high':
            return price > Price.HIGH;
          default:
            return true;
        }
      });
    } else if (filterType.includes(LIST_FILTER_TYPE)) {
      filteredData = filteredData.filter((item) => item.offer[LIST_FILTER_TYPE] && item.offer[LIST_FILTER_TYPE].includes(filterValue) || !filterValue);
    } else {
      filteredData = filteredData.filter((item) => String(item.offer[filterType]) === String(filterValue) || !filterValue);
    }
  });

  return filteredData;
};

export {getFilteredData};