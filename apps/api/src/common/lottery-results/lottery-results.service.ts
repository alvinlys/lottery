import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config';

@Injectable()
export class LotteryResultsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getResults(): Promise<string> {
    const { data }: { data: string } = await firstValueFrom(
      this.httpService.post(
        <string>this.configService.get<EnvironmentVariables['LOTTERY_URL']>('LOTTERY_URL'),
      ),
    );
    return data;
  }
}
