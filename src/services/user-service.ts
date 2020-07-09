import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models/user.model';
import {Credentials, UserRepository} from '../repositories/user.repository';
import {BcryptHasher} from './hash.password.bcrypt';
export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
  ) {}
  async verifyCredentials(credentials: Credentials): Promise<User> {
    //
    const foundUser = await this.userRepository.findOne({
      where: {
        email: credentials.email,
      },
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        `user not found with this email ${credentials.email}`,
      );
    }
    const passwordMatched = await this.hasher.comparePassword(
      credentials.password,
      foundUser.password,
    );
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('Password is not valid');
    }
    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    let userName = '';
    if (user.firstName) {
      userName = user.firstName;
    }
    if (user.lastName) {
      userName = user.firstName
        ? `${user.firstName} ${user.lastName}`
        : user.lastName;
    }
    const data = {
      id: user.id,
      name: userName,
      role: user.role,
      [securityId]: `${user.id}`,
    };
    return data;
  }

  async getUser(token: string): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: token,
      },
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound(`user not found`);
    }
    return foundUser;
  }
}
