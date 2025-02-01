import { Controller, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('/api/series')
export class SeriesController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ) {}


}
