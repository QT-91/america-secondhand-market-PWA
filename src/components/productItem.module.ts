import styled from 'styled-components';

const ProductItemDiv = styled.div`
.product {
  display: flex;
  padding: 10px;
}
.thumbnail {
  max-width: 200px;
  width: 100%;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
}
.product .price {
  font-size: 16px;
  font-weight: 600;
}
.product .title {
  font-size: 17px;
  font-weight: 600;
}
.product .date {
  color: grey;
  font-size: 13px;
}
`;

export default ProductItemDiv;