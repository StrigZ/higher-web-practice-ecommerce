import { describe, expect, test } from 'vitest';

import { filterProducts } from './filter-products';

import type { Product } from '@/types/product'; // adjust path

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: '1',
    name: 'Default Product',
    price: 100,
    inStock: true,
    rating: 4.4,
    createdAt: '2024-01-01T00:00:00.000Z',
    characteristics: {
      категория: 'Исторические',
      закрученность: 'Средняя',
      стиль: 'Винтаж',
      подкатегория: 'sub-a',
      густота: 'Высокая',
      форма: '',
      харизма: '',
    },
    description: '',
    ratingCount: 1,
    images: [],
    ...overrides,
  };
}

const productA = makeProduct({
  id: 'A',
  name: 'Product A',
  price: 50,
  inStock: true,
  rating: 3,
  createdAt: '2024-06-01',
});
const productB = makeProduct({
  id: 'B',
  name: 'Product B',
  price: 150,
  inStock: false,
  rating: 5,
  createdAt: '2024-01-01',
});
const productC = makeProduct({
  id: 'C',
  name: 'Another Thing',
  price: 200,
  inStock: true,
  rating: 4,
  createdAt: '2024-03-01',
});
const productD = makeProduct({
  id: 'D',
  name: 'Special Product',
  price: 99,
  inStock: true,
  rating: 2,
  createdAt: '2023-12-01',
});
const productE = makeProduct({
  id: 'E',
  name: 'Cheap one',
  price: 10,
  inStock: false,
  rating: 1,
  createdAt: '2024-05-01',
});

const allProducts = [productA, productB, productC, productD, productE];

describe('filterProducts', () => {
  test('returns all products when no filters are provided', () => {
    const result = filterProducts(allProducts, {});
    expect(result).toHaveLength(allProducts.length);
    expect(result).toEqual(allProducts);
  });

  test('returns empty array when input is empty', () => {
    expect(filterProducts([], { category: 'Исторические' })).toEqual([]);
  });

  test('filters by category', () => {
    const result = filterProducts(allProducts, { category: 'Исторические' });
    expect(result).toHaveLength(allProducts.length);
  });

  test('filters by curliness', () => {
    const result = filterProducts(allProducts, { curliness: 'Средняя' });
    expect(result).toHaveLength(allProducts.length);

    const resultNone = filterProducts(allProducts, { curliness: 'Высокая' });
    expect(resultNone).toHaveLength(0);
  });

  test('filters by style – single value', () => {
    const result = filterProducts(allProducts, { style: 'Винтаж' });
    expect(result).toHaveLength(allProducts.length);
  });

  test('filters by style – multiple comma separated values', () => {
    const result = filterProducts(allProducts, { style: 'Винтаж,Театральные' });
    expect(result).toHaveLength(allProducts.length);

    const special = makeProduct({
      id: 'Z',
      characteristics: { ...productA.characteristics, стиль: 'style-b' },
    });
    const withSpecial = [...allProducts, special];
    const result2 = filterProducts(withSpecial, { style: 'style-b,style-c' });
    expect(result2).toEqual([special]);
  });

  test('filters by style – no match', () => {
    const result = filterProducts(allProducts, { style: 'тест' });
    expect(result).toHaveLength(0);
  });

  test('filters by subcategory', () => {
    const result = filterProducts(allProducts, { subcategory: 'sub-a' });
    expect(result).toHaveLength(allProducts.length);
    const resultNone = filterProducts(allProducts, { subcategory: 'sub-b' });
    expect(resultNone).toHaveLength(0);
  });

  test('filters by thickness', () => {
    const result = filterProducts(allProducts, { thickness: 'Высокая' });
    expect(result).toHaveLength(allProducts.length);
    const resultNone = filterProducts(allProducts, { thickness: 'Низкая' });
    expect(resultNone).toHaveLength(0);
  });

  test('filters by inStock = true', () => {
    const result = filterProducts(allProducts, { inStock: true });
    expect(result).toEqual([productA, productC, productD]);
  });

  test('filters by maxPrice', () => {
    const result = filterProducts(allProducts, { maxPrice: 50 });
    expect(result).toEqual([productA, productE]); // 50 and 10
  });

  test('filters by minPrice', () => {
    const result = filterProducts(allProducts, { minPrice: 100 });
    expect(result).toEqual([productB, productC]); // 150, 200
  });

  test('filters by both minPrice and maxPrice', () => {
    const result = filterProducts(allProducts, { minPrice: 60, maxPrice: 160 });
    expect(result).toEqual([productB, productD]); // 150 and 99
  });

  test('filters by searchTerm (case insensitive)', () => {
    const result = filterProducts(allProducts, { searchTerm: 'product' });
    expect(result).toEqual([productA, productB, productD]);
  });

  test('searchTerm matches partial name', () => {
    const result = filterProducts(allProducts, { searchTerm: 'cheap' });
    expect(result).toEqual([productE]);
  });

  test('searchTerm no match', () => {
    const result = filterProducts(allProducts, { searchTerm: 'xyz' });
    expect(result).toHaveLength(0);
  });

  test('combines multiple filters (category + inStock + search)', () => {
    const result = filterProducts(allProducts, {
      category: 'Исторические',
      inStock: true,
      searchTerm: 'product',
    });
    expect(result).toEqual([productA, productD]);
  });

  // ---------- Sorting ----------
  describe('sorting', () => {
    test('sortBy newest (descending createdAt)', () => {
      const result = filterProducts(allProducts, { sortBy: 'newest' });
      expect(result).toEqual([
        productA, // 2024-06-01
        productE, // 2024-05-01
        productC, // 2024-03-01
        productB, // 2024-01-01
        productD, // 2023-12-01
      ]);
    });

    test('sortBy price_asc', () => {
      const result = filterProducts(allProducts, { sortBy: 'price_asc' });
      expect(result).toEqual([
        productE, // 10
        productA, // 50
        productD, // 99
        productB, // 150
        productC, // 200
      ]);
    });

    test('sortBy price_desc', () => {
      const result = filterProducts(allProducts, { sortBy: 'price_desc' });
      expect(result).toEqual([
        productC, // 200
        productB, // 150
        productD, // 99
        productA, // 50
        productE, // 10
      ]);
    });

    test('sortBy rating (descending)', () => {
      const result = filterProducts(allProducts, { sortBy: 'rating' });

      expect(result).toEqual([
        productB,
        productC,
        productA,
        productD,
        productE,
      ]);
    });
  });
});
