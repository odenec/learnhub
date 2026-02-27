import { useState, useEffect } from "react";
import "./App.css";

const COLUMNS = [
  { key: "id", title: "ID", align: "center" },
  { key: "name", title: "Название товара", align: "left" },
  { key: "price", title: "Цена (₽)", align: "right" },
];
interface Product {
  id: number;
  name: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadingProduct = async () => {
      try {
        const res = await fetch("../public/bd.json");
        if (!res.ok) {
          throw new Error("fetch error");
        }
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadingProduct();
  }, []);
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              {COLUMNS.map((column, index) =>
                index > 0 ? <th key={column.key}>{column.title}</th> : null,
              )}
            </tr>
          </thead>
          <tbody>
            {products.map(
              (
                product, //map возвращает значение foreach нет
              ) => (
                <tr key={product.id}>
                  <td align="left">{product.name}</td>
                  <td>{product.price}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
