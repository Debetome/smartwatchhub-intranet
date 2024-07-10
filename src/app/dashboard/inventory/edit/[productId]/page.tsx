'use client';

import React from "react";
import { useRouter, useParams } from 'next/navigation';
import { useRouter as _useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ProductForm, { Product as ProductFormData } from '../../ProductForm';
import { Product } from '../../../../data/mockData';

const Edit = () => {
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const { productId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const products = localStorage.getItem('products');
    const productsDB: Product[] = products ? JSON.parse(products) : [];

    const foundProduct = productsDB.find(
      (item: Product) => item.id === parseInt(productId as string, 10),
    );

    if (!foundProduct) {
      router.push('/dashboard/inventory');
      return;
    }

    const formProduct: ProductFormData = {
      ...foundProduct,
      price: foundProduct.price.toString(),
      rating: foundProduct.rating.toString(),
      units: foundProduct.units.toString()
    };

    setProduct(formProduct);
  }, [productId, router]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '85vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ProductForm product={product} />
    </Box>
  );
};

export default Edit;
