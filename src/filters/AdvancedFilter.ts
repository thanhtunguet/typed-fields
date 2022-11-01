export namespace AdvancedFilter {
  export type Guid = string;

  export interface NumberFilter<T> {
    equal?: T;

    notEqual?: T;

    greater?: T;

    greaterEqual?: T;

    less?: T;

    lessEqual?: T;
  }

  export interface IdFilter<T> {
    equal?: T;

    notEqual?: T;

    in?: T[];

    notIn?: T[];
  }

  export interface StringFilter {
    equal?: string;

    notEqual?: string;

    contain?: string;

    notContain?: string;

    startWith?: string;

    notStartWith?: string;

    endWith?: string;

    notEndWith?: string;
  }
}

export class AdvancedFilter {
  /**
   * Create an instance of this class with its prototype
   */
  public static create<T = AdvancedFilter>(): T {
    return Object.create(this.prototype);
  }
}
