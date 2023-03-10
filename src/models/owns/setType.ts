import { Audit } from './audit';
import { PartMiniDTO, parts } from './part';

export default interface SetType extends Audit {
  id: number;
  name: string;
  parts: PartMiniDTO[];
}
export const sets: SetType[] = [
  {
    id: 212,
    name: 'Set 1',
    createdAt: 'dfggj',
    parts,
    createdBy: 1,
    updatedAt: 'ghfgj',
    updatedBy: 1
  },
  {
    id: 44,
    name: 'Set 2',
    createdAt: 'dfggj',
    parts,
    createdBy: 1,
    updatedAt: 'ghfgj',
    updatedBy: 1
  }
];
