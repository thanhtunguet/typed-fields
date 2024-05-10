# react3l

> React3L libraries for React projects

[![NPM](https://img.shields.io/npm/v/react3l.svg)](https://www.npmjs.com/package/react3l) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react3l
```

or using yarn:

```bash
yarn add react3l
```

## Documentation

#### Introduction

`react3l` is a powerful library designed to simplify the creation of Model classes in React applications. It provides a set of TypeScript decorators that enable users to define Model classes effortlessly, while also offering numerous benefits in terms of data mapping and maintaining object integrity.

#### Decorators

##### `Enum`

The `Enum` decorator is used to mark a field as an enum value. It ensures that the assigned value is a member of the specified enum object.

Usage:

```ts
import { Enum } from 'react3l';

enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
}

class User {
  @Enum(Status)
  status?: Status;
}
```

##### `Field`

The `Field` decorator marks a field with primitive data types such as String, Number, or Boolean. It also provides the ability to define custom prototype functions for data transformation.

Usage:

```ts
import { Field, AutoModel } from 'react3l';

@AutoModel()
class User {
  @Field(String)
  name?: string;

  @Field(Number)
  age?: number;

  @Field(Boolean)
  isActive?: boolean;
}
```

##### `List`

The `List` decorator marks a field as a list of primitive values. It allows for mapping each element of the list with a specified prototype function.

Usage:

```ts
import { List } from 'react3l';

class User {
  @List(String)
  hobbies?: string[];
}
```

##### `MomentField`

The `MomentField` decorator is used for fields that require moment formatting, typically used for handling date and time values.

```ts
import { MomentField } from 'react3l';

class Task {
  @MomentField()
  deadline?: moment.Moment;
}
```

##### `ObjectField`

The `ObjectField` decorator marks a field as a model relation. It allows for mapping nested objects or model instances.

Usage:

```ts
import { ObjectField } from 'react3l';

class Address {
  @Field(String)
  street?: string;

  @Field(String)
  city?: string;
}

class User {
  @ObjectField(Address)
  address?: Address;
}
```

##### `ObjectList`

The `ObjectList` decorator marks a field as a list of model relations. It enables mapping a list of nested objects or model instances.

Usage:

```ts
import { ObjectList } from 'react3l';

class Comment {
  @Field(String)
  content?: string;
}

class Post {
  @ObjectList(Comment)
  comments?: Comment[];
}
```

#### Effortless Model Classes

One of the significant benefits of using Model classes defined with `react3l` decorators is their seamless integration with assignment operations and `Object.assign`. Let's explore these benefits with examples:

##### Property Descriptor Preservation

Traditional approaches to data mapping in TypeScript often break the property descriptor when using assignment operations. However, `react3l` ensures that the property descriptor remains intact, even when mapping special data types such as Date objects or strings from JSON.

```ts
import { MomentField } from 'react3l';

class Task {
  @MomentField()
  deadline?: moment.Moment;
}

const task = new Task();
task.deadline = moment(); // Property descriptor preserved
```

##### Instanceof Operator Compatibility

Another common issue is that the `instanceof` operator may return true when checking if an object is an instance of a class, even if it's not intended. `react3l` prevents this behavior, ensuring that `instanceof` only returns true for instances of the specified class.

```ts
import { ObjectField } from 'react3l';

class Address {
  @Field(String)
  street?: string;

  @Field(String)
  city?: string;
}

class User {
  @ObjectField(Address)
  address?: Address;
}

const user = new User();
console.log(user.address instanceof Address); // Returns true
console.log(user.address instanceof Object); // Returns false
```

#### Custom Decorators

In addition to the built-in decorators, you can also create custom decorators in `react3l` to further enhance the functionality of your Model classes. For example, the `AutoModel` decorator automatically applies property descriptors from a base prototype to the decorated class.

Usage:

```ts
import { AutoModel } from 'react3l';

@AutoModel()
class MyModel {
  // Your model properties here
}
```

The `AutoModel` class decorator can be applied to a class that contains property decorators such as `Field`, allowing for automatic property descriptor application.

Usage:

```ts
import { AutoModel, Field } from 'react3l';

@AutoModel()
class User {
  @Field(String)
  public id: string;
}
```

#### Conclusion

In conclusion, `react3l` provides a powerful set of decorators for defining Model classes in React applications. These decorators simplify data mapping, enable type checking, and ensure data integrity throughout your application. With `react3l`, you can create robust and maintainable React components effortlessly.

[https://react3l.github.io](https://react3l.github.io)

## License

MIT © [thanhtunguet](https://github.com/thanhtunguet)
