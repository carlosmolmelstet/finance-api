export const JWTHelper = {
  secret:
    "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.",
  expires: 60 * 60 * 24, // 1 days
};

export interface RequestPayload {
  user: {
    email: string;
    name: string;
    role: string;
    sub: string;
    iat: number;
    exp: number;
  };
}
