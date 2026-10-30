import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({description: 'the name of the user'})
    name: string;
    @ApiProperty({description: 'the price of the user'})
    price: number;
    @ApiProperty({description: 'the description of the user'})
    description:string;
}
