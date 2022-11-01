import { Field } from '../decorators';
import { AdvancedFilter } from './AdvancedFilter';

export class NumberFilter
  extends AdvancedFilter
  implements AdvancedFilter.NumberFilter<number>
{
  @Field(Number)
  public equal?: number;

  @Field(Number)
  public greater?: number;

  @Field(Number)
  public greaterEqual?: number;

  @Field(Number)
  public less?: number;

  @Field(Number)
  public lessEqual?: number;

  @Field(Number)
  public notEqual?: number;

  constructor(fields?: Partial<NumberFilter> | undefined) {
    super();
    if (typeof fields === 'object') {
      Object.assign<NumberFilter, Partial<NumberFilter>>(this, fields);
    }
  }
}
