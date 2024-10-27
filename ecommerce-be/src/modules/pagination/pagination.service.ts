import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PaginationResult } from './pagination-result.interface';

@Injectable()
export class PaginationService {
  async paginate<T extends Document>(
    model: Model<T>,
    paginationQuery: PaginationQueryDto,
    filters: any = {},
    sort: any = {},
  ): Promise<PaginationResult<T>> {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      model.find(filters).sort(sort).skip(skip).limit(limit).exec(),
      model.countDocuments(filters),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      pages,
    };
  }
}
