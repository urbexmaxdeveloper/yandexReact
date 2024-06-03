import { normaApi } from "./config";
 
export const getIngredients = () => {
    return fetch(`${normaApi}/ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Error get ingridients');
    });
  };
  