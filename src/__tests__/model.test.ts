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
    const user = User.create<User>();
    user.name = 'Alice';
    expect(user.toString()).toBe(JSON.stringify({ name: 'Alice' }));
  });

  it('force casting', () => {
    const user = User.create<User>();
    Object.assign(user, { name: 'Alice', id: '123' });
    expect(user.name).toBe('Alice');
    expect(user.id).toBe(123);
  });
});
