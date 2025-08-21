import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-product',
  imports: [],
  templateUrl: './cart-product.html',
  standalone: true,
  styleUrl: './cart-product.css'
})
export class CartProduct {
  @Input() item_product: any;
  @Output() handleAdd = new EventEmitter<any>();
  @Output() handleRemove = new EventEmitter<any>();

  updateQuantity(change: number): void {
    const newQty = this.item_product.quantity + change;

    if (newQty > 0) {
      this.item_product.quantity = newQty;
      this.handleAdd.emit(this.item_product);
    } else {
      this.item_product.quantity = 0;
      this.handleRemove.emit(this.item_product);
    }
  }

  get totalPrice(): number {
    return this.item_product.price * this.item_product.quantity;
  }
}
