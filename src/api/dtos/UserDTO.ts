interface UserDTO {
  id?: number;
  Login: string;
  PasswordHash?: string;
  Token: string;
  Expiration: string;
  FirstName: string;
  LastName: string;
}

export default UserDTO;
