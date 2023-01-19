import { CreateMerchantDto } from "./createMerchantDto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateMerchantDto extends PartialType(CreateMerchantDto) {}
