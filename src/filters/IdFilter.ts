import { Field, List } from '../decorators';
import { AdvancedFilter } from './AdvancedFilter';

export class IdFilter
  extends AdvancedFilter
  implements AdvancedFilter.IdFilter<number>
{
  @List(Number)
  public in?: number[];

  @List(Number)
  public notIn?: number[];

  @Field(Number)
  public equal?: number;

  @Field(Number)
  public notEqual?: number;

  constructor(fields?: Partial<IdFilter>) {
    super();
    if (typeof fields === 'object') {
      Object.assign<IdFilter, Partial<IdFilter>>(this, fields);
    }
  }
}
