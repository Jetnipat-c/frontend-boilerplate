import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';

export default function property() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const count = useSelector((state: RootState) => state.product.products);
  return (
    <div>
      {count?.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
