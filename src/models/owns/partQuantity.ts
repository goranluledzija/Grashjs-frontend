import { Audit } from './audit';
import Part, { parts } from './part';

export default interface PartQuantity extends Audit {
  id: number;
  quantity: number;
  part: Part;
}

export interface PartQuantityMiniDTO {
  quantity: number;
  part: Part;
}
export const partQuantities: PartQuantity[] = [
  {
    id: 75,
    quantity: 41,
    part: parts[0],
    createdAt: 'fghb',
    createdBy: 1,
    updatedAt: 'string',
    updatedBy: 1
  }
];
