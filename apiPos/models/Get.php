<?php


class Get{
    protected $gm, $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }




	

	public function availableTables($d)
	{

		$sql = "SELECT * FROM `crm_tables_tb` WHERE `status_id` = '1' OR `status_id` = '4'";

		
		$res = $this->gm->generalQuery($sql, "No records found");
		if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
		return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);

	}



	public function pullPreOrderReceipt($d)
	{

		$order_code = $d->order_code;
		
		$sql = "SELECT * FROM `pos_order_tb` WHERE `order_code` = '$order_code'";

		
		$res = $this->gm->generalQuery($sql, "No records found");
		if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
		return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);

	}



	public function pullDetails($d)
	{

		$order_code = $d->order_code;

		$sql = "SELECT * FROM `pos_order_tb` WHERE `order_code` = '$order_code'";

		
		$res = $this->gm->generalQuery($sql, "No records found");
		if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
		return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);

	}


	public function pullPreOrders($d)
	{
		$sql = "SELECT * FROM `pos_order_tb` WHERE `isSubmitted` = '0' AND `isDeleted` = '0'";

		
		$res = $this->gm->generalQuery($sql, "No records found");
		if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
		return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
	}





	


	public function pullOrder ($d) {     
	   $sql = "SELECT * FROM pos_preorder_tb ORDER BY list_order_date DESC";            
	       
	   $res = $this->gm->generalQuery($sql, "No records found");        
	   if ($res['code'] == 200) {            
		   $payload = $res['data'];            
		   $remarks = "success";            
		   $message = "Successfully retrieved requested data";        
		} 
		else {            
			$payload = null;            
			$remarks = "failed";            
			$message = $res['errmsg'];       
		 }        
			return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);  
	  }



	  public function pullDateAndCode ($d) {     
		$sql = "SELECT * FROM pos_preorder_tb WHERE list_order_code = '$d->list_order_code'";            
			
		$res = $this->gm->generalQuery($sql, "No records found");        
		if ($res['code'] == 200) {            
			$payload = $res['data'];            
			$remarks = "success";            
			$message = "Successfully retrieved requested data";        
		 } 
		 else {            
			 $payload = null;            
			 $remarks = "failed";            
			 $message = $res['errmsg'];       
		  }        
			 return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);  
	   }


	  public function pullPre ($d) {     
		$sql = "SELECT * FROM pos_order_tb";            
			
		$res = $this->gm->generalQuery($sql, "No records found");        
		if ($res['code'] == 200) {            
			$payload = $res['data'];            
			$remarks = "success";            
			$message = "Successfully retrieved requested data";        
		 } 
		 else {            
			 $payload = null;            
			 $remarks = "failed";            
			 $message = $res['errmsg'];       
		  }        
			 return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);  
	   }
	   public function pullProduct ($d) {     
		$sql = "SELECT * FROM menu_tb";            
			
		$res = $this->gm->generalQuery($sql, "No records found");        
		if ($res['code'] == 200) {            
			$payload = $res['data'];            
			$remarks = "success";            
			$message = "Successfully retrieved requested data";        
		 } 
		 else {            
			 $payload = null;            
			 $remarks = "failed";            
			 $message = $res['errmsg'];       
		  }        
			 return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);  
	   }
	 


	   public function pullByCateg ($d) {  
		$category = $d->product_type;   
		$sql = "SELECT * FROM menu_tb WHERE product_type = '$category'";            
			
		$res = $this->gm->generalQuery($sql, "No records found");        
		if ($res['code'] == 200) {            
			$payload = $res['data'];            
			$remarks = "success";            
			$message = "Successfully retrieved requested data";        
		 } 
		 else {            
			 $payload = null;            
			 $remarks = "failed";            
			 $message = $res['errmsg'];       
		  }        
			 return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);  
	   }



	   public function bestSeller($d) {     
		$sql = "SELECT product_name, COUNT(product_name) AS best_seller FROM pos_order_tb GROUP BY product_name ORDER BY best_seller DESC LIMIT 3";            
			
		$res = $this->gm->generalQuery($sql, "No records found");        
		if ($res['code'] == 200) {            
			$payload = $res['data'];            
			$remarks = "success";            
			$message = "Successfully retrieved requested data";        
		 } 
		 else {            
			 $payload = null;            
			 $remarks = "failed";            
			 $message = $res['errmsg'];       
		  }        
			 return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);  
	   }


	//  MENU SUBSYSTEM REQUESTS

	
	public function categories($d)
	{

		$sql = "SELECT * FROM `menu_category_tb`";

		
		$res = $this->gm->generalQuery($sql, "No records found");
		if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
		return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);

	}

}
	
	
?>