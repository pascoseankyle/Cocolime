<?php 
	class Post {
		private $conn;
		private $sql;
		private $data = array();
		private $info = [];
		private $status =array();
		private $failed_stat = array(
			'remarks'=>'failed!',
			'message'=>'Failed to retrieve the requested records'
		);
		private $success_stat = array(
			'remarks'=>'success!',
			'message'=>'Successfully retrieved the requested records'
		);
		public function __construct($db){
			$this->conn = $db;
		}
        
        // Fuctions ----------------------------------------------------------	
        
        
        function selectCateg($table, $filter_data) {
			$this->sql = "SELECT * FROM $table";	
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Inventory bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}




		function select($table, $filter_data){
			$this->sql = "SELECT * FROM $table";

			if($filter_data!=null){
				$this->sql = "SELECT * tbl_ingredients WHERE prod_id ='$filter_data'";
			}

			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}
        function generalQuery($query){
            $this->result = $this->conn->query($query);
            $rowCount = $this->result->num_rows;
            if ($this->result->num_rows>0) {
                while($res = $this->result->fetch_assoc()){
                    array_push($this->data,$res);
                }
                return $this->info = array(
                        'status'=>array(
                        'remarks'=>true,
                        'message'=>'success!'
                    ),
                    'data' =>$this->data,
                    'payload'=>$this->data,
                    'dataCount'=>$rowCount,
                    'timestamp'=>date('D M j, Y h:i:s e')
                );
            } 
			else {
                return $this->info = array('status'=>array(
                'remarks'=>false,
                'payload'=>$this->data,
                'dataCount'=>$rowCount,
                'message'=>'failed!'),
                'timestamp'=>date('D M j, Y h:i:s e')
			 	);
            }
        }
		function addProduct($data){
            $this->sql = "INSERT INTO `menu_tb`(`product_id`, `product_name`, `product_price`, `product_type`) 
            VALUES ('$data->id', '$data->product_name', '$data->product_price', '$data->product_type')"; 
            $this->conn->query($this->sql);
            $this->status = $this->success_stat;
			http_response_code(200);
            return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
        }
		function delProduct($data){
            $this->sql = "DELETE FROM `menu_tb` WHERE product_id = '$data->product_id'"; 
            $this->conn->query($this->sql);
			$this->sql = "UPDATE `inventory_tb` SET `prod_id`='0' WHERE `prod_id` = '$data->product_id'"; 
            $this->conn->query($this->sql);
            $this->status = $this->success_stat;
			http_response_code(200);
            return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
        }
		function editProduct($data){
            $this->sql = "UPDATE `menu_tb` SET `product_name`='$data->product_name',
            `product_price`='$data->product_price',`product_type`='$data->product_type' WHERE `product_id`='$data->product_id' ";
            $this->conn->query($this->sql);
            $this->status = $this->success_stat;
			http_response_code(200);
            return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
        }
		function addIngredients($data){
            foreach($data->ingredients as $index => $value){
                if($data->qty[$index] == ""){
                    $data->qty[$index] = 1;
                }
                $this->sql = "UPDATE `inventory_tb` SET `prod_id`='$data->id', `ing_use`='{$data->qty[$index]}' WHERE `item_name`='$value' ";
                $this->conn->query($this->sql);
            }
            $this->status = $this->success_stat;
			http_response_code(200);
            return array(
                'data'=>$data->ingredients,
                'status'=>$this->status,
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
        function addIngredientProducts($data){
            $this->sql = "UPDATE `inventory_tb` SET `prod_id`='$data->id' WHERE `item_name`='$data->name' ";
            $this->conn->query($this->sql);
            $this->status = $this->success_stat;
			http_response_code(200);
            return array(
                'status'=>$this->status,
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
        function editIngredients($data){
            $this->sql = "UPDATE `inventory_tb` SET `ing_use`='$data->use' WHERE `item_id`= $data->id";
            $this->conn->query($this->sql);
            $this->status = $this->success_stat;
			http_response_code(200);
            return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
        }     
        function deleteIngredients($data){
            $this->sql="UPDATE `inventory_tb` SET `prod_id`='0' WHERE `item_id` = $data->item_id";
            $this->conn->query($this->sql);
            $this->status = $this->success_stat;
			http_response_code(200);
            return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
        }
        function checkAvaialble(){
            $empty = array();
            $something = array();
			$this->sql = "SELECT * FROM inventory_tb";
            if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
                        array_push($this->data, $res);
					} 
				}
			}
            foreach ($this->data as $index => $value){
                if($value['item_quant'] == 0){
                    array_push($empty, $value['prod_id']);
                }
                if($value['item_quant'] != 0){
                    array_push($something, $value['prod_id']);
                }
            }
            $allsomething = array_unique($something);
            $allremaining = array_diff($allsomething, $empty);
            if(!empty($allremaining)){
                foreach($allremaining as $value){
                    $this->sql = "UPDATE `menu_tb` SET `available` = 1  WHERE product_id = $value";
                    $this->conn->query($this->sql);
                }
            }
            if(!empty($empty)){
                foreach($empty as $value){
                    $this->sql = "UPDATE `menu_tb` SET `available` = 0  WHERE product_id = $value";
                    $this->conn->query($this->sql);
                }
            }
            $this->status = $this->success_stat;
			http_response_code(200);
			return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}
        function addCategory($data){
            $this->sql = "INSERT INTO `category_tb`(`name`) 
            VALUES ('$data->name')"; 
            $this->conn->query($this->sql);
            $this->status = $this->success_stat;
			http_response_code(200);
            return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
        }
        function deleteCategory($data){
            $this->sql="DELETE FROM `category_tb` WHERE `id` = $data->id";
            $this->conn->query($this->sql);
        }
        function editCategory($data){
            $this->sql = "UPDATE `category_tb` SET `name`='$data->name' WHERE `id` = $data->id";
            $this->conn->query($this->sql);
            $this->status = $this->success_stat;
			http_response_code(200);
            return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
        }   
        // ------------ POINT OF SALES -----------------
        function proccessSales($data){
            foreach($data as $index => $value){
                $this->sql = "UPDATE `tbl_ingredients` SET `item_quantity`= item_quantity - 1 WHERE `prod_id` = {$value['product_id']} ";
                $this->conn->query($this->sql);
            }
            return array(
				'status'=>$this->status,
				'timestamp'=>date('D M j, Y G:i:s T')
			);
        }
        // ---------- INVENTORY -------------------------
        function addIngredientsQty($data){
            foreach ($data->ingredients as $index => $value) {
                $this->sql = "UPDATE `inventory_tb` SET `item_quant`= `$data->quantity` WHERE `prod_id` = `$data->id` ";
                $this->conn->query($this->sql);
            }
            return array(
                'status'=>$this->status,
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
        function addProductInv($data) {
            $payload = $data;
            $this->sql = "INSERT INTO inventory_tb (item_name, item_desc, item_quant, date_expiry, item_price, item_minimum, remarks, modifiedBy, dateModified, date_acquired, measurementType) VALUES 
            ('$data->item_name', '$data->item_desc', '$data->item_quant', '$data->date_expiry', '$data->item_price', '$data->item_minimum', '$data->remarks', '$data->modifiedBy', CURRENT_DATE(), CURRENT_DATE(), '$data->measurementType')"; 
            $this->conn->query($this->sql);
            $this->data = $payload;
            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Staff',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
		function delProductInv($data) {
            $payload = $data;
            $this->sql = "DELETE FROM inventory_tb WHERE item_id = '$data->item_id'"; 
            $this->conn->query($this->sql);
            $this->data = $payload;
            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
		function arcProduct($data) {
            $payload = $data;
            $this->sql = "UPDATE inventory_tb SET is_Archive = 1 WHERE item_id =$data->item_id";
            $this->conn->query($this->sql);
            $this->data = $payload;
            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
		function recProduct($data) {
            $payload = $data;
            $this->sql = "UPDATE inventory_tb SET is_Archive = 0 WHERE item_id =$data->item_id";
            $this->conn->query($this->sql);
            $this->data = $payload;
            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
		function editProductInv($data){
            $payload = $data;
            $this->sql = " UPDATE inventory_tb SET item_name='$data->item_name', item_desc='$data->item_desc', item_quant='$data->item_quant', date_expiry='$data->date_expiry', item_price='$data->item_price', item_minimum='$data->item_minimum', remarks='$data->remarks', modifiedBy='$data->modifiedBy', dateModified = CURRENT_DATE(), measurementType='$data->measurementType' WHERE item_id='$data->item_id'";
            $this->conn->query($this->sql);
            return $this->select('inventory_tb', null);
        }
		function selectInv($table, $filter_data) {
			$this->sql = "SELECT * FROM $table WHERE is_Archive = 0";

			
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Inventory bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}
        function selectArchive($table, $filter_data) {
			$this->sql = "SELECT * FROM $table WHERE is_Archive = 1";	
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Inventory bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}
		function add_record($data) {
			$sql = "INSERT INTO inventory_tb(item_name, item_desc, item_price, date_expiry, item_minimum, remarks, item_quant, modifiedBy) VALUES ('$data->item_name', '$data->item_desc', '$data->item_price', '$data->date_expiry', '$data->item_minimum', '$data->remarks', '$data->item_quant', '$data->modifiedBy')";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null);
		}
		function edit_record($data) {
			$sql = "UPDATE inventory_tb SET item_name='$data->item_name', item_desc='$data->item_desc', item_price='$data->item_price', date_expiry='$data->date_expiry', item_minimum='$data->item_minimum', remarks='$data->remarks', item_quant='$data->item_quant', modifiedBy='$data->modifiedBy' WHERE item_id=$data->item_id";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null);
		}
		function delete_record($data) {
			$sql = "DELETE FROM inventory_tb WHERE item_id=$data->item_id";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null);
		}
		function archive_record($data){
			$sql = "UPDATE inventory_tb SET is_Archive = 1 WHERE item_id =$data->item_id";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null);
		}
		function recover_record($data){
			$sql = "UPDATE inventory_tb SET is_Archive = 0 WHERE item_id =$data->item_id";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null); 
		}
		function selectMY($data){
			$this->sql = "SELECT * FROM inventory_tb WHERE MONTH(date_acquired) = '$data->selectedMonth' AND YEAR(date_acquired) = '$data->selectedYear'";
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Inventory bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}
		function selectM($data){
			$this->sql = "SELECT * FROM inventory_tb WHERE DATE_FORMAT(date_acquired, '%M') = '$data->selectedMonth'";
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Inventory bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}



                // ----------------------------------------- CRM -------------------------------------------

            //ADD TABLE FUNCTION
		function addTable($dt) {
            $payload = $dt;

            $this->sql = "INSERT INTO crm_tables_tb (table_name, table_capacity, status_id) VALUES 
            ('$dt->table_name', '$dt->table_capacity', '$dt->status_id')"; 
            
            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'CRM Staff',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
        //DELETE A TABLE FUNCTION

		function delTable($dt) {
            $payload = $dt;

            $this->sql = "DELETE FROM crm_tables_tb WHERE table_id = '$dt->table_id'"; 
            
            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'CRM Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }

		//UPDATE A TABLE

		function editTable($dt){

            $payload = $dt;
            $this->sql = " UPDATE crm_tables_tb SET table_name='$dt->table_name1', table_capacity='$dt->table_capacity1', status_id='$dt->status_id1' WHERE table_id='$dt->table_id1'";
            $this->conn->query($this->sql);
            return $this->select('tables', null);
        }

                    //ADD RESERVATION FUNCTION
		function addReservation($dt) {
            $payload = $dt;

            $this->sql = "INSERT INTO crm_reservations_tb (reservation_no, table_id,first_name,last_name,reservation_date,reservation_time, status_id,phone_no) VALUES 
            ('$dt->reservation_no', '$dt->table_id','$dt->first_name','$dt->last_name','$dt->reservation_date','$dt->reservation_time', '$dt->status_id','$dt->phone_no')"; 
            
            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'CRM Staff',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }

        function actionReservation($d){
            $sql = "UPDATE crm_reservations_tb SET status_id='$d->status_id' WHERE id = '$d->id'";
            $this->conn->query($sql);
            return $this->select('reservations', null);
        }


        //------------------------------------------END OF CRM-------------------------------------------------



// POS NEW PULL FUNCTION
        function selectMYpos($data){
        
			$this->sql = "SELECT * FROM pos_preorder_tb WHERE MONTH(list_order_date) = '$data->selectedMonth' AND YEAR(list_order_date) = '$data->selectedYear'";
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Inventory bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}


	}
?>

