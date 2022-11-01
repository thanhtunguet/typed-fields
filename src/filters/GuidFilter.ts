import { Field, List } from '../decorators';
import { AdvancedFilter } from './AdvancedFilter';

export class GuidFilter
  extends AdvancedFilter
  implements AdvancedFilter.IdFilter<AdvancedFilter.Guid>
{
  @Field(String)
  public equal?: AdvancedFilter.Guid;

  @List(String)
  public in?: AdvancedFilter.Guid[];

  @Field(String)
  public notEqual?: AdvancedFilter.Guid;

  @List(String)
  public notIn?: AdvancedFilter.Guid[];

  constructor(fields?: Partial<GuidFilter> | undefined) {
    super();
    if (typeof fields === 'object') {
      Object.assign<GuidFilter, Partial<GuidFilter>>(this, fields);
    }
  }
}
