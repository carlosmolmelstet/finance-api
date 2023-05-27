import crypto from "crypto";

export type ExpenseCategoryProps = {
  name: string;
  color: string;
  userId?: string;
  createdAt?: Date;
};

export class ExpenseCategory {
  public readonly id: string;
  public props: ExpenseCategoryProps;

  public constructor(props: ExpenseCategoryProps, id?: string) {
    this.id = id || crypto.randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  static create(props: ExpenseCategoryProps, id?: string) {
    return new ExpenseCategory(props, id);
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get color() {
    return this.props.color;
  }

  private set color(value: string) {
    this.props.color = value;
  }

  get userId() {
    return this.props.userId;
  }

  private set userId(value: string) {
    this.props.userId = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  private set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  toJSON() {
    let response = {
      id: this.id,
      ...this.props,
    } as ExpenseCategory;

    return response;
  }
}
