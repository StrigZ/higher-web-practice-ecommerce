import { it, expect, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';

import {
  addToCart,
  decrementItemQuantity,
  initialState,
  removeItem,
} from './cart-slice';

import { rootReducer } from '@/store/store';
import type { Cart, Product } from '@/types';

const createMockStore = () => configureStore({ reducer: rootReducer });
const createMockItem = (product: Product) => ({
  product,
  price: product.price,
  productId: product.id,
  quantity: 1,
});

const mockProduct: Product = {
  id: '3e6e9a7a-0a5f-4e2d-9b0a-2e8d6e4c1a01',
  name: 'Председатель',
  description:
    'Густые прямые усы с характерным направлением вниз. Подходят для уверенных решений и серьёзных заявлений.',
  price: 5590,
  images: [
    '/mustashes/chairman/0.png',
    '/mustashes/chairman/1.png',
    '/mustashes/chairman/2.png',
    '/mustashes/chairman/3.png',
  ],
  characteristics: {
    категория: 'Классические',
    подкатегория: 'Деловые',
    стиль: 'Военный',
    форма: 'Короткий прямоугольник',
    густота: 'Средняя',
    закрученность: 'Низкая',
    харизма: '5',
  },
  inStock: true,
  rating: 4.5,
  ratingCount: 2,
  createdAt: '2026-03-01T09:00:00Z',
};
const anotherMockProduct: Product = {
  id: '6a1c2d3e-4f50-4a61-8b72-9c83ad94be02',
  name: 'Джентльмен',
  description:
    'Аккуратные симметричные усы средней густоты. Подходят для деловых встреч и неспешных прогулок.',
  price: 1790,
  images: [
    '/mustashes/gentelmen/0.png',
    '/mustashes/gentelmen/1.png',
    '/mustashes/gentelmen/2.png',
    '/mustashes/gentelmen/3.png',
    '/mustashes/gentelmen/4.png',
  ],
  characteristics: {
    категория: 'Классические',
    подкатегория: 'Деловые',
    стиль: 'Классический',
    форма: 'Аккуратная симметрия',
    густота: 'Средняя',
    закрученность: 'Низкая',
    харизма: '4',
  },
  inStock: true,
  rating: 0,
  ratingCount: 0,
  createdAt: '2026-03-01T10:00:00Z',
};

it('initialized correctly', () => {
  const store = createMockStore();
  const state = store.getState();

  expect(state.cart).toEqual(initialState);
});

describe('addToCart', () => {
  it('handles adding new item correctly', () => {
    const store = createMockStore();

    const mockItem = createMockItem(mockProduct);
    const expectedState: Cart = {
      items: [mockItem],
      totalItems: 1,
      totalPrice: mockItem.price,
    };

    store.dispatch(addToCart({ item: mockItem }));

    const state = store.getState();
    expect(state.cart).toEqual(expectedState);
  });
  it('handles adding two different items correctly', () => {
    const store = createMockStore();

    const mockItem = createMockItem(mockProduct);
    const anotherMockItem = createMockItem(anotherMockProduct);
    const expectedState: Cart = {
      items: [mockItem, anotherMockItem],
      totalItems: 2,
      totalPrice: mockItem.price + anotherMockItem.price,
    };

    store.dispatch(addToCart({ item: mockItem }));
    store.dispatch(addToCart({ item: anotherMockItem }));

    const state = store.getState();
    expect(state.cart).toEqual(expectedState);
  });
  it('can add multiple copies of the same item', () => {
    const store = createMockStore();

    const mockItem = createMockItem(mockProduct);
    const expectedState: Cart = {
      items: [{ ...createMockItem(mockProduct), quantity: 2 }],
      totalItems: 2,
      totalPrice: mockItem.product.price * 2,
    };

    store.dispatch(
      addToCart({
        item: createMockItem(mockProduct),
      }),
    );
    store.dispatch(
      addToCart({
        item: createMockItem(mockProduct),
      }),
    );

    const state = store.getState();
    expect(state.cart).toEqual(expectedState);
  });
});

describe('decrementItemQuantity', () => {
  it('can remove items from the cart', () => {
    const store = createMockStore();

    const mockItem = createMockItem(mockProduct);
    const expectedState: Cart = {
      items: [mockItem],
      totalItems: 1,
      totalPrice: mockProduct.price,
    };

    store.dispatch(
      addToCart({
        item: mockItem,
      }),
    );
    store.dispatch(
      addToCart({
        item: mockItem,
      }),
    );
    store.dispatch(
      decrementItemQuantity({
        productId: mockItem.product.id,
      }),
    );

    const state = store.getState();
    expect(state.cart).toEqual(expectedState);
  });
  it('removes items from the cart by decrementing to zero', () => {
    const store = createMockStore();

    const mockItem = createMockItem(mockProduct);
    const expectedState: Cart = {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };

    store.dispatch(
      addToCart({
        item: mockItem,
      }),
    );
    store.dispatch(
      decrementItemQuantity({
        productId: mockItem.product.id,
      }),
    );

    const state = store.getState();
    expect(state.cart).toEqual(expectedState);
  });
  it('correctly handles non-existing items', () => {
    const store = createMockStore();

    const mockItem = createMockItem(mockProduct);
    const expectedState: Cart = {
      items: [mockItem],
      totalItems: 1,
      totalPrice: mockItem.product.price,
    };

    store.dispatch(
      addToCart({
        item: mockItem,
      }),
    );
    store.dispatch(
      decrementItemQuantity({
        productId: "doesn't exist",
      }),
    );

    const state = store.getState();
    expect(state.cart).toEqual(expectedState);
  });
});

describe('removeItem', () => {
  it('can delete item from the cart', () => {
    const store = createMockStore();

    const mockItem = createMockItem(mockProduct);
    const expectedState: Cart = {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };

    store.dispatch(
      addToCart({
        item: mockItem,
      }),
    );
    store.dispatch(
      addToCart({
        item: mockItem,
      }),
    );
    store.dispatch(
      removeItem({
        productId: mockItem.product.id,
      }),
    );

    const state = store.getState();
    expect(state.cart).toEqual(expectedState);
  });
});
