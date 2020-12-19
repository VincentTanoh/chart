export class Profile {
  constructor(
    public firstName: string,
    public lastName: string,
    public birthDate: Date,
    public description: string = null,
    public picture: string = null,
    public country: string = null,
    public city: string = null,
    public state: string = null,
    public street: string = null,
    public zipCode: string = null,
    public isCarrier: boolean = false,
    public isProCarrier: boolean = false,
    public isGuarantor: boolean = false,
    public isSeller: boolean = false,
    public isProSeller: boolean = false,
    public isRecommend: boolean = false,
  ) {
  }

  public static dataToProfile(data): Profile {
   // if (data.birthDate) {
    data.birthDate = new Date(data.birthDate);
   // }
    return new Profile(
      data.firstName,
      data.lastName,
      data.birthDate,
      data.description,
      data.picture,
      data.country,
      data.city,
      data.state,
      data.street,
      data.zipCode,
      data.isCarrier,
      data.isProCarrier,
      data.isGuarantor,
      data.isSeller,
      data.isProSeller,
      data.isRecommend
    );
  }
}
