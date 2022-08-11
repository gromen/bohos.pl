/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
// import { Order } from '.prisma/client';
import { OrderCreateInput } from '../.keystone/schema-types';

const graphql = String.raw;
interface Arguments {
  token: string;
}
55 odcinek
async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Musisz być zalogowany aby złożyć zamówienie');
  }
  const user = await context.session.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id 
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });
  console.dir(user, { depth: null });
}

export default checkout;
