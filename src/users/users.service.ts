import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashingService } from 'src/auth/hashing.service';
import { userDocument } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private userModel: Model<userDocument>,
    private hashService: HashingService,
  ) {}

  async create(body) {
      const { password } = body;
      const hashedPassword = await this.hashService.hash(password);
      body.password = hashedPassword;
    return this.userModel.create(body);
  }

  private successMessage(action: string) {
    return { success: true, message: `The User is ${action} successfully!` };
  }

  private failedMessage(action: string, error = null) {
    return { success: false, message: `it could not ${action}`, error: error };
  }

  get(id: string) {
    return this.userModel.findById(id);
  }

  findOne(filter,projection=null) {
    return this.userModel.findOne(filter,projection);
  }

  async remove(id: string) {
    await this.userModel.deleteOne({ _id: id });
    return this.successMessage('deleted');
  }

  async update(id: string, updatecDocument) {
    await this.userModel.updateOne({ _id: id }, updatecDocument);
    return this.successMessage('updated');
  }

  async verify(id: string) {
    await this.userModel.updateOne({ _id: id }, { is_verified: true });
    return this.successMessage('verified');
  }

  async unlock(id: string) {
    await this.userModel.updateOne({ _id: id }, { is_locked: false });
    return this.successMessage('unlocked');
  }

  async lock(id: string) {
    const date = new Date();
    await this.userModel.updateOne(
      { _id: id },
      { is_locked: true, date_locked: date },
    );
    return this.successMessage('locked');
  }
}
