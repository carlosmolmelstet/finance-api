
import { hashSync } from "bcrypt";
import crypto from "crypto";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  role?: string;
  avatar?: string;
  createdAt?: Date;
};

export class User {
  public readonly id: string;
  public props: UserProps;

  public constructor(props: UserProps, id?: string) {
    this.id = id || crypto.randomUUID();
    this.props = {
      ...props,
      role: props.role || "user",
      createdAt: props.createdAt || new Date(),
    };
  }

  static create(props: UserProps, id?: string) {
    props.password = hashSync(props.password, 10);
    return new User(props, id);
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  get password() {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  get role() {
    return this.props.role;
  }

  private set role(value: string) {
    this.props.role = value;
  }

  get avatar() {
    return this.props.avatar;
  }

  private set avatar(value: string) {
    this.props.avatar = value;
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
    };

    delete response.password;

    return response;
  }
}
