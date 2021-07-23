import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'; // Services

@Component({
  selector: 'app-cardpanel',
  templateUrl: './cardpanel.component.html',
  styleUrls: ['./cardpanel.component.css']
})
export class CardpanelComponent implements OnInit {
  // Variables ----------------
  search: any;
  available: boolean = false;
  notAvailable: boolean = true;
  number: number=1;
  // Menu / Food /Productss
  menu: any; 
  menuArray: any={};
  // Ingredients
  ingredients: any;
  editIngredientInput: any;
  newIngredients: any;
  ingredientsArray: any={};
  ingredientsInput: any={};
  editIngredients: any={};
  // Categories
  category: any;
  // Modal Variables
  openEditModal: boolean = false;
  deleteModal: boolean = false;
  openViewModal: boolean = false;
  addIngredientModal: boolean = false;
  openEditIngredientModal: boolean=false;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getMenu();
    this.upAvailable();
    this.intervalFunction();
    this.getCategories();
    this.getNewIngredients();
  }
  // --------------- Modals ------------------------------
  // Add Ingredient Modal
  addIngModal(ingredient: any): void{
    this.addIngredientModal = true;
    this.getIngredients(ingredient.product_id);
    this.getNewIngredients();
  }
  // Close Add Ingredient Modal
  closeAddIng(): void{
    this.addIngredientModal = false;
  }
  // Edit Product Modal 
  editModal(editFood: any): void{
    this.openEditModal = true;
    this.menuArray.product_id = editFood.product_id;
    this.menuArray.product_name = editFood.product_name;
    this.menuArray.product_price = editFood.product_price;
    this.menuArray.product_type = editFood.product_type;
    this.getIngredients(this.menuArray.product_id);
  }
  // Close Edit Product Modal
  closeEditModal(): void{
    this.openEditModal = false;
  }
  // View Product Modal 
  viewModal(editFood: any): void{ 
    this.openViewModal = true;
    this.menuArray.product_id = editFood.product_id;
    this.menuArray.product_name = editFood.product_name;
    this.menuArray.product_price = editFood.product_price;
    this.menuArray.product_type = editFood.product_type;
    this.menuArray.available = editFood.available;
    this.getIngredients(this.menuArray.product_id);
  }
  // Close View Product Modal
  closeViewModal(): void{
    this.openViewModal = false;
  }
  // Delete Product Modal 
  openDelete(menu: any): void{
    this.deleteModal = true;
    this.getMenu();
    this.menuArray.product_id = menu.product_id;
    this.menuArray.product_name = menu.product_name;
  }
  // Close Delete Modal
  closeDelete(): void{
    this.deleteModal = false;
  }
  // Open Edit Ingredient
  openEditIngredient(ingredient: any): void{
    this.editIngredientInput = ingredient.ing_use;
    this.editIngredients.id = ingredient.item_id;
    this.editIngredients.prod_id = ingredient.prod_id;
    this.openEditIngredientModal=true;
  }
  // Close Edit Ingredient
  closeEditIngredient(): void{
    this.openEditIngredientModal=false;
  }
  // ------------------ Functions ------------------------
  // Get all Products 
  getMenu(): void{
    this.data.getData("all_menu", this.search).subscribe((results: any) => {
      this.menu = results.data;
    })
  }
  // Delete Product
  deleteMenu(menu: any): void{
    this.menuArray.product_id = menu;
    this.data.getData("delete_menu", this.menuArray).subscribe((results: any) => {
    this.getMenu();
    this.closeDelete();
    })
  }
  // Update Product
  updateMenu(): void {
    this.data.getData("update_menu", this.menuArray).subscribe((results: any) => {
      this.openEditModal = true;
      this.getMenu();
      this.closeEditModal();
    })
  }
  // Get all Ingredients of the product
  getIngredients(ingId: number){
    this.ingredientsArray.product_id = ingId;
    this.data.getData("ingredients", this.ingredientsArray).subscribe((results: any) => {
      this.ingredients = results.data;
    });
  }
  // Get all Ingredients with no product
  getNewIngredients(): void{
    this.data.getData("ingredients_null", 'NULL').subscribe((results: any) => {
      this.newIngredients = results.data;
    })
  }
  // Add Ingredient
  addIngredient(event: any,ingredient: any): void{
    this.ingredientsInput.name=event.target.ingredientAdd.value;
    this.ingredientsInput.id=ingredient.product_id;
    this.data.getData("add_ing_prod", this.ingredientsInput).subscribe((results: any) => {
      this.getIngredients(this.ingredientsInput.id);
      this.getNewIngredients();
      this.upAvailable();
    })
  }
  // Update Ingredient
  updateIngredient(): void {
    this.editIngredients.use = this.editIngredientInput;
    this.data.getData("update_ing", this.editIngredients).subscribe((results: any) => {
      this.openEditModal = true;
      this.getMenu();
      this.getIngredients(this.editIngredients.prod_id);
      this.closeEditIngredient();
    })
  }
  // Delete Ingredient
  deleteIngredient(ingredients: any): void{
    
    this.data.getData("delete_ing", ingredients).subscribe((results: any) => {})
    this.getIngredients(ingredients.prod_id);
    this.getNewIngredients();
    this.upAvailable();
  }
  // Get List Category 
  getCategories(): void{
    this.data.getData("all_category", 'NULL').subscribe((results: any) => {
      this.category = results.payload;
    })
  }
  // Update Avaialble
  upAvailable(): void {
    this.data.getData("available", this.ingredientsArray).subscribe((results: any) => {})
  }
  // Interval Function per second
  intervalFunction(): void{
    setInterval(() => { this.getMenu() }, 1000);
    setInterval(() => { this.upAvailable() }, 1000);
  }
}
