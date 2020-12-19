import {Profile} from '@app/models/profile';

export class User {

  constructor(
    public id: string,
    public email: string,
    public emailVerifiedAt: Date = null,
    public identityVerifiedAt: Date = null,
    public phoneVerifiedAt: Date = null,
    public phoneNumber: string,
    public phoneCountry: string,
    public profile: Profile,
  ) {
  }

  public static dataToUser(data): User {
    const profile = Profile.dataToProfile(data.profile);
    if (data.emailVerifiedAt) {
      data.emailVerifiedAt = new Date(data.emailVerifiedAt);
    }

    if (data.identityVerifiedAt) {
      data.emailVerifiedAt = new Date(data.emailVerifiedAt);
    }

    if (data.phoneVerifiedAt) {
      data.emailVerifiedAt = new Date(data.emailVerifiedAt);
    }

    return new User(
      data.id,
      data.email,
      data.emailVerifiedAt,
      data.identityVerifiedAt,
      data.phoneVerifiedAt,
      data.phoneNumber,
      data.phoneCountry,
      profile
    );
  }

  get fullName(): string {
    return `${this.profile.firstName} ${this.profile.lastName.toUpperCase()}`;
  }

  verifiedEmail(): boolean {
    return this.emailVerifiedAt !== null;
  }

  verifiedPhone(): boolean {
    return this.phoneVerifiedAt !== null;
  }

  verifiedIdentity(): boolean {
    return this.identityVerifiedAt !== null;
  }
}
