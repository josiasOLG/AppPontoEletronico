import ApiBase from "../ApiBase";
import UserDTO from "../dtos/UserDTO";
import Constants from 'expo-constants';
const environment = Constants.expoConfig?.extra?.environment ?? 'valorPadrao';

export default class UserAPI extends ApiBase {
  private static instance: UserAPI;

  private constructor() {
    super("/Login/CheckCredentials");
  }

  public static getInstance(): UserAPI {
    if (!this.instance) {
      this.instance = new UserAPI();
    }
    return this.instance;
  }

  public async getUser(id: number): Promise<UserDTO> {
    return this.get<UserDTO>(`/${id}`);
  }

  public async login(username: string, password: string): Promise<UserDTO> {
    const loginData = {
      Login: username,
      PasswordHash: password,
    };
    return this.post<typeof loginData, UserDTO>("", loginData);
  }

  public async loginLocal(
    username: string,
    password: string
  ): Promise<UserDTO> {
    const allUsers: UserDTO[] = await this.get<UserDTO[]>("");
    const user = allUsers.find(
      (u) => u.Login === username && u.PasswordHash === password
    );
    if (!user) {
      throw new Error("Usuário ou senha inválido");
    }
    const { PasswordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
