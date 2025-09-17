import { Field } from '@/Field';
import { Model } from '../Model';

class User extends Model {
  @Field(Number)
  id?: number;

  @Field(String)
  name?: string;
}

describe('Model', () => {
  it('creates an instance via create()', () => {
    const user = User.create<User>();
    expect(user).toBeInstanceOf(User);
  });

  it('serializes to string', () => {
    const user = new User();
    user.name = 'Alice';
    expect(user.toString()).toBe(JSON.stringify({ name: 'Alice' }));
  });
});


