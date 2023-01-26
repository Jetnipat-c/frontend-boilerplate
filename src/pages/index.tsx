import { insertProduct, insertProducts, Product } from '@/app/store/productSlice';
import { useQuery } from '@tanstack/react-query';
import httpClient from '@/app/utils/httpClient';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  });
  const {
    data: productResponse,
    isLoading,
    isSuccess,
  } = useQuery<Product[]>({
    queryKey: ['product'],
    queryFn: async () => {
      const response = await httpClient.get('/products');
      return response.data;
    },
  });

  if (isSuccess) {
    dispatch(insertProducts(productResponse));
  }

  const handleInsertProducts = () => {
    if (productResponse) {
      dispatch(insertProducts(productResponse));
    }
  };

  return (
    <div>
      <h1>Test lib</h1>
      <div className="grid grid-cols-1 max-w-sm">
        <input placeholder="id" value={product.id} onChange={(e) => setProduct({ ...product, id: +e.target.value })} />
        <input
          placeholder="title"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <input
          placeholder="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: +e.target.value })}
        />
        <input
          placeholder="description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <input
          placeholder="category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <input
          placeholder="image"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <input
          placeholder="rate"
          value={product.rating.rate}
          onChange={(e) =>
            setProduct({
              ...product,
              rating: { ...product.rating, rate: +e.target.value },
            })
          }
        />
        <input
          placeholder="count"
          value={product.rating.count}
          onChange={(e) =>
            setProduct({
              ...product,
              rating: { ...product.rating, count: +e.target.value },
            })
          }
        />
        <Button onClick={() => dispatch(insertProduct(product))} className="bg-red-700" variant="contained">
          Insert product
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {productResponse?.map((productData) => (
        <div key={productData.id}>{productData.title}</div>
      ))}

      <Button
        onClick={() => handleInsertProducts()}
        className="bg-black text-white hover:bg-white hover:text-black"
        variant="text"
      >
        Insert all product
      </Button>
      <Link href="/product">
        <Button className="bg-red-700" variant="contained">
          Product page
        </Button>
      </Link>
      <Button className=" border-dotted border-2" variant="outlined">
        Outlined
      </Button>
    </div>
  );
}
