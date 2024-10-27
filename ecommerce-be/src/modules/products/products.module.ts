import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products, ProductsSchema } from './schemas/products.schema';
import { CategoriesModule } from '../categories/categories.module';
import { PaginationModule } from '../pagination/pagination.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductsSchema }]),
    CategoriesModule,
    PaginationModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}