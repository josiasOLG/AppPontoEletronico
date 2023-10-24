import ApiBase from "../ApiBase";
import UserDTO from "../dtos/UserDTO";
import UserWithoutPasswordDTO from "../dtos/UserWithoutPasswordDTO";

export default class UserAPI extends ApiBase {
  private static instance: UserAPI;

  private constructor() {
    super("/users");
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
    if (process.env.ENVIRONMENT == "localhost") {
      return this.loginLocal(username, password);
    } else {
      const loginData = {
        username,
        password,
      };
      return this.post<typeof loginData, UserDTO>("/users", loginData);
    }
  }

  public async loginLocal(
    username: string,
    password: string
  ): Promise<UserDTO> {
    const allUsers: UserDTO[] = await this.get<UserDTO[]>("");
    const user = allUsers.find(
      (u) => u.username === username && u.senha === password
    );
    if (!user) {
      throw new Error("Usuário ou senha inválido");
    }
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
