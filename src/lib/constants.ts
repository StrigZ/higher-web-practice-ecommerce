export const productCategories = [
  'Классические',
  'Исторические',
  'Театральные',
  'Экспериментальные',
  'Экзотические',
  'Современные',
] as const;

export const productStyles = [
  'Деловой',
  'Винтаж',
  'Театральный',
  'Экспериментальный',
  'Военный',
  'Классический',
  'Минимализм',
  'Экзотический',
] as const;

export const productCurliness = ['Низкая', 'Средняя', 'Высокая'] as const;

export const productThickness = ['Низкая', 'Средняя', 'Высокая'] as const;

export const productSortingVariants = [
  'price_asc',
  'price_desc',
  'newest',
  'rating',
] as const;

export const productCharacteristics = [
  'категория',
  'подкатегория',
  'стиль',
  'форма',
  'густота',
  'закрученность',
  'харизма',
] as const;

export const paymentMethods = [
  'card_online',
  'card_on_delivery',
  'cash',
] as const;

export const deliveryMethods = ['courier', 'pickup_point'] as const;

export const pickupPoints = [
  {
    id: '5a6b7c8d-9e0f-4a1b-8c2d-3e4f5a9c8001',
    name: 'Пункт выдачи №1',
    address: 'Москва, Арбат 12',
  },
  {
    id: '6b7c8d9e-0f1a-4b2c-8d3e-4f5a6b0d8002',
    name: 'Пункт выдачи №2',
    address: 'Москва, улица Ленина 45',
  },
] as const;

export const cities = ['Москва', 'Санкт-Петербург'] as const;

export const userLanguages = ['ru', 'en'] as const;
