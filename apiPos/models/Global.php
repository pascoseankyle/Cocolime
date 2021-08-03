<?php  
	class GlobalMethods {
		protected $pdo;

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}


		public function generalQuery1($sql, $err) {
			$data = array();
			$errmsg = "";
			$code = 0;
			try {
				if($result = $this->pdo->query($sql)->fetchAll()){
					foreach ($result as $record)
						array_push($data, $record);
					$result = null;
					$code = 200;
					return array("code"=>$code, "data"=>$data);
				} else {
					$errmsg = $err;
			
				}
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}



		public function update($table, $data, $conditionStringPassed){
			$fields=[]; $values=[];
			$setStr = "";
			foreach ($data as $key => $value) {
				# code...
				array_push($fields, $key);
				array_push($values, $value);
				
			}
			try{
				$ctr = 0;
				$sqlstr = "UPDATE $table SET ";

					foreach ($data as $key => $value) {
						$sqlstr .="$key=?"; $ctr++;
						if($ctr<count($fields)){
							$sqlstr.=", ";
						}
					}

					$sqlstr .= " WHERE ".$conditionStringPassed;
					$sql = $this->pdo->prepare($sqlstr);
					$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");	
			}
			catch(\PDOException $e){
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);

		}



		public function pushOrderCode($table, $data){
			$fields=[]; $values=[];
			$setStr = "";
			foreach ($data as $key => $value) {
				# code...
				array_push($fields, $key);
				array_push($values, $value);
				
			}
			try{
				$ctr = 0;
				$sqlstr = "UPDATE $table SET ";

					foreach ($data as $key => $value) {
						$sqlstr .="$key=?"; $ctr++;
						if($ctr<count($fields)){
							$sqlstr.=", ";
						}
					}

				
					$sql = $this->pdo->prepare($sqlstr);
					$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");	
			}
			catch(\PDOException $e){
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);

		}



		

		

		public function select_pre($table, $filter_data) {
			$isSubmitted = 0;
			$sql = "SELECT * FROM pos_order_tb";
		
			if($filter_data != null){
				$sql .=" WHERE isSubmitted = '$isSubmitted'";
			}
		
			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}


		// READ
		public function generalQuery($sql, $err) {
			$data = array();
			$errmsg = "";
			$code = 0;
			try {
				if($result = $this->pdo->query($sql)->fetchAll()){
					foreach ($result as $record)
						array_push($data, $record);
					$result = null;
					$code = 200;
					return array("code"=>$code, "data"=>$data);
				} else {
					$errmsg = $err;
			
				}
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}


		// INSERT 

		public function insert($table, $data){
			$i = 0; $fields=[]; $values=[];
			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			try {
				$ctr = 0;
				$sqlstr="INSERT INTO $table (";
				foreach ($fields as $value) {
					$sqlstr.=$value; $ctr++;
					if($ctr<count($fields)) {
						$sqlstr.=", ";
					} 	
				} 

				$sqlstr.=") VALUES (".str_repeat("?, ", count($values)-1)."?)";

				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);
				return array("code"=>200, "remarks"=>"success");
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "errmsg"=>$errmsg);
		}

		// UPDATE 

		public function edit($table, $data){
			$fields=[]; $values=[];
			$setStr = "";

			foreach ($data as $key => $value) {
				array_push($fields, $key);
				array_push($values, $value);
			}
			
			try{
				$ctr = 0;
				$sqlstr = "UPDATE $table SET ";
				foreach ($data as $key => $value){
					$sqlstr.="$key=?"; $ctr++;
					if($ctr<count($fields)){
						$sqlstr.=", ";
					}
				}

				$sqlstr .= " WHERE product_name = '$data->product_name'";
				$sql = $this->pdo->prepare($sqlstr);
				$sql->execute($values);

				return array("code"=>200, "remarks"=>"success");
				
			}
			
			catch(\PDOException $e){
				$errmsg = $e->getMessage();
				$code = 403;
			}
			
			return array("code"=>$code, "errmsg"=>$errmsg);
		}


		//DELETE
		public function delete($table, $data, $condition){

			$sql = "DELETE FROM $table WHERE $condition";

		
			$data = array(); $code = 0; $errmsg= ""; $remarks = "";
			try {
		
				if ($res = $this->pdo->query($sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully deleted feedback"; $remarks = "success";
					return array("code"=>200, "remarks"=>"success");
				}
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			
			return array("code"=>$code, "errmsg"=>$errmsg);
		}


				//DELETE
				public function clearOrder($dt){
		
					$sql = "DELETE FROM pos_order_tb";
		
				
					$data = array(); $code = 0; $errmsg= ""; $remarks = "";
					try {
				
						if ($res = $this->pdo->query($sql)->fetchAll()) {
							foreach ($res as $rec) { array_push($dt, $rec);}
							$res = null; $code = 200; $msg = "Successfully deleted feedback"; $remarks = "success";
							return array("code"=>200, "remarks"=>"success");
						}
					} catch (\PDOException $e) {
						$errmsg = $e->getMessage();
						$code = 403;
					}
					
					return array("code"=>$code, "errmsg"=>$errmsg);
				}
				




		//PAYLOAD

		public function sendPayload($payload, $remarks, $message, $code) {
			$status = array("remarks"=>$remarks, "message"=>$message);
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				'prepared_by'=>'Unknown Developer',
				"timestamp"=>date_create());
		} 

		
	

		
	}
	

?>