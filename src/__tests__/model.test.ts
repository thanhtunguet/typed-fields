import { Model } from 'src/Model';
import { AutoModel, Field, ObjectField } from 'src/decorators';
import { IdFilter, StringFilter } from '../filters';
import { ModelFilter } from '../ModelFilter';

@AutoModel()
class TestUser extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public name?: string;
}

@AutoModel()
class TestUserFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public userId: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public username: StringFilter = new StringFilter();
}

describe('model tests', () => {
  it('should cast data properly', () => {
    const testUser: TestUser = new TestUser();
    // const testUser: TestUser = TestUser.create();

    Object.assign(testUser, {
      id: '123',
      name: 1,
    });

    expect(testUser.id).toEqual(123);
    expect(testUser.name).toEqual('1');
  });

  it('should cast filter properly', () => {
    const testFilter: TestUserFilter = new TestUserFilter();

    Object.assign(testFilter, {
      userId: {
        equal: '123',
      },
      username: {
        startWith: 123,
      },
    });

    expect(testFilter.userId).toBeInstanceOf(IdFilter);
    expect(testFilter.userId.equal).toEqual(123);
    expect(testFilter.username).toBeInstanceOf(StringFilter);
    expect(testFilter.username.startWith).toEqual('123');
  });
});
