import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';

export default function PropertyPage() {
  const count = useSelector((state: RootState) => state.product.products);
  return (
    <div>
      {count?.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
