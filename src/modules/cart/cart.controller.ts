import { Controller, Post, Get, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common'
import { CartService } from './cart.service'
import { CreateCartDto, UpdateCartDto, DeleteCartItemsDto } from './dto/cart.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('商品购物车')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: '添加商品到购物车' })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户购物车' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.findOne(id)
  }

  @Patch()
  @ApiOperation({ summary: '修改用户购物车商品数量' })
  update(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(updateCartDto)
  }

  @Delete()
  @ApiOperation({ summary: '批量删除购物车商品' })
  remove(@Body() deleteCartItemsDto: DeleteCartItemsDto) {
    return this.cartService.remove(deleteCartItemsDto)
  }
}
