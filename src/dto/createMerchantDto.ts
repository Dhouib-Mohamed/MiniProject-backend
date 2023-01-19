import { SignDto } from "./signDto";


export class CreateMerchantDto extends SignDto{

  readonly name: string;
  readonly phoneNumber: string;

  readonly image: string;
}
