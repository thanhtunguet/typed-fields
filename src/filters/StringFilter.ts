import { AutoModel, Field } from '../decorators';
import { AdvancedFilter } from './AdvancedFilter';

@AutoModel()
export class StringFilter
  extends AdvancedFilter
  implements AdvancedFilter.StringFilter
{
  @Field(String)
  public contain?: string;

  @Field(String)
  public endWith?: string;

  @Field(String)
  public equal?: string;

  @Field(String)
  public notContain?: string;

  @Field(String)
  public notEndWith?: string;

  @Field(String)
  public notEqual?: string;

  @Field(String)
  public notStartWith?: string;

  @Field(String)
  public startWith?: string;

  constructor(fields?: Partial<StringFilter> | undefined) {
    super();
    if (typeof fields === 'object') {
      Object.assign<StringFilter, Partial<StringFilter>>(this, fields);
    }
  }
}
