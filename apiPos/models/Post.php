<?php


class Post{
    protected $gm, $pdo, $get;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
        $this->get = new Get($pdo);
    }

// ADD PRODUCT



// CRM NEW FUNCTIONS


public function notConfirmed($dt)
{

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";



    $sql = "UPDATE `crm_reservations_tb` SET `status_id` = '5' WHERE phone_no = '$dt->phone_no'  AND status_id = '3'";
    $res = $this->gm->generalQuery1($sql, "");

    if($res['code']!=200) {
  
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully retrieved data";
    }
        
    
    return $this->gm->sendPayload($payload, $remarks, $message, $code);

}




public function voidRes($d) { 
    $res_id = $d->res_id;
     $res = $this->gm->delete('crm_reservations_tb', $d, "res_id = '$res_id'"); 
     
     
     if ($res['code'] == 200) 
     {  
        $payload = $res['data'];            
        $remarks = "success";            
        $message = "Successfully retrieved requested data";        
    } 
    else
     {            
         $payload = null;            
         $remarks = "failed";            
         $message = $res['errmsg'];        
        } 
    }



public function checkNumber($newNum, $existingNum)
{

			if($newNum===$existingNum){
				return true;
			}
			return false;
}




public function sendOTP($number, $message, $apiCode, $apiPass)
{
        
            $url = 'https://www.itexmo.com/php_api/api.php';
            $itexmo = array('1' => $number, '2' => $message, '3' => $apiCode, 'passwd' => $apiPass);
            $param = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($itexmo),
            ),
        );
        $context  = stream_context_create($param);
        return file_get_contents($url, false, $context);
    
}


public function resNew($dt)
{
    $phone_no = $dt->phone_no;
    $payload = "";
    $message = "";
   
 
    $sql = "SELECT * FROM crm_reservations_tb WHERE phone_no='$phone_no'";
    $res = $this->gm->generalQuery($sql, "Failed");

   
    if($res['code'] != 200) {
        $otp = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 4);
        $apiCode = "TR-CJRAM929662_PHH7Q";
		$apiPass = "{2h@#q]!w%";
        $contact = $dt->phone_no;
        $msg = "You Reservation Confirmation Code is ".$otp."\n\nCocolime Management\n\n\n";
       
        $sql = "INSERT INTO crm_reservations_tb(first_name,last_name,reservation_date,reservation_time,phone_no,otp, status_id, table_id) 
        VALUES ('$dt->first_name','$dt->last_name','$dt->reservation_date','$dt->reservation_time','$dt->phone_no','$otp', '2', '$dt->table_id')";

                $data = array(); $code = 0; $errmsg= ""; $remarks = "";
                try {

                        // $result = $this->sendOTP($contact,$msg ,$apiCode, $apiPass);
                        // if ($result == "")
                        // {
                        //     // echo "iTexMo: No response from server!!!
                        //     // Please check the METHOD used (CURL or CURL-LESS). If you are using CURL then try CURL-LESS and vice versa.	
                        //     // Please CONTACT US for help. ";	
                        // }
                        // else if ($result == 0)
                        // {
                        //     // echo $contact;
                        //     // echo $msg;
                        //     // echo "Message Sent!";
                        // }
                        // else
                        // {	
                        //     // echo "Error Num ". $result . " was encountered!";
                        // }
                    
                    $res = $this->pdo->query($sql)->fetchAll();
                        foreach ($res as $rec) { array_push($data, $rec); }
                        $res = null; 
                        $code = 200; 
                        $message = "Successfully Registered"; 
                        $remarks = "success";
                        $payload = array("code"=>200, "remarks"=>"success");

                        return array("code"=>200, "remarks"=>"success");



                    
                } catch (\PDOException $e) {
                    $errmsg = $e->getMessage();
                    $code = 403;
                }

        }

        if($res['code'] == 200) {
            $sql = "SELECT * FROM crm_reservations_tb WHERE phone_no='$phone_no' AND status_id = '3' or status_id = '5' ORDER BY res_id DESC LIMIT 1";
            $res = $this->gm->generalQuery($sql, "Failed");

            if($res['code'] != 200){
                $otp = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 4);
                $apiCode = "TR-CJRAM929662_PHH7Q";
                $apiPass = "{2h@#q]!w%";
                $contact = $dt->phone_no;
                $msg = "You Reservation Confirmation Code is ".$otp."\n\nCocolime Management\n\n\n";
               
                $sql = "INSERT INTO crm_reservations_tb(first_name,last_name,reservation_date,reservation_time,phone_no,otp, status_id, table_id) 
                VALUES ('$dt->first_name','$dt->last_name','$dt->reservation_date','$dt->reservation_time','$dt->phone_no','$otp', '2', '$dt->table_id')";
        
                        $data = array(); $code = 0; $errmsg= ""; $remarks = "";
                        try {
        
                                // $result = $this->sendOTP($contact,$msg ,$apiCode, $apiPass);
                                // if ($result == "")
                                // {
                                //     // echo "iTexMo: No response from server!!!
                                //     // Please check the METHOD used (CURL or CURL-LESS). If you are using CURL then try CURL-LESS and vice versa.	
                                //     // Please CONTACT US for help. ";	
                                // }
                                // else if ($result == 0)
                                // {
                                //     // echo $contact;
                                //     // echo $msg;
                                //     // echo "Message Sent!";
                                // }
                                // else
                                // {	
                                //     // echo "Error Num ". $result . " was encountered!";
                                // }
                            
                            $res = $this->pdo->query($sql)->fetchAll();
                                foreach ($res as $rec) { array_push($data, $rec); }
                                $res = null; 
                                $code = 200; 
                                $message = "Successfully Registered"; 
                                $remarks = "success";
                                $payload = array("code"=>200, "remarks"=>"success");
        
                                return array("code"=>200, "remarks"=>"success");
        
        
        
                            
                        } catch (\PDOException $e) {
                            $errmsg = $e->getMessage();
                            $code = 403;
                        }
            }
            else if($res['code'] == 200){
                $sql = "SELECT * FROM crm_reservations_tb WHERE phone_no='$phone_no' AND status_id = '1' or status_id = '2' ORDER BY res_id DESC LIMIT 1";
                $res = $this->gm->generalQuery($sql, "Failed");
    
                if($res['code'] != 200){
                    $otp = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 4);
                    $apiCode = "TR-CJRAM929662_PHH7Q";
                    $apiPass = "{2h@#q]!w%";
                    $contact = $dt->phone_no;
                    $msg = "You Reservation Confirmation Code is ".$otp."\n\nCocolime Management\n\n\n";
                   
                    $sql = "INSERT INTO crm_reservations_tb(first_name,last_name,reservation_date,reservation_time,phone_no,otp, status_id, table_id) 
                    VALUES ('$dt->first_name','$dt->last_name','$dt->reservation_date','$dt->reservation_time','$dt->phone_no','$otp', '2', '$dt->table_id')";
            
                            $data = array(); $code = 0; $errmsg= ""; $remarks = "";
                            try {
            
                                    // $result = $this->sendOTP($contact,$msg ,$apiCode, $apiPass);
                                    // if ($result == "")
                                    // {
                                    //     // echo "iTexMo: No response from server!!!
                                    //     // Please check the METHOD used (CURL or CURL-LESS). If you are using CURL then try CURL-LESS and vice versa.	
                                    //     // Please CONTACT US for help. ";	
                                    // }
                                    // else if ($result == 0)
                                    // {
                                    //     // echo $contact;
                                    //     // echo $msg;
                                    //     // echo "Message Sent!";
                                    // }
                                    // else
                                    // {	
                                    //     // echo "Error Num ". $result . " was encountered!";
                                    // }
                                
                                $res = $this->pdo->query($sql)->fetchAll();
                                    foreach ($res as $rec) { array_push($data, $rec); }
                                    $res = null; 
                                    $code = 200; 
                                    $message = "Successfully Registered"; 
                                    $remarks = "success";
                                    $payload = array("code"=>200, "remarks"=>"success");
            
                                    return array("code"=>200, "remarks"=>"success");
            
            
            
                                
                            } catch (\PDOException $e) {
                                $errmsg = $e->getMessage();
                                $code = 403;
                            }

            }
            
            else if($res['code'] == 200){
                $code = 200;
                $payload = null;
                $remarks = "Failed";
                $message = "Failed";
                return $this->gm->sendPayload($payload, $remarks, $message, $code);
            }


        }


        else{
            $code = 200;
            $payload = null;
            $remarks = "Failed";
            $message = "Failed";
            return $this->gm->sendPayload($payload, $remarks, $message, $code);
        }

    


    }
}



public function addreservation($dt)
{
    $phone_no = $dt->phone_no;
    $payload = "";
    $message = "";
   
 
    $sql = "SELECT * FROM crm_reservations_tb WHERE phone_no='$phone_no'";
    $res = $this->gm->generalQuery($sql, "Failed");

   
    if($res['code'] != 200) {
        $otp = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 4);
        $apiCode = "TR-CJRAM929662_PHH7Q";
		$apiPass = "{2h@#q]!w%";
        $contact = $dt->phone_no;
        $msg = "You Reservation Confirmation Code is ".$otp."\n\nCocolime Management\n\n\n";
       
        $sql = "INSERT INTO crm_reservations_tb(first_name,last_name,reservation_date,reservation_time,phone_no,otp, status_id, table_id) 
        VALUES ('$dt->first_name','$dt->last_name','$dt->reservation_date','$dt->reservation_time','$dt->phone_no','$otp', '$dt->status_id', '$dt->table_id')";

                $data = array(); $code = 0; $errmsg= ""; $remarks = "";
                try {

                        $result = $this->sendOTP($contact,$msg ,$apiCode, $apiPass);
                        if ($result == "")
                        {
                            // echo "iTexMo: No response from server!!!
                            // Please check the METHOD used (CURL or CURL-LESS). If you are using CURL then try CURL-LESS and vice versa.	
                            // Please CONTACT US for help. ";	
                        }
                        else if ($result == 0)
                        {
                            // echo $contact;
                            // echo $msg;
                            // echo "Message Sent!";
                        }
                        else
                        {	
                            // echo "Error Num ". $result . " was encountered!";
                        }
                    
                    $res = $this->pdo->query($sql)->fetchAll();
                        foreach ($res as $rec) { array_push($data, $rec); }
                        $res = null; 
                        $code = 200; 
                        $message = "Successfully Registered"; 
                        $remarks = "success";
                        $payload = array("code"=>200, "remarks"=>"success");

                        return array("code"=>200, "remarks"=>"success");



                    
                } catch (\PDOException $e) {
                    $errmsg = $e->getMessage();
                    $code = 403;
                }

        }

        if($res['code'] == 200) {
            $sql = "SELECT * FROM crm_reservations_tb WHERE phone_no='$phone_no' AND status_id = '3' or status_id = '5' ORDER BY res_id DESC LIMIT 1";
            $res = $this->gm->generalQuery($sql, "Failed");

            if($res['code'] != 200){
                $otp = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 4);
                $apiCode = "TR-CJRAM929662_PHH7Q";
                $apiPass = "{2h@#q]!w%";
                $contact = $dt->phone_no;
                $msg = "You Reservation Confirmation Code is ".$otp."\n\nCocolime Management\n\n\n";
               
                $sql = "INSERT INTO crm_reservations_tb(first_name,last_name,reservation_date,reservation_time,phone_no,otp, status_id, table_id) 
                VALUES ('$dt->first_name','$dt->last_name','$dt->reservation_date','$dt->reservation_time','$dt->phone_no','$otp', '$dt->status_id', '$dt->table_id')";
        
                        $data = array(); $code = 0; $errmsg= ""; $remarks = "";
                        try {
        
                                $result = $this->sendOTP($contact,$msg ,$apiCode, $apiPass);
                                if ($result == "")
                                {
                                    // echo "iTexMo: No response from server!!!
                                    // Please check the METHOD used (CURL or CURL-LESS). If you are using CURL then try CURL-LESS and vice versa.	
                                    // Please CONTACT US for help. ";	
                                }
                                else if ($result == 0)
                                {
                                    // echo $contact;
                                    // echo $msg;
                                    // echo "Message Sent!";
                                }
                                else
                                {	
                                    // echo "Error Num ". $result . " was encountered!";
                                }
                            
                            $res = $this->pdo->query($sql)->fetchAll();
                                foreach ($res as $rec) { array_push($data, $rec); }
                                $res = null; 
                                $code = 200; 
                                $message = "Successfully Registered"; 
                                $remarks = "success";
                                $payload = array("code"=>200, "remarks"=>"success");
        
                                return array("code"=>200, "remarks"=>"success");
        
        
        
                            
                        } catch (\PDOException $e) {
                            $errmsg = $e->getMessage();
                            $code = 403;
                        }
            }
            else if($res['code'] == 200){
                $sql = "SELECT * FROM crm_reservations_tb WHERE phone_no='$phone_no' AND status_id = '1' or status_id = '2' ORDER BY res_id DESC LIMIT 1";
                $res = $this->gm->generalQuery($sql, "Failed");
    
                if($res['code'] != 200){
                    $otp = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 4);
                    $apiCode = "TR-CJRAM929662_PHH7Q";
                    $apiPass = "{2h@#q]!w%";
                    $contact = $dt->phone_no;
                    $msg = "You Reservation Confirmation Code is ".$otp."\n\nCocolime Management\n\n\n";
                   
                    $sql = "INSERT INTO crm_reservations_tb(first_name,last_name,reservation_date,reservation_time,phone_no,otp, status_id, table_id) 
                    VALUES ('$dt->first_name','$dt->last_name','$dt->reservation_date','$dt->reservation_time','$dt->phone_no','$otp', '$dt->status_id', '$dt->table_id')";
            
                            $data = array(); $code = 0; $errmsg= ""; $remarks = "";
                            try {
            
                                    $result = $this->sendOTP($contact,$msg ,$apiCode, $apiPass);
                                    if ($result == "")
                                    {
                                        // echo "iTexMo: No response from server!!!
                                        // Please check the METHOD used (CURL or CURL-LESS). If you are using CURL then try CURL-LESS and vice versa.	
                                        // Please CONTACT US for help. ";	
                                    }
                                    else if ($result == 0)
                                    {
                                        // echo $contact;
                                        // echo $msg;
                                        // echo "Message Sent!";
                                    }
                                    else
                                    {	
                                        // echo "Error Num ". $result . " was encountered!";
                                    }
                                
                                $res = $this->pdo->query($sql)->fetchAll();
                                    foreach ($res as $rec) { array_push($data, $rec); }
                                    $res = null; 
                                    $code = 200; 
                                    $message = "Successfully Registered"; 
                                    $remarks = "success";
                                    $payload = array("code"=>200, "remarks"=>"success");
            
                                    return array("code"=>200, "remarks"=>"success");
            
            
            
                                
                            } catch (\PDOException $e) {
                                $errmsg = $e->getMessage();
                                $code = 403;
                            }

            }
            
            else if($res['code'] == 200){
                $code = 200;
                $payload = null;
                $remarks = "Failed";
                $message = "Failed";
                return $this->gm->sendPayload($payload, $remarks, $message, $code);
            }


        }


        else{
            $code = 200;
            $payload = null;
            $remarks = "Failed";
            $message = "Failed";
            return $this->gm->sendPayload($payload, $remarks, $message, $code);
        }

    


    }
}

    public function otp_check($otpSent, $otpOnDb)
    {
        if($otpSent === $otpOnDb)
        {
            return true;
        }

        return false;

    }





    public function confirmReservation($d)
    {
        
    $payload = "";
    $message = "";


    
    $sql = "SELECT * FROM crm_reservations_tb WHERE otp='$d->otp'";
    $res = $this->gm->generalQuery($sql, "Failed");


    if($res['code']==200) {
  
        $sql = "UPDATE `crm_tables_tb` SET `status_id` = '$d->status_id' WHERE `table_id` = '$d->table_id'";
        $res = $this->gm->generalQuery($sql, "Failed");
               
                    if($res['code']!=200) {
                        // $res = $this->gm->update('pos_order_tb', $isSubmitted, "order_code = '$order_code'");
                        // if ($res['code'] == 200) {
                        $code = 200;
                        $payload = $res;
                        $remarks = "success";
                        $message = "Successfully retrieved data";
                        // }
                        
                        return $this->gm->sendPayload($payload, $remarks, $message, $code);

                }
    }

    else{
                    $payload = null; 
					$remarks = "failed"; 
					$message = "Incorrect username or password";
                    $code = 200;
                    return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }
        
    
                    
    

    }


    public function newRes($d)
    {
        
 



        $sql = "UPDATE `crm_tables_tb` SET `status_id` = '3' WHERE `table_id` = '$d->table_id'";
        $res = $this->gm->generalQuery($sql, "Failed");
               
                    if($res['code']!=200) {
                        // $res = $this->gm->update('pos_order_tb', $isSubmitted, "order_code = '$order_code'");
                        // if ($res['code'] == 200) {
                        $code = 200;
                        $payload = $res;
                        $remarks = "success";
                        $message = "Successfully retrieved data";
                        // }
                        
                        return $this->gm->sendPayload($payload, $remarks, $message, $code);

                }
          
    

    }


// END OF CRM




public function checkPreOrderItem($product_name, $existingItem)
{

			if($product_name===$existingItem){
				return true;
			}
			return false;
}


public function add_categories($dt)
{

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    // $isSubmitted = $dt->isSubmitted;
    // $order_code = $dt->order_code;

    $res = $this->gm->insert('menu_category_tb', $dt);

    if($res['code']==200) {
        // $res = $this->gm->update('pos_order_tb', $isSubmitted, "order_code = '$order_code'");
        // if ($res['code'] == 200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully retrieved data";
        // }
        
    
    return $this->gm->sendPayload($payload, $remarks, $message, $code);

}
}


public function edit_categories($dt)
{

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    $catId = $dt->id;
    $catName = $dt->name;


    $sql = "UPDATE `menu_category_tb` SET `name` = '$catName' WHERE id = '$catId'";
    $res = $this->gm->generalQuery1($sql, "");

    if($res['code']!=200) {
  
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully retrieved data";
    }
        
    
    return $this->gm->sendPayload($payload, $remarks, $message, $code);

}


public function del_categories($d) { 
    $catId = $d->id;
     $res = $this->gm->delete('menu_category_tb', $d, "id = '$catId'"); 
     
     
     if ($res['code'] == 200) 
     {  
        $payload = $res['data'];            
        $remarks = "success";            
        $message = "Successfully retrieved requested data";        
    } 
    else
     {            
         $payload = null;            
         $remarks = "failed";            
         $message = $res['errmsg'];        
        } 
    }


 


public function addOrderlist($dt)
{

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    // $isSubmitted = $dt->isSubmitted;
    // $order_code = $dt->order_code;

    $res = $this->gm->insert('pos_preorder_tb', $dt);

    if($res['code']==200) {
        // $res = $this->gm->update('pos_order_tb', $isSubmitted, "order_code = '$order_code'");
        // if ($res['code'] == 200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully retrieved data";
        // }
        
    
    return $this->gm->sendPayload($payload, $remarks, $message, $code);

}
}


public function tableOccupied($dt)
{

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";



    $sql = "UPDATE `crm_tables_tb` SET `status_id` = '2' WHERE table_name = '$dt->table_name'";
    $res = $this->gm->generalQuery1($sql, "");

    if($res['code']!=200) {
  
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully retrieved data";
    }
        
    
    return $this->gm->sendPayload($payload, $remarks, $message, $code);

}



public function submittedOrder($dt)
{
    
    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    $isSubmitted = $dt->isSubmitted;
    $order_code = $dt->order_code;
  

    $sql = "UPDATE `pos_order_tb` SET `isSubmitted` = '1' WHERE `pos_order_tb`.`order_code` = '$order_code'";
    $res = $this->gm->generalQuery1($sql, "");

     if($res['code']!=200) {
     
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully retrieved data";

}

return $this->gm->sendPayload($payload, $remarks, $message, $code);

}

public function addPreOrderNew($dt)
{
  
    $payload = $dt;
    $product_name = $dt->product_name;
    $order_code = $dt->order_code;
  



    $sql = "SELECT * FROM pos_order_tb WHERE product_name='$product_name' AND order_code = '$order_code' LIMIT 1";
    $res = $this->gm->generalQuery($sql, "Failed");
    if($res['code'] == 200) {
        if($this->checkPreOrderItem($product_name, $res['data'][0]['product_name'])) {
   
            $newQuantity = $dt->quantity + $res['data'][0]['quantity'];
            $newPrice = $dt->price + $res['data'][0]['price'];

            $sql1=" UPDATE `pos_order_tb` 
            SET 
            `quantity` = '$newQuantity',
            `price` = '$newPrice'
            WHERE 
            `product_name` = '$product_name'

            
            "; 
           
            

            $res1 = $this->gm->generalQuery($sql1, "");

            

        if ($res1['code'] != 200) {
 
            $code = 200;
            $payload = $res1;
            $remarks = "success";
            $message = $res1;

        } 

       
           
           
        } else {
            $payload = null; 
            $remarks = "failed"; 
            $message = $res['errmsg'];

        }
    }	else {

    $res = $this->addPreOrder($dt);

        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully retrieved data";

    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }

public function pushCode($d)
{
    
    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    $order_code = $d->order_code;
    $sql=" UPDATE `pos_order_tb` 
            SET 
            `order_code` = '$order_code' WHERE isSubmitted = '0'"; 
    
    $res = $this->gm->generalQuery($sql, "");

    if($res['code']!=200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully retrieved data";
        
    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
  

}





public function addPreOrder($data) {

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";


    $res = $this->gm->insert('pos_order_tb', $data);

    if($res['code']==200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully retrieved data";
        
    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
  
}
//update
public function updatePreOrder($data) {

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    $orderInfo = $data->orderInfo;

    $res = $this->gm->edit('pos_order_tb', $orderInfo);

    if($res['code']==200) {
        $code = 200;
        $payload = $res['data'];
        $remarks = "success";
        $message = "Successfully retrieved data";
        
    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
  
}
//ADD TO CART
    public function addOrder($data) {

        $code = 401;
        $payload = null;
        $remarks = "failed";
        $message = "Unable to retrieve data";
        $cardInfo = $data->cardInfo;

        $res = $this->gm->insert('pos_preorder_tb', $cardInfo);

        if($res['code']==200) {
            $code = 200;
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved data";
            
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $code);
      
    }
    public function addProduct($data) {

        $code = 401;
        $payload = null;
        $remarks = "failed";
        $message = "Unable to retrieve data";
        $productInfo = $data->productInfo;

        $res = $this->gm->insert('menu_tb', $productInfo);

        if($res['code']==200) {
            $code = 200;
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved data";
            
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $code);
      
    }


    public function delOrder($d) { 
        $data = $d; 
        $prodID = $data->prodID;
         $res = $this->gm->delete('pos_preorder_tb', $data, "prodID = '$prodID'"); if ($res['code'] == 200) 
         {  
            $payload = $res['data'];            
            $remarks = "success";            
            $message = "Successfully retrieved requested data";        
        } 
        else
         {            
             $payload = null;            
             $remarks = "failed";            
             $message = $res['errmsg'];        
            } 
        }

        public function clearAll($d) { 
       
            $code = 401;
            $payload = null;
            $remarks = "failed";
            $message = "Unable to retrieve data";
            $order_code = $d->order_code;
            $sql=" UPDATE `pos_order_tb` 
                    SET   isDeleted = '1'
                    WHERE `order_code` = '$order_code' "; 
            
            $res = $this->gm->generalQuery($sql, "");
        
            if($res['code']!=200) {
                $code = 200;
                $payload = $res;
                $remarks = "success";
                $message = "Successfully retrieved data";
                
            }
            return $this->gm->sendPayload($payload, $remarks, $message, $code);
           }
   


        public function delPre($d) { 
            

            $code = 401;
            $payload = null;
            $remarks = "failed";
            $message = "Unable to retrieve data";
            $order_code = $d->order_code;
            $sql=" UPDATE `pos_order_tb` 
                    SET   isDeleted = '1'
                    WHERE `order_code` = '$order_code' "; 
            
            $res = $this->gm->generalQuery($sql, "");
        
            if($res['code']!=200) {
                $code = 200;
                $payload = $res;
                $remarks = "success";
                $message = "Successfully retrieved data";
                
            }
            return $this->gm->sendPayload($payload, $remarks, $message, $code);
            }



    //CHECK OUT
    
// //DELETE PRODUCT
//     public function delProduct($data) {

//         $code = 401;
//         $payload = null;
//         $remarks = "failed";
//         $message = "Unable to retrieve data";
//         $conditionString = "pid=".$data->pid;
  
//         $res = $this->gm->delete('tbl_products', $data, $conditionString);

//         if($res['code']==200) {
//             $code = 200;
//             $payload = $res;
//             $remarks = "success";
//             $message = "Successfully retrieved data";
//             return $this->get->pullProducts(null);
//         }
//         return $this->gm->sendPayload($payload, $remarks, $message, $code);
//     }



    


    
}
