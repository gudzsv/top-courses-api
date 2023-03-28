import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Types } from 'mongoose';
import { ID_VALIDATION_ERROR } from './id-validation.constant';

@Injectable()
export class IdValidationPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (metadata.type != 'param') {
			return value
		}
		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException(ID_VALIDATION_ERROR);
		}
		return value;
	}
}