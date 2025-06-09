import ProductCard from "../components/ProductCard";
import styled from "styled-components";
import Header from "../components/Header";
import sortIcon from "../assets/sort-down-solid.svg";
import { useRef, useEffect, useMemo, useState } from "react";
import { useProducts } from "../contexts/ProductContext";

export default function Homepage() {
  const [sortType, setSortType] = useState("high");
  const { products, fetchProducts } = useProducts();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  /* ------------------- 1) 첫 마운트 → 상품 불러오기 ------------------- */
  useEffect(() => { fetchProducts(); }, []); 

  /* ------------------- 2) 가격순 정렬 memo ------------------- */
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) =>
      sortType === "high" ? b.price - a.price : a.price - b.price
    );
  }, [products, sortType]);                        

  /* ------------------- 3) 드롭다운 외부클릭 닫기 ------------------- */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  /* ------------------- 4) 렌더 ------------------- */
  return (
    <Wrapper>
      <Header />
      <Title>신상품</Title>

      {/* 정렬 드롭다운 */}
      <Sort>
        <SortLabel onClick={() => setDropdownOpen((open) => !open)}>
          {sortType === "high" ? "높은 가격순" : "낮은 가격순"}
          <img src={sortIcon} alt="정렬" style={{ width: 12, height: 16, marginLeft: 6 }} />
        </SortLabel>

        {dropdownOpen && (
          <Dropdown ref={dropdownRef}>
            <DropdownItem onClick={() => { setSortType("high"); setDropdownOpen(false); }}
                          active={sortType === "high"}>
              높은 가격순
            </DropdownItem>
            <DropdownItem onClick={() => { setSortType("low"); setDropdownOpen(false); }}
                          active={sortType === "low"}>
              낮은 가격순
            </DropdownItem>
          </Dropdown>
        )}
      </Sort>

      {/* 상품 목록 */}
      <ProductList>
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} brand={p.brand} name={p.name}
                       price={p.price} image={p.image} />
        ))}
      </ProductList>
    </Wrapper>
  );
}

/* ------------------- styled-components ------------------- */
const Wrapper = styled.div`
  padding: 24px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Sort = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 8rem;
  font-size: 13px;
  position: relative;
`;

const SortLabel = styled.div`
  display: flex;            
  align-items: center;        
  gap: 4px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  background: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 36px;
  min-width: 110px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.09);
  border: 1px solid #e1e1e1;
  z-index: 99;
`;

const DropdownItem = styled.div`
  padding: 12px 20px;
  font-size: 1rem;
  color: ${({ active }) => (active ? "#0a58ca" : "#222")};
  cursor: pointer;
  background: ${({ active }) => (active ? "#f1f7fe" : "transparent")};
  &:hover {
    background: #f4f4f4;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
