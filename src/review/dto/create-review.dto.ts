import { IsNumber, IsString, Max, Min } from 'class-validator';


export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5, { message: "Reating can't be more then 5" }) //You can customize this message 
	@Min(1, { message: "Reating can't be less then 1" })
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}