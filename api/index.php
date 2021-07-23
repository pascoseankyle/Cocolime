<?php 
	date_default_timezone_set('Asia/Manila'); 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: PUT, POST, PATCH, OPTIONS, GET');
	header('Content-Type: application/json');       

    include_once './config/Database.php';
    include_once './models/post.php';
	include_once './models/auth.php';
    
	$database = new Database();
	$db = $database->connect(); // Database.php -> Database Clasee -> connect
	$post = new Post($db); // Post.php -> Post Class -> construct (db) _> Post functions
	$auth = new Auth($db);
	$data = array();
	$req = explode('/', rtrim($_REQUEST['request'], '/'));
	  switch ($_SERVER['REQUEST_METHOD']) {		
		  case 'POST':
			  switch ($req[0]) {
				// -------------------- Post Class ---------------------

				// ------------ INGREDIENTS -----------
				case 'ingredients': // Get All Ingredients
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->generalQuery("SELECT * FROM inventory_tb WHERE prod_id  = '$d->product_id'"));					
				break;
				case 'ingredients_null': // Get All Ingredients
					echo json_encode($post->generalQuery("SELECT * FROM inventory_tb WHERE prod_id  = '0' ORDER BY `item_name` ASC"));					
				break;
				case 'get_productId': // Get Product id
					echo json_encode($post->generalQuery("SELECT * FROM `menu_tb` ORDER BY product_id DESC LIMIT 1"));					
				break;
				case 'add_ing': // Add Ingredients
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->addIngredients($d));
				break;
				case 'update_ing': // Update Ingredients
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->editIngredients($d));
				break;
				case 'delete_ing': // Update Ingredients
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->deleteIngredients($d));
				break;
				case 'add_ing_prod': // Add Ingredients for Product
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->addIngredientProducts($d));
				break;
				// --------------- MENU -----------------
				case 'all_menu': // Get All Menu
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->generalQuery("SELECT * FROM `menu_tb` WHERE `product_name` LIKE '%$d%' OR 
					`product_type` LIKE '%$d%' ORDER BY `product_name` ASC"));					
				break;
				case 'add_menu': // Add Product
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->addProduct($d));
				break;
				case 'update_menu': // Update Product 
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->editProduct($d));
				break;
          		case 'delete_menu': // Delete Product 
					$d = json_decode(base64_decode(file_get_contents("php://input")));
                    echo json_encode($post->delProduct($d));
				break;
				// --------------CATEGORY ----------------
				case 'all_category': // Get All Category
					echo json_encode($post->generalQuery("SELECT * FROM category_tb ORDER BY id DESC"));	
				break;
				case 'add_category': // Add Category
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->addCategory($d));
				break;
				case 'delete_category': // Delete Category
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->deleteCategory($d));
				break;
				case 'update_category': // Update Category
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->editCategory($d));
				break;
				// ----------- PROCESS | TO BE TESTED !! WARNING ---
				case 'proccess': // Updates ingredients Quantity 
					$d = json_decode(base64_decode(file_get_contents("php://input")));
                    echo json_encode($post->proccess($d));
				break;
				case 'available': // Checks if available
					echo json_encode($post->checkAvaialble());
				break;
				
				// -------------------- Auth Class --------------------
				case 'register': // Add User
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->registerUser($d));
				break;

				case 'login': //  Login User
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->loginUser($d));
				break;
				
				// ------------------- INVENTORY ------------------------
				case 'inventory':
					echo json_encode($post->selectInv("inventory_tb", "0"));
				break;
				case 'inventory_Archive':
					echo json_encode($post->selectArchive("inventory_tb", "1"));
				break;
				case 'addProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->addProductInv($d));
				break;
				case 'editProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->editProductInv($d));
				break;
                case 'delProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
                    echo json_encode($post->delProductInv($d));
				break;
				case 'arcProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->arcProduct($d));
				break;
				case 'recProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->recProduct($d));
				break;
				case 'registerUser':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->registerUser($d));
				break;
				case 'loginUser':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->loginUser($d));
				break;
				case 'selectMY':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->selectMY($d));
				break;
				case 'selectM':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->selectM($d));
				break;
				
				default:
					http_response_code(400);
					echo "Bad Request";
				break;
			  }
		  break;
		  case 'GET':
			  switch ($req[0]) {

			  }
		  break;
		  default:
			  http_response_code(400);
			  echo "Bad Request";
		  break;
	  }

?>
