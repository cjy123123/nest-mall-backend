import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { ReceiptService } from './receipt.service'
import { CreateReceiptDto, ReceiptListResponseDto, UpdateReceiptDto } from './dto/receipt.dto'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseDto } from '@/common/dto/response.dto'

@ApiTags('收货管理')
@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  @ApiOperation({ summary: '创建收货地址' })
  @ApiBody({ type: CreateReceiptDto })
  @ApiResponse({ type: ResponseDto })
  create(@Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptService.create(createReceiptDto)
  }

  @Get(':userId')
  @ApiOperation({ summary: '获取当前用户所有收货地址' })
  @ApiResponse({ type: ReceiptListResponseDto })
  findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.receiptService.findOne(userId)
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改收货地址' })
  @ApiResponse({ type: ResponseDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptService.update(id, updateReceiptDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除收货地址' })
  @ApiResponse({ type: ResponseDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.receiptService.remove(id)
  }
}
