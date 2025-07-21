import { BadRequestException, Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'
import { CreatePosterDto, GetQRCodeDTO } from './poster.dto'
import { ConfigService } from '@nestjs/config'
import { nanoid } from 'nanoid'
import { getAccessTokenAPI } from '@/utils'
import axios from 'axios'
import { IMAGE_BASE64_PREFIX } from '@/constants'
import { isBuffer } from 'lodash'
import { GoodsService } from '../goods/goods.service'
import { GoodsSpecService } from '../goods-spec/goods-spec.service'

@Injectable()
export class PosterService {
  constructor(
    private readonly configService: ConfigService,
    private goodsSpecService: GoodsSpecService,
  ) {}

  async createGoodsPoster(goodsSpecId: number) {
    const BASE_URL = this.configService.get<'string'>('BASE_URL')

    // 获取商品信息
    const goodsSpec = await this.goodsSpecService.findOne(goodsSpecId)

    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 380, height: 470 },
    })
    const page = await browser.newPage()
    await page.goto(`${BASE_URL}/template/goods-poster.html`, {
      waitUntil: 'networkidle0',
    })

    // 获取二维码
    const { data: qrCodeBase64 } = await this.getQRCode({
      goodsId: goodsSpec.goodsId,
      page: 'pages/goods/detail',
      goodsSpecId,
    })

    // 注入数据
    await page.evaluate(
      ({ qrCodeBase64, goodsSpec, BASE_URL }) => {
        document.querySelector('#product-img')!.setAttribute('src', BASE_URL + goodsSpec.cover?.[0])
        document.querySelector('#qrcode-img')!.setAttribute('src', qrCodeBase64)
        document.querySelector('#title')!.textContent = goodsSpec.title
        document.querySelector('#price')!.textContent = `￥${goodsSpec.price}`
        document.querySelector('#discountPrice')!.textContent =
          `￥${goodsSpec?.discountPrice ?? goodsSpec.price}`
      },
      {
        qrCodeBase64,
        goodsSpec,
        BASE_URL,
      },
    )

    await page.waitForSelector('#product-img', { timeout: 3000 })

    const buffer = await page.screenshot({
      type: 'png',
      fullPage: false,
      omitBackground: true,
    })

    await browser.close()

    return {
      data: IMAGE_BASE64_PREFIX + Buffer.from(buffer).toString('base64'),
    }
  }

  async getQRCode({ goodsId = 0, page, goodsSpecId = 0 }: GetQRCodeDTO) {
    const appId = this.configService.get<'string'>('WECHAT_APP_ID') ?? '****'
    const appSecret = this.configService.get<'string'>('WECHAT_APP_SECRET') ?? '****'
    const { access_token } = await getAccessTokenAPI(appId, appSecret)

    const { data } = await axios({
      method: 'POST',
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit',
      params: {
        access_token,
      },
      data: {
        page,
        scene: `goodsId=${goodsId}&goodsSpecId=${goodsSpecId}`,
        check_path: false,
      },
      responseType: 'arraybuffer',
    })

    if (!isBuffer(data)) {
      throw new BadRequestException('获取二维码失败！')
    }

    const buffer = Buffer.from(data)

    return {
      data: IMAGE_BASE64_PREFIX + buffer.toString('base64'),
    }
  }
}
