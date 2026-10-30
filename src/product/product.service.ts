import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';

@Injectable()
export class ProductService {
  private products : Product[]=[];
  create(createProductDto: CreateProductDto) {
    const product : Product ={
      id: this.products.length +1,
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description,
    };
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find(p=> p.id === id);
    if(!product){
      throw new NotFoundException('Product with id ${id} not found')
    }
    return{status:200, message:'Product retrieved successfully',data:product};
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex(product=>product.id === id);
    if(index === -1){
      throw new NotFoundException('User with id ${id} not found')
    }
    this.products[index]= {
      ...this.products[index],
      ...updateProductDto
    };
    return{status:200, message:'product updated successfully',data : this.products[index]};
  }

  remove(id: number) {
    const index = this.products.findIndex(product=>product.id === id);
    if(index === -1){
      throw new NotFoundException('Product with id ${id} not found');
    }
    this.products.slice(index,1);
    return {status:200, message:'Product removed successfully', data : {}};
  }
}
