import { useState, useMemo } from 'react';
import { products } from '../data/products';
import { Product, FilterState } from '../types';

export const useProducts = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: [0, 3000],
    weight: 'all',
    searchTerm: '',
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesWeight = filters.weight === 'all' || product.weight.includes(filters.weight);
      const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesWeight && matchesSearch;
    });
  }, [filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    products: filteredProducts,
    filters,
    updateFilters,
    allProducts: products,
  };
};