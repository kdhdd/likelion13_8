import styled from "styled-components";

export default function ProductCard({ brand, name, price, image }) {
  return (
    <Card>
      <ProductImage src={image} alt={name} />
      <ProudctBrand>{brand}</ProudctBrand>
      <ProductName>{name}</ProductName>
      <ProductPrice>{price.toLocaleString()}원</ProductPrice>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;

  width: 240px;
  margin: 12px;
  padding: 12px;
`;

const ProudctBrand = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 0;
  color: var(--greyscale-dark-90-dark, #222);
`

const ProductImage = styled.img`
  background-color: rgb(244, 244, 244);
  width: 100%;
  border-radius: 6px;
`;

const ProductName = styled.p`
  font-size: 13px;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: rgb(34, 34, 34);
`;