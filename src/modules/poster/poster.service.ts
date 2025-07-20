import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'
import * as path from 'path'
import { CreatePosterDto } from './poster.dto'
import { ConfigService } from '@nestjs/config'
import { nanoid } from 'nanoid'

@Injectable()
export class PosterService {
  constructor(private readonly configService: ConfigService) {}

  async createGoodsPoster(goodsId: number) {
    const BASE_URL = this.configService.get<'string'>('BASE_URL')

    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 380, height: 470 },
    })

    const page = await browser.newPage()

    await page.goto(`${BASE_URL}/template/goods-poster.html`, {
      waitUntil: 'networkidle0',
    })

    // 注入数据
    await page.evaluate(() => {
      // document.querySelector('#title')!.textContent = opts.title
      // document.querySelector('#price')!.textContent = `￥${opts.price}`
      // document.querySelector('#product-img')!.setAttribute('src', opts.imageUrl)
      // document.querySelector('#qrcode-img')!.setAttribute('src', opts.qrCodeUrl)
    })

    const imgPath = path.join(process.cwd(), 'uploads', `${nanoid(10)}.png`) as `${string}.png`
    const buffer = await page.screenshot({
      type: 'png',
      fullPage: false,
      path: imgPath,
      omitBackground: true,
    })

    await browser.close()
    return {
      data: imgPath.split('/uploads')[1],
    }
  }
}
