import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CartProduct } from '../cart-product/cart-product';

@Component({
  selector: 'app-product',
  imports: [CartProduct],
  templateUrl: './product.html',
  styleUrls: ['./product.css']  
})
export class Product implements OnInit {
  api = inject(HttpClient);
  product_items: any[] = [];

  constructor() {
    return
  }

  ngOnInit() {
    this.GetApiCrud();
  }

  GetApiCrud() {
    this.api.get('https://dummyjson.com/products').subscribe((result: any) => {
      this.product_items = result.products.map((p: any) => ({ ...p, quantity: 0 }));
      this.loadCartFromLocalStorage();
    });
  }

  loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cart_items');
  console.log('Loading cart from localStorage', savedCart);
  if (savedCart) {
    const savedItems = JSON.parse(savedCart);
    this.product_items = this.product_items.map(item => {
      const savedItem = savedItems.find((s: any) => s.id === item.id);
      return savedItem ? { ...item, quantity: savedItem.quantity } : item;
    });
  }
}

  AddhadleCart(updatedItem: any) {
  console.log('AddhadleCart called', updatedItem);
  const index = this.product_items.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    this.product_items[index].quantity = updatedItem.quantity;
  }
  this.saveCartToLocalStorage();
}


  saveCartToLocalStorage() {
  const cartToSave = this.product_items.filter(item => item.quantity > 0);
  console.log('Saving cart to localStorage', cartToSave);
  localStorage.setItem('cart_items', JSON.stringify(cartToSave));
}

  delete() {
    this.product_items = this.product_items.map(item => ({ ...item, quantity: 0 }));
    localStorage.removeItem('cart_items');
  }

  get total_Price(): number {
    const total = this.product_items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return Number(total.toFixed(2));
  }

  alert() {
    Swal.fire({
      title: '<strong class="text-xl font-extrabold text-blue-700">Purchase Complete!</strong>',
      html: `
        <p class="text-lg">Your total price is <strong>$${this.total_Price}</strong>.</p>
        <p class="mt-2 text-gray-600">Thank you for shopping with us!</p>
      `,
      icon: 'success',
      iconColor: '#2563EB', 
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: 'Great!',
      confirmButtonColor: '#2563EB', 
      customClass: {
        popup: 'rounded-xl shadow-xl p-6',
        confirmButton: 'font-semibold px-6 py-2 rounded-lg',
        title: 'mb-4'
      }
    });
  }
}
