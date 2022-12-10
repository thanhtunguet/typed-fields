import { Model } from 'src/Model';
import { Field, ObjectField } from 'src/decorators';
import { ModelFilter } from 'src/ModelFilter';
import { IdFilter, StringFilter } from 'src/filters';

describe('model tests', () => {
  class TestUser extends Model {
    @Field(Number)
    public id?: number;

    @Field(String)
    public name?: string;
  }

  class TestUserFilter extends ModelFilter {
    @ObjectField(IdFilter)
    public userId: IdFilter = new IdFilter();

    @ObjectField(StringFilter)
    public username: StringFilter = new StringFilter();
  }

  it('should cast data properly', () => {
    const testUser: TestUser = TestUser.create();
    Object.assign(testUser, {
      id: '123',
      name: 1,
    });

    expect(testUser.id).toEqual(123);
    expect(testUser.name).toEqual('1');
  });

  it('should cast filter properly', () => {
    const testFilter: TestUserFilter = TestUserFilter.create();
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
