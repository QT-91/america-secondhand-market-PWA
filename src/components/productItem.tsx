import { Box, Heading, Text, VStack, Flex, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import { Product } from '@/shared/types/product';

interface Props {
  product: Product;
}

const Thumbnail = styled(Box)`
  background-size: cover;
  background-position: center;
`;

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "America/New_York",
	timeZoneName: "short",
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const datetime = product.date.toDate().toLocaleString('en-US', options);

  return (
    <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
      <LinkOverlay as={NextLink} href={`/product/${product.id}`}>
        <Thumbnail
          h="200px"
          w="full"
          bgImage={product.image ? `url('${product.image}')` : "url('https://via.placeholder.com/350')"}
        />
        <VStack align="start" spacing={2}>
          <Heading size="sm">{product.title}</Heading>
          <Text fontSize="sm">{datetime}</Text>
          <Text>{product.price}$</Text>
          <Flex justify="end" w="full">
            <Text>{product.content}</Text>
          </Flex>
        </VStack>
      </LinkOverlay>
    </LinkBox>
  );
}

export default ProductItem;
