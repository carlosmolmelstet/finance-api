import crypto from "crypto";

export type ExpenseProps = {
  amount: number;
  date: Date;
  userId: string;
  categoryId: string;
  createdAt?: Date;
  updateAt?: Date;
};

export class Expense {
  public readonly id: string;
  public props: ExpenseProps;

  public constructor(props: ExpenseProps, id?: string) {
    this.id = id || crypto.randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  static create(props: ExpenseProps, id?: string) {
    return new Expense(props, id);
  }

  get amount() {
    return this.props.amount;
  }

  private set amount(value: number) {
    this.props.amount = value;
  }

  get date() {
    return this.props.date;
  }

  private set date(value: Date) {
    this.props.date = value;
  }

  get userId() {
    return this.props.userId;
  }

  private set userId(value: string) {
    this.props.userId = value;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  private set categoryId(value: string) {
    this.props.categoryId = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  private set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  get updateAt() {
    return this.props.updateAt;
  }

  private set updateAt(value: Date) {
    this.props.updateAt = value;
  }

  toJSON() {
    let response = {
      id: this.id,
      ...this.props,
    } as Expense;

    return response;
  }
}
