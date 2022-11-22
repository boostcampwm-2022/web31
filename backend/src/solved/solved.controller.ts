import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SolvedService } from './solved.service';
import { CreateSolvedDto } from './dto/create-solved.dto';
import { UpdateSolvedDto } from './dto/update-solved.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleSolvedDto } from './dto/simple-solved.dto';

@Controller('solved')
@ApiTags('답안 제출 기록 관련 API')
export class SolvedController {
  constructor(private readonly solvedService: SolvedService) {}

  @Post()
  @ApiOperation({
    summary: '문제 답안 제출 기록 생성 API',
    description: '문제 답안 제출 기록을 생성한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디, 사용자 식별 아이디, 문제 코드, 정답 결과를 담아 저장한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async create(@Body() createSolvedDto: CreateSolvedDto) {
    const simpleSolvedDto = await this.solvedService.create(createSolvedDto);
    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }

  @Get()
  @ApiOperation({
    summary: '문제 답안 제출 기록 조회 API',
    description: '문제 답안 제출 기록을 조회한다.',
  })
  @ApiResponse({
    description:
      '문제 식별 아이디 또는 사용자 식별 아이디를 이용하여 문제 답안 제출 기록을 조회한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async findOne(
    @Query('problemId') problemId: string,
    @Query('userId') userId: string,
  ) {
    const simpleSolvedDtos = await this.solvedService.findSolvedByOpt({
      problemId,
      userId,
    });
    return {
      statusCode: HttpStatus.OK,
      ...simpleSolvedDtos,
    };
  }

  @Patch(':solvedId')
  @ApiOperation({
    summary: '문제 답안 제출 기록 수정 API',
    description: '답안 제출 이후에 채점이 완료되면 상태를 변경한다..',
  })
  @ApiResponse({
    description: '문제 식별 아이디를 이용하여 문제 답안 제출 기록을 수정한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async update(
    @Param('solvedId') solvedId: string,
    @Body() updateSolvedDto: UpdateSolvedDto,
  ) {
    const simpleSolvedDto = await this.solvedService.update(
      +solvedId,
      updateSolvedDto,
    );
    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }

  @Delete(':solvedId')
  @ApiOperation({
    summary: '문제 답안 제출 기록 삭제 API',
    description: '문제 답안 제출 기록을 삭제한다.',
  })
  @ApiResponse({
    description: '문제 식별 아이디를 이용하여 문제 답안 제출 기록을 삭제한다.',
    status: HttpStatus.OK,
    type: SimpleSolvedDto,
  })
  async remove(@Param('solvedId') solvedId: string) {
    const simpleSolvedDto = await this.solvedService.remove(+solvedId);
    return {
      statusCode:
        simpleSolvedDto !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      ...simpleSolvedDto,
    };
  }
}