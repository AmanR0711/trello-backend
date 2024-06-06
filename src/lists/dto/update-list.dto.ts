import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';

export class UpdateBoardDto extends PartialType(CreateListDto) {}
