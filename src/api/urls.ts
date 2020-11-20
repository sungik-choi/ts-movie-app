export const generateSearchUrl = (searchValue: string): string =>
  `${process.env.REACT_APP_API_URL}${searchValue}${process.env.REACT_APP_API_KEY}`;

export const defaultUrl = generateSearchUrl('man');
