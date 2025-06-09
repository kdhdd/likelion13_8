import { createContext, useContext, useState } from "react";

const ProductState = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  /* 최초 1회 목록 로드 */
  const fetchProducts = async () => {
    if (loaded) return;
    const res = await fetch("/api/shoes");         // 필요 시 type 인자
    setProducts(await res.json());
    setLoaded(true);
  };

  /* -------------------- 새 상품 등록 -------------------- */
  const addProduct = async (item, type = "shoes") => {     
    const res = await fetch(`/api/${type}`, {               
      method: "POST",                                       
      headers: { "Content-Type": "application/json" },     
      body: JSON.stringify(item),                           
    });                                                     
    if (!res.ok) throw new Error("서버 저장 실패");            
    const { id } = await res.json();                        
    setProducts((prev) => [...prev, { ...item, id }]);     
  };

  return (
    <ProductState.Provider value={{ products, fetchProducts, addProduct }}>
      {children}
    </ProductState.Provider>
  );
}
export const useProducts = () => useContext(ProductState);
