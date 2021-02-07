import { Injectable } from '@nestjs/common';
import { GoogleUserInfo } from 'src/common/google-auth-interface';
import { UserResponseDTO } from 'src/user/dto/user-response.dto';
import { UserService } from '../user/user.service';

import * as jwt from 'jsonwebtoken';

import SSOUserDTO from "./dto/sso-user.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(userInfo: GoogleUserInfo): Promise<UserResponseDTO> {
    const user = await this.userService.findByEmail(userInfo.email);

    if (!user) {
      const newUser = await this.userService.createUser(userInfo);
      return newUser;
    }

    return user;
  }


  public decryptCodeFromSSOServer(code: string): SSOUserDTO {
    const { data } = jwt.verify(code, process.env.SSO_JWT_SECRET) as { data: SSOUserDTO };

    return data;
  }

  public createAccessToken(userResponseDTO: UserResponseDTO): string{

    return jwt.sign(
      {data: userResponseDTO, timestamp: Date.now()},
      process.env.JWT_SECRET,
      {
        expiresIn: Number(process.env.JWT_EXPIRATION)
      }
    );
  }

  
}