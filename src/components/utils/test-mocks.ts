import { v4 as uuidv4 } from "uuid";
import { IIngredientsWithIdx } from "../types/ingredient-types";
import { IWsOrders } from "../types/order-types";

export const ingredient1: IIngredientsWithIdx = {
  _id: "643d69a5c3f7b9001cfa0949",
  name: "Мини-салат Экзо-Плантаго",
  type: "main",
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 6,
  price: 440,
  image: "https://code.s3.yandex.net/react/code/salad.png",
  image_mobile: "https://code.s3.yandex.net/react/code/salad-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/salad-large.png",
  _v: 0,
  idx: uuidv4(),
};

export const ingredient2: IIngredientsWithIdx = {
  _id: "643d69a5c3f7b9001cfa0940",
  name: "Говяжий метеорит (отбивная)",
  type: "main",
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: "https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
  _v: 0,
  idx: uuidv4(),
};

export const ingredient3: IIngredientsWithIdx = {
  _id: "643d69a5c3f7b9001cfa0943",
  name: "Соус фирменный Space Sauce",
  type: "sauce",
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  _v: 0,
  idx: uuidv4(),
};

export const mockUser = Object.freeze({
  name: "Urbexь",
  email: "urbexmax@yandex.ru",
  password: "123456789",
});

export const mockOrder = Object.freeze({
  success: true,
  name: "Space флюоресцентный традиционный-галактический люминесцентный бургер",
  order: {
    ingredients: [
      {
        _id: "643d69a5c3f7b9001cfa093d",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa0943",
        name: "Соус фирменный Space Sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa093e",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa093e",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa0944",
        name: "Соус традиционный галактический",
        type: "sauce",
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: "https://code.s3.yandex.net/react/code/sauce-03.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
        __v: 0,
      },
    ],
    _id: "66a77a49119d45001b4fc4b9",
    owner: {
      name: "Urbexь",
      email: "urbexmax@yandex.ru",
      createdAt: "2024-06-18T10:53:57.921Z",
      updatedAt: "2024-06-19T06:44:39.722Z",
    },
    status: "done",
    name: "Space флюоресцентный традиционный-галактический люминесцентный бургер",
    createdAt: "2024-07-29T11:17:29.524Z",
    updatedAt: "2024-07-29T11:17:29.914Z",
    number: 47772,
    price: 3059,
  },
});

export const mockOrders: IWsOrders = {
  success: true,
  orders: [
    {
      _id: "66a77a49119d45001b4fc4b9",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0944",
      ],
      status: "done",
      name: "Space флюоресцентный традиционный-галактический люминесцентный бургер",
      createdAt: "2024-07-29T11:17:29.524Z",
      updatedAt: "2024-07-29T11:17:29.914Z",
      number: 47772,
    },
  ],
  total: 1,
  totalToday: 1,
};

export const mockBun: IIngredientsWithIdx = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  _v: 0,
  idx: uuidv4(),
};

export const mockIngredients = [ingredient1, ingredient2, ingredient3];
