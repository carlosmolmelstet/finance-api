import { User, UserProps } from "./user.entity";
import { hashSync, compare } from "bcrypt";

const mockUserProps: UserProps = {
  name: "john doe",
  email: "johndoe@gmail.com",
  password: "1234567",
  createdAt: new Date("17/08/2001"),
  role: "admin",
  avatar: "avatar.png",
};

describe("User Tests", () => {
  test("constructor", () => {
    let props: UserProps = {
      name: mockUserProps.name,
      email: mockUserProps.name,
      password: mockUserProps.password,
    };

    let user = User.create(props);

    expect(user.props).toStrictEqual({
      ...props,
      createdAt: user.props.createdAt,
      role: "user",
      avatar: undefined,
    });

    props = mockUserProps;
    user = User.create(props);

    expect(user.id).toBeDefined();
    expect(user.props).toStrictEqual(props);
  });

  test("getters and setters", () => {
    const user = User.create(mockUserProps);

    expect(user.name).toBe(mockUserProps.name);
    expect(user.email).toBe(mockUserProps.email);
    expect(user.password).toBe(mockUserProps.password);
    expect(user.role).toBe(mockUserProps.role);
    expect(user.avatar).toBe(mockUserProps.avatar);
    expect(user.createdAt).toBe(mockUserProps.createdAt);
  });

  test("encrypt password", async () => {
    const password = "12345678";
    let props = {
      ...mockUserProps,
      password,
    };
    const user = User.create(props);

    expect(user.password).not.toBe(password);
    expect(user.password).toHaveLength(60);

    const hashPassword = await hashSync(password, 10);
    const isPasswordValid = await compare(password, hashPassword);

    expect(isPasswordValid).toBe(true);
  });

  test("toJSON remove passoword", () => {
    let props = mockUserProps;
    const user = User.create(props);

    delete props.password;

    expect(user.toJSON()).toStrictEqual({
      ...props,
      id: user.id,
    });
  });
});
