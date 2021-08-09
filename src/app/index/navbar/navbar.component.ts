import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Variables
  id: any;
  inputProduct: any;
  category: any;
  updateCategoryInput: any;
  ingredients: any;
  // Arrays
  arraySample: any=[]=[]; 
  arrayQTY: any=[]=[];
  // Objects
  inputProductArray: any={};
  ingredientArray: any={};
  inputCategory: any={};
  editCategory: any={};
  categoryDelete: any={};
  updateCategorySend: any={};
  // Modals Var ------------------
  openAddModal: boolean=false;
  openAddModalIng: boolean=false;
  openAddCat: boolean=false;
  openEditCat: boolean=false;
  deleteCatModal: boolean=false;

  constructor(private data: DataService) { }
  
  ngOnInit(): void {
    this.getProductId();
    this.getCategories();
    this.getIngredients();
  }
  // ------------- Modals -------------------
  // ---- Menu -------------------------
  // Add Menu Modal 
  openModal(): void{
      this.openAddModal = true;
      this.getIngredients();
  }
  // Close Menu Modal 
  closeModal(): void{
      this.openAddModal = false;
      this.arraySample=[];
      this.inputProduct="";
  }
  // ----- Ingredients ------------------
  // Ingredient Modal 
  openModalIng(event: any): void{   
      this.inputProductArray.id = parseInt(event.target.prod_id.value) + 1;
      this.inputProductArray.product_name = event.target.input_product_name.value;
      this.inputProductArray.product_price = event.target.input_product_price.value;
      this.inputProductArray.product_type = event.target.input_product_type.value;
      this.openAddModal = false;
      this.openAddModalIng = true;  
  }
  // Back to Product Add 
  backToAdd(): void{
      this.openAddModal = true;
      this.openAddModalIng = false;
  }
  // --- Category -----------------------
  // Open Edit Category Modal
  openEditCatModal(category: any): void{
    this.openEditCat=true;
    this.editCategory.name = category.name;
    this.editCategory.id = category.id;
  }
  // Close Edit Category Modal
  closeEditCatModal(): void{
    this.openEditCat=false;
  }
  // Open Add new Category Modal
  openCatModal(): void{
    this.openAddCat=true;
  }
  // Close Add new Category Modal
  closeCatModal():void {
    this.openAddCat=false
  }
  // Open Delete Category Modal
  openDeleteCatModal(category: any): void{
    this.deleteCatModal=true;
    this.categoryDelete.id = category.id;
    this.categoryDelete.name = category.name;
  }
  // Close Delete Category Modal
  closeDeleteCatModal(): void{
    this.deleteCatModal=false;
  }
  // ---------- Ingredient ---------------
  // GET all NUll ingredients
  getIngredients(): void{
    this.data.getData("ingredients_null", 'NULL').subscribe((results: any) => {
      this.ingredients = results.data;
    });
  }
  // Push Ingredients Array
  addIng(event: any): void{
    let empty = event.target.ingredientQty.value;
    if(empty != ""){
    }
    else{
      empty = "1";
    }
    this.arrayQTY.push(empty);
    this.arraySample.push(event.target.ingredientString.value);
    event.target.ingredientQty.value="";
    // Removes all duplicates
    let x = (names: any) => names.filter((v: any,i: any) => names.indexOf(v) === i);
    this.arraySample = x(this.arraySample);
  }
  // Pop Ingredients Array 
  removeIng(i: number): void{
    this.arraySample.splice(i, 1);
    this.arrayQTY.splice(i, 1);
  }
  // ---------- Others --------------------
  // Empty all inputs and arrays 
  removeAll(): void{
      this.openAddModalIng = false;
      this.arraySample=[];
      this.inputProduct="";
  }
  // Get Last Product Id for New product and use it for ingredient 
  getProductId(): void{
      this.data.getData("get_productId", this.inputProductArray).subscribe((results: any) => {
        this.id = results.data;
      })
  }
  // ----------- Main ---------------------
  // Send to Database // Product and Ingredient of the Product 
  finishAdd():void {
      this.ingredientArray.ingredients = this.arraySample;
      this.ingredientArray.qty = this.arrayQTY;
      this.ingredientArray.id =  this.inputProductArray.id;
      this.data.getData("add_ing", this.ingredientArray).subscribe((results: any) => {})
      this.data.getData("add_menu", this.inputProductArray).subscribe((results: any) => {
        this.getIngredients();
        window.location.reload();
        this.removeAll();
      })
  }
  // ----------- Category -----------------
  // Get List Category 
  getCategories(): void{
    // this.data.getData("all_category", 'NULL').subscribe((results: any) => {
    //   this.category = results.payload;
    // })


    this.data.apiReqPos("categories", null).subscribe((res: any) =>
    {
      this.category = res.payload;
  
    })

    console.log(this.category);
  }
  // Add Category
  addCategory(event: any): void{
    this.inputCategory.name = event.target.input_category_name.value;
    this.data.apiReqPos("add_categories", this.inputCategory).subscribe((results: any) => { 
      this.getCategories() 
      event.target.input_category_name.value = "";
    })
  }
  // Delete Category
  deleteCategory(): void{

    this.data.apiReqPos("del_categories", this.categoryDelete).subscribe((results: any) => { 
      this.getCategories();
      this.closeDeleteCatModal(); 
    })
  }
  // Update Category
  updateCategory(): void{
    this.updateCategorySend.name = this.updateCategoryInput;
    this.updateCategorySend.id =   this.editCategory.id;
    this.data.apiReqPos("edit_categories", this.updateCategorySend).subscribe((results: any) => { this.getCategories(); this.closeEditCatModal(); })
  }
}
