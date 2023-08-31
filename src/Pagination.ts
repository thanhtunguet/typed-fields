import type { OrderType } from './OrderType';
import { Field } from './decorators/Field';

export class Pagination {
  @Field(Number)
  skip?: number;

  @Field(Number)
  take?: number;

  @Field(String)
  orderBy?: string;

  @Field(String)
  orderType?: OrderType;
}
