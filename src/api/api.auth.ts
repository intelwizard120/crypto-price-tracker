import { Http } from "./http";

export const AuthApi = {
  signIn: async (data:any): Promise<any> => {
    return Http.post("auth/login", data);
  },
  signUp: async (data:any): Promise<any> => {
    return Http.post("auth/register", data);
  }
}