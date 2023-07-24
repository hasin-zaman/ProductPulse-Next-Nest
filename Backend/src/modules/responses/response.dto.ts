import { IsNotEmpty } from "class-validator";

export class postResponseDto {
    
    @IsNotEmpty({ message: 'Response is required.' })
    response: string;

}