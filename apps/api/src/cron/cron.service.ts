import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LotteryResultsService } from '../common/lottery-results/lottery-results.service';
import * as cheerio from 'cheerio';
import { Result } from '../common/lottery-results/lottery-results.types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly lotteryResultsService: LotteryResultsService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron('0 21 * * *', {
    name: 'lotteryResults',
    timeZone: 'Asia/Kuala_Lumpur',
  })
  async lotteryResults(): Promise<void> {
    this.logger.log('start lotteryResults');

    type Company = keyof typeof companyIds;
    const companyIds = { 'Magnum 4D': 2, 'Da Ma Cai 1+3D': 1, 'SportsToto 4D': 3 };
    const html = await this.lotteryResultsService.getResults();
    const $ = cheerio.load(html, { xml: true });
    const tables = $('div.card[id*="table-"]').filter((_i, el) => {
      const name = $(el).find('.lottery-name').text().trim();
      return !!Object.keys(companyIds).find((company) => name.includes(company));
    });

    if (tables.length !== 3) return;
    // results might not be the latest date
    if (!tables[0]?.attribs['id']?.includes(new Date().toISOString().substring(0, 10))) return;

    const results: Result[] = [];
    tables.each((_i, el) => {
      const name = $(el).find('.lottery-name').text().trim();
      let companyId: number | unknown;
      for (const key in companyIds) {
        if (name.includes(key)) {
          companyId = companyIds[<Company>key];
          break;
        }
      }
      const drawNumber = $(el).find('span[data-id="draw_no"]').text().trim();
      const top = ['first_prize', 'second_prize', 'third_prize'].map((id) =>
        $(el).find(`td[data-id="${id}"]`).text().trim(),
      );
      const special = $(el)
        .find('td[data-id*="special-"]')
        .filter((_i, el) => {
          const text = $(el).text().trim();
          return !!text && !isNaN(+text);
        })
        .map((_i, el) => $(el).text().trim())
        .toArray();
      const consolation = $(el)
        .find('td[data-id*="consolation-"]')
        .filter((_i, el) => {
          const text = $(el).text().trim();
          return !!text && !isNaN(+text);
        })
        .map((_i, el) => $(el).text().trim())
        .toArray();

      results.push({
        companyId: <number>companyId,
        date: new Date(),
        drawNumber,
        result: { t: top, s: special, c: consolation },
      });
    });

    await this.prisma.result.createMany({
      data: results,
    });

    this.logger.log(results);
    this.logger.log('end lotteryResults');
  }
}
