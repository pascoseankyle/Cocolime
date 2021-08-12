<?php 
	require_once("./config/Config.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$post = new Post($pdo);
	$get = new Get($pdo);
	$auth = new Auth($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim($_REQUEST['request'], '/'));
	} else {
		$req = array("errorcatcher");
	}

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':

			

			switch($req[0]) {
				// case 'pre':
				// 	if(count($req)>1){
				// 		echo json_encode($gm->select_pre('pos_order_tb'.$req[0], $req[1]),JSON_PRETTY_PRINT);
				// 	} else {
				// 		echo json_encode($gm->select_pre('pos_order_tb', null),JSON_PRETTY_PRINT);
				// 	}
				// break;




				case 'addOrder':
                    $d = json_decode(base64_decode(file_get_contents("php://input")));
                    echo json_encode($gm->insert("pos_preorder_tb",$d), JSON_PRETTY_PRINT);
                break;
				// case 'addPreOrder':
                //     $d = json_decode(base64_decode(file_get_contents("php://input")));
                //     echo json_encode($gm->insert("pos_order_tb",$d), JSON_PRETTY_PRINT);
                // break;
				case 'getProd':
                    $d = json_decode(base64_decode(file_get_contents("php://input")));
                    echo json_encode($gm->insert("menu_tb",$d), JSON_PRETTY_PRINT);
                break;
				case 'updatePreOrder':
                    $d = json_decode(base64_decode(file_get_contents("php://input")));
                    echo json_encode($gm->edit("pos_order_tb",$d), JSON_PRETTY_PRINT);
                break;
				case 'prod':                   
					if(count($req)>1) {                        
						echo json_encode($get->pullProduct($req[1]), JSON_PRETTY_PRINT);                   
					} 
				   else
				   {                        
						echo json_encode($get->pullProduct(null), JSON_PRETTY_PRINT); 
				   }                
						break;
				case 'order':                   
					 if(count($req)>1) {                        
						 echo json_encode($get->pullOrder($req[1]), JSON_PRETTY_PRINT);                   
					 } 
					else
					{                        
						 echo json_encode($get->pullOrder(null), JSON_PRETTY_PRINT); 
					}                
						 break;
						 
				 case 'delOrder': 
					    $d = json_decode(base64_decode(file_get_contents("php://input"))); 
						     echo json_encode($post->delOrder($d), JSON_PRETTY_PRINT);           
							break;
				 case 'delPre': 
					    $d = json_decode(base64_decode(file_get_contents("php://input"))); 
						     echo json_encode($post->delPre($d), JSON_PRETTY_PRINT);           
							break;
				 case 'clearOrder':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($gm->clearOrder($d));
							break;


							case 'clearAll':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->clearAll($d));
							break;

				// UPDATED FUNCTIONS

							case 'pushCode':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->pushCode($d), JSON_PRETTY_PRINT);
							break;	

							case 'addPreOrderNew':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->addPreOrderNew($d), JSON_PRETTY_PRINT);
							break;	

							case 'pre':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($get->pullPreOrders($d), JSON_PRETTY_PRINT);    
							break;

							case 'preOrder':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($get->pullPreOrderReceipt($d), JSON_PRETTY_PRINT);    
							break;

							case 'pullDetails':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($get->pullDetails($d), JSON_PRETTY_PRINT);    
							break;

							case 'addOrderlist':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->addOrderlist($d), JSON_PRETTY_PRINT);    
							break;

							case 'submittedOrder':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->submittedOrder($d), JSON_PRETTY_PRINT);    
							break;

							case 'pullDateAndCode':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($get->pullDateAndCode($d), JSON_PRETTY_PRINT);
							break;

							case 'posCateg':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($get->categories($d), JSON_PRETTY_PRINT);
							break;

							case 'pullByCateg':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($get->pullByCateg($d), JSON_PRETTY_PRINT);
							break;


							case 'bestSeller':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($get->bestSeller($d), JSON_PRETTY_PRINT);
							break;



							// PULLING OF AVAILABLE TABLES

							case 'availableTables':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($get->availableTables($d), JSON_PRETTY_PRINT);
							break;

							case 'tableOccupied':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->tableOccupied($d), JSON_PRETTY_PRINT);
							break;


							// MENU SUBSYSTEM REQUEST (NEW)
							case 'categories':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($get->categories($d), JSON_PRETTY_PRINT);
							break;

							case 'add_categories':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->add_categories($d), JSON_PRETTY_PRINT);
							break;

							case 'edit_categories':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->edit_categories($d), JSON_PRETTY_PRINT);
							break;

							case 'del_categories':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->del_categories($d), JSON_PRETTY_PRINT);
							break;


							// CRM REQUEST (NEW)

							
							case 'addReservation':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->addReservation($d), JSON_PRETTY_PRINT);
							break;

							case 'resNew':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->resNew($d), JSON_PRETTY_PRINT);
							break;

							case 'newRes':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->newRes($d), JSON_PRETTY_PRINT);
							break;

							case 'confirmReservation':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->confirmReservation($d), JSON_PRETTY_PRINT);
							break;
								

							case 'voidRes':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->voidRes($d), JSON_PRETTY_PRINT);
							break;

							case 'notConfirmed':
								$d = json_decode(base64_decode(file_get_contents("php://input")));
								echo json_encode($post->notConfirmed($d), JSON_PRETTY_PRINT);
							break;
								
			}
		break;

		case 'GET':
			switch ($req[0]) {

				default:
				http_response_code(400);
				echo "Bad Request";
				break;
			}
		break;

		default:
			http_response_code(403);
			echo "Please contact the Systems Administrator";
		break;
	}
?>