import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { PAGE_NOT_FOUND_BY_CATEGORY_ERROR, PAGE_NOT_FOUND_ERROR } from './top-page.constants';

import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) { }

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return await this.topPageService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPageService.fingById(id);
		if (!page) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}
		return page;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias',) alias: string) {
		const page = await this.topPageService.fingByAlias(alias);
		if (!page) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}
		return page;
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text',) text: string) {
		return await this.topPageService.fingByText(text);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.topPageService.deleteById(id);
		if (!deletedPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatedPage = await this.topPageService.updateById(id, dto);
		if (!updatedPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}
		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		const foundCategory = await this.topPageService.findByCategory(dto);
		if (!foundCategory) {
			throw new NotFoundException(PAGE_NOT_FOUND_BY_CATEGORY_ERROR);
		}
		return foundCategory;
	}
}
