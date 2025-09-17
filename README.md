## typed-fields

Type-safe, decorator-based model fields for TypeScript. Automatically coerce primitives, validate enums, materialize relations, and handle lists with a small, dependency-light API built on `reflect-metadata`.

- **Primitives**: `@Field(String|Number|Boolean)` coerces assigned values
- **Lists**: `@List(String|Number|Boolean)` coerces each element
- **Enums**: `@Enum(MyEnum)` enforces membership (throws if invalid)
- **Relations**: `@ObjectField(Model)` and `@ObjectList(Model)` build model instances from plain objects
- **Auto wiring**: `@AutoModel()` ensures descriptors are bound on instances at construction time
- **Utilities**: `Model.create()`, `Model.hasMany()`, `Model.belongsTo()`, `Model#toString()`

### Install

```bash
npm i typed-fields
```

This package imports `reflect-metadata` as a side effect from its main entry, so you typically don’t need to import it yourself when you `import` from `typed-fields`. If you import submodules directly, add:

```ts
import 'reflect-metadata';
```

### TypeScript config

Enable decorators and (optionally) metadata in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strict": true,
    "module": "ESNext",
    "target": "ES5",
    "moduleResolution": "Node",
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

Jest setup (optional) – if you use Jest, map the alias and ensure `reflect-metadata` loads first (already covered by the library’s main export):

```js
// jest.config.cjs
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { useESM: true, tsconfig: '<rootDir>/tsconfig.json' }],
  },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  extensionsToTreatAsEsm: ['.ts'],
  setupFiles: ['reflect-metadata']
};
```

### Quick start

```ts
import { Model, Field, List, Enum, ObjectField, ObjectList, MomentField } from 'typed-fields';

enum Role { User = 'user', Admin = 'admin' }

class Profile extends Model {
  @Field(String) bio?: string;
  @MomentField() birthday?: any; // moment object
}

class User extends Model {
  @Field(Number) id?: number;
  @Field(String) name?: string;
  @Enum(Role) role?: Role;
  @ObjectField(Profile) profile?: Profile;
  @List(String) tags?: string[];
}

const u = User.create<User>();
u.id = '42' as any;            // -> 42
u.role = 'admin' as any;       // ok, matches enum member
u.tags = [1, '2', true] as any; // -> ['1','2','true']
u.profile = { bio: 'Hello', birthday: '2024-01-01' }; // -> Profile instance with moment birthday
```

### Decorators

- **`@Field(prototype)`**
  - Coerces primitives using the provided constructor (`String`, `Number`, `Boolean`; custom constructors allowed if they accept a single value).
  - Stores the raw coerced value via metadata; property becomes a getter/setter.

- **`@List(prototype)`**
  - Coerces each element of an assigned array using the provided constructor.
  - `null`/`undefined` elements are preserved.

- **`@Enum(enumObject)`**
  - Ensures the assigned value is one of `Object.values(enumObject)`; otherwise throws.

- **`@ObjectField(Constructor?)`**
  - Accepts a plain object and materializes it into an instance (prefers static `create()` if available, otherwise `new`) then `Object.assign`s the value.
  - If `Constructor` is omitted, uses the declaring class constructor.

- **`@ObjectList(Constructor?)`**
  - Like `@ObjectField` but for arrays of related objects.

- **`@MomentField()`**
  - Converts assigned values to `moment(value)`; preserves `null`/`undefined`.

- **`@AutoModel()`** (class decorator)
  - Ensures property descriptors collected during decoration are defined on each instance at construction time. Useful in complex initialization flows.

### Model utilities

- **`Model.create<T>()`** – returns an object created with the class prototype (`Object.create(this.prototype)`), handy for lightweight instances.
- **`Model.hasMany(Parent, Child, field)`** – apply an `@ObjectList(Child)` relationship to `Parent.prototype[field]` (helps with circular type references).
- **`Model.belongsTo(Child, Parent, field)`** – apply an `@ObjectField(Parent)` relationship to `Child.prototype[field]`.
- **`Model#toString()`** – `JSON.stringify(this)` convenience.

#### Circular relations

```ts
class Author extends Model {
  @List(String) names?: string[];
}

class Book extends Model {
  @ObjectField(Author) author?: Author;
}

// When types depend on each other, use the helpers:
Model.hasMany(Author, Book, 'books');     // author.books: Book[]
Model.belongsTo(Book, Author, 'author');  // book.author: Author
```

### Behavior notes

- The first time you assign to a decorated property, the library defines a non-configurable accessor on the instance that stores/reads its value from metadata.
- Assigning `null`/`undefined` preserves those values.
- For relation decorators, if the related constructor defines a static `create()` method, it is used to instantiate; otherwise the class is constructed with `new`.

### API surface

```ts
// Decorators
Field(prototype: (...args: any[]) => any): PropertyDecorator
List(prototype: (...args: any[]) => any): PropertyDecorator
Enum(enumObject: Record<string, string | number | boolean>): PropertyDecorator
ObjectField(constructor?: new (...args: any[]) => any): PropertyDecorator
ObjectList(constructor?: new (...args: any[]) => any): PropertyDecorator
MomentField(): PropertyDecorator
AutoModel<T extends { new (...rest: any[]): {} }>(): ClassDecorator

// Base class
class Model {
  static create<T = Model>(): T
  static hasMany<T1 extends Model, T2 extends Model>(Parent: new () => T1, Child: new () => T2, field: keyof T1): void
  static belongsTo<T1 extends Model, T2 extends Model>(Child: new () => T1, Parent: new () => T2, field: keyof T1): void
  toString(): string
}
```

### Build, test, CI

- **Build**: `npm run build` (outputs to `dist/`)
- **Test**: `npm test` (Jest + ts-jest)
- **CI**: GitHub Actions workflow at `.github/workflows/ci.yml` runs build and tests on Node 18 and 20 for pushes and PRs

### License

MIT © [thanhtunguet](https://github.com/thanhtunguet)
