import {client} from '@/libs';
import {setAttributesQueries, syncAttributes} from '@/store/attributes/slice';

export const requestListProductAttributes = async () => {
  const attributes = await client.getProductAttributes();

  const res = await Promise.all(
    attributes.map(async item => {
      const response = await client.getProductAttributesTerms(item.id);
      // @ts-ignore
      setAttributesQueries({
        [item.id]: response,
      });
      return response;
    }),
  );

  syncAttributes(res.flat());
  return attributes;
};
