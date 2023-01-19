import { CreateClientDto } from "./createClientDto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateClientDto extends PartialType(CreateClientDto) {}
