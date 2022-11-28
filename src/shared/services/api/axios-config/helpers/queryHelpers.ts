const queryHelpers = (filters: { [x: string]: string | number }) => {
  if (filters['size'] === 0) delete filters['size'];

  return encodeURI(
    Object.keys(filters)
      .map((key) =>
        filters[key] !== undefined && filters[key] !== ''
          ? key + '=' + filters[key]
          : ''
      )
      .filter((item) => item !== '')
      .join('&')
  );
};

export default queryHelpers;
