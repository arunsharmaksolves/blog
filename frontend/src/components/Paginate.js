export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    // console.log(typeof(items));
    return items.slice(startIndex, startIndex + pageSize); // 0, 9
  };