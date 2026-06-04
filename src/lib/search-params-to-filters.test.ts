// __tests__/searchParamsToFilters.test.ts

import { describe, expect, it } from '@jest/globals';

import {
  parseStyleParam,
  searchParamsToFilters,
} from './search-params-to-filters';

import type { Filters } from '@/types/product';

// Helper to create URLSearchParams from a plain object
function params(init: Record<string, string> = {}) {
  return new URLSearchParams(init);
}

describe('parseStyleParam', () => {
  it('returns null for null or empty input', () => {
    expect(parseStyleParam(null)).toBeNull();
    expect(parseStyleParam('')).toBeNull();
    expect(parseStyleParam('  ')).toBeNull();
  });

  it('returns a clean comma‑separated string for valid styles', () => {
    expect(parseStyleParam('Деловой,Винтаж')).toBe('Деловой,Винтаж');
    expect(parseStyleParam('  Деловой , Винтаж ,  Минимализм ')).toBe(
      'Деловой,Винтаж,Минимализм',
    );
  });

  it('filters out invalid style values', () => {
    expect(parseStyleParam('Деловой,Фантастический,Винтаж')).toBe(
      'Деловой,Винтаж',
    );
    expect(parseStyleParam('invalid,   , alsoWrong')).toBeNull();
  });

  it('returns null if all styles are invalid', () => {
    expect(parseStyleParam('wrong,alsoWrong')).toBeNull();
  });
});

describe('searchParamsToFilters', () => {
  it('returns default values for an empty search params', () => {
    const result = searchParamsToFilters(new URLSearchParams());
    const expected: Filters = {
      searchTerm: null,
      category: null,
      subcategory: null,
      style: null,
      thickness: null,
      curliness: null,
      inStock: null,
      minPrice: null,
      maxPrice: null,
      sortBy: 'newest',
    };
    expect(result).toEqual(expected);
  });

  it('parses style from comma‑separated query param', () => {
    const result = searchParamsToFilters(
      params({ style: 'Деловой,Винтаж,Минимализм' }),
    );
    expect(result.style).toBe('Деловой,Винтаж,Минимализм');
  });

  it('strips whitespace and invalid values in style', () => {
    const result = searchParamsToFilters(
      params({ style: '  Деловой , Фантастический ,  Экзотический ' }),
    );
    expect(result.style).toBe('Деловой,Экзотический');
  });

  it('returns null for style if no valid styles remain', () => {
    const result = searchParamsToFilters(params({ style: 'wrong,alsoWrong' }));
    expect(result.style).toBeNull();
  });

  it('returns null when style param is missing', () => {
    const result = searchParamsToFilters(params({}));
    expect(result.style).toBeNull();
  });

  it('handles inStock presence', () => {
    expect(searchParamsToFilters(params({ inStock: '' })).inStock).toBe(true);
    expect(searchParamsToFilters(params({})).inStock).toBeNull();
  });

  it('parses minPrice and maxPrice as numbers', () => {
    const result = searchParamsToFilters(
      params({ minPrice: '100', maxPrice: '500' }),
    );
    expect(result.minPrice).toBe(100);
    expect(result.maxPrice).toBe(500);
  });

  it('ignores non‑numeric price values', () => {
    const result = searchParamsToFilters(
      params({ minPrice: 'abc', maxPrice: 'xyz' }),
    );
    expect(result.minPrice).toBeNull();
    expect(result.maxPrice).toBeNull();
  });

  it('defaults sortBy to newest', () => {
    const result = searchParamsToFilters(params({}));
    expect(result.sortBy).toBe('newest');
  });
});
