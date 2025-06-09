import { useState } from "react";
import { HeaderWrapper, Logo, Nav, NavItem } from "./Header.styles";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProducts } from "../contexts/ProductContext";

import magnifying from "../assets/magnifying-glass-solid.svg";
import barsIcon from "../assets/bars-solid.svg";

export default function Header() {
  const { addProduct } = useProducts();

  /* 모달 on/off */
  const [open, setOpen] = useState(false);        

  /* 입력 상태 */
  const [form, setForm] = useState({              
    name: "",
    price: "",
    image: "",
    brand: "KREAM",
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {               
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      alert("이름·가격·이미지를 모두 입력해 주세요");
      return;
    }
    try {
      await addProduct({
        ...form,
        price: Number(form.price),
        rating: 4.0,
        reviews: 0,
        soldout: 0,
        color: "multi",
        size: "9",
        gender: "unisex",
      });
      alert("상품이 등록되었습니다!");
      setForm({ name: "", price: "", image: "", brand: "KREAM" });
      setOpen(false);
    } catch {
      alert("서버 오류로 등록에 실패했습니다");
    }
  };

  return (
    <>
      <HeaderWrapper>
        <Logo as={Link} to="/">KREAM</Logo>
        <Nav>
          <NavItem as={Link} to="/">Home</NavItem>
          <NavItem as={Link} to="/style">STYLE</NavItem>
          <NavItem as={Link} to="/shop">SHOP</NavItem>

          {/* 🛒 → 모달 열기 */}
          <NavItem
            as="button"
            onClick={() => setOpen(true)}            
            style={{ background: "none", border: "none", padding: 0 }}
          >
            상품추가
          </NavItem>

          <NavItem as={Link} to="/search">
            <img src={magnifying} alt="검색" width={24} height={24} />
          </NavItem>

          <NavItem as={Link} to="/menu">
            <img src={barsIcon} alt="메뉴" width={24} height={24} />
          </NavItem>
        </Nav>
      </HeaderWrapper>

      {/* ---------- 모달 ---------- */}
      {open && (
        <Dim onClick={() => setOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h3>새 상품 등록</h3>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="상품명"
                name="name"
                value={form.name}
                onChange={onChange}
              />
              <Input
                placeholder="가격"
                type="number"
                name="price"
                value={form.price}
                onChange={onChange}
                step="100"
              />
              <Input
                placeholder="대표 이미지 URL"
                name="image"
                value={form.image}
                onChange={onChange}
              />

              <Button type="submit">등록</Button>
            </form>
          </Modal>
        </Dim>
      )}
    </>
  );
}

/* ---------- styled ---------- */
const Dim = styled.div`                       
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const Modal = styled.div`                     
  background: #fff;
  padding: 24px 28px;
  border-radius: 10px;
  width: 320px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  & h3 {
    margin-top: 0;
    margin-bottom: 16px;
  }
`;
const Input = styled.input`                   
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;
const Button = styled.button`               
  width: 100%;
  padding: 10px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
