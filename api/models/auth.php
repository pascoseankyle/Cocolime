<?php
    class Auth {
        private $conn;
		private $sql;
		private $data = array();
		private $info = [];
		private $status =array();
		private $failed_stat = array(
			'remarks'=>'failed',
			'message'=>'Failed to retrieve the requested records'
		);
		private $success_stat = array(
			'remarks'=>'success',
			'message'=>'Successfully retrieved the requested records'
		);

		public function __construct($db){
			$this->conn = $db;
        }
        
        function encryptPassword($pword): ?string{
            $hashFormat ="$2y$10$";
            $saltLength =22;
            $salt = $this->generateSalt($saltLength);
            return crypt($pword, $hashFormat.$salt);
        }

        function generateSalt($len){
            $urs=md5(uniqid(mt_rand(), true));
            $b64string = base64_encode($urs);
            $mb64string = str_replace('+','.', $b64string);
            return substr($mb64string, 0, $len);
        }
        
        function registerUser($dt){
            $payload = $dt;
            $encryptedPassword = $this->encryptPassword($dt->pword);

            $payload = array(
                'uname'=>$dt->uname,
                'pword'=>$this->encryptPassword($dt->pword)
            );
            
            $this->sql = "INSERT INTO user_tb(uname, acctpword, fname)
                VALUES ('$dt->uname', '$encryptedPassword','$dt->fname')";
            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Inventory Staff',
				'timestamp'=>date('D M j, Y h:i:s e')
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
                        'message'=>'Data retrieval successful.'
                    ),
                    'data' =>$this->data,
                    'payload'=>$this->data,
                    'dataCount'=>$rowCount,
                    'timestamp'=>date('D M j, Y h:i:s e'),
                    'prepared_by'=>'Inventory Staff'
                );
    
            } else {
                return $this->info = array('status'=>array(
                    'remarks'=>false,
                    'payload'=>$this->data,
                    'dataCount'=>$rowCount,
                    'message'=>'Data retrieval failed.'),
                    'timestamp'=>date('D M j, Y h:i:s e'),
                    'prepared_by'=>'Inventory Staff' );
            }

        }

           
        
function loginUser($dt){
            $payload = $dt;
            $uname = $this->conn->real_escape_string($dt->uname);
            $pword = $this->conn->real_escape_string($dt->pword);
            
            $this->sql="SELECT * FROM user_tb WHERE uname='$uname' LIMIT 1";

            if($result=$this->conn->query($this->sql)){
                if($result->num_rows>0){
                    $res=$result->fetch_assoc();
                    if($this->pwordCheck($pword, $res['acctpword'])){
                http_response_code(200);
                $this->data = array(
                    'uname'=>$res['uname'],
                    'fname'=>$res['fname']
                );
                $this->status = array(
                    'remarks'=>'success',
                    'message'=>'Successfully logged in',
                );


            }else{
                http_response_code(401);
                $this->status = array(
                    'remarks'=>'failed',
                    'message'=>'Incorrect username or password',
                );
            }
            }else{
                http_response_code(401);
                $this->status = array(
                    'remarks'=>'failed',
                    'message'=>'Incorrect username or password',
                );
            }
        }else{
                http_response_code(401);
                $this->status = array(
                    'remarks'=>'failed',
                    'message'=>'Incorrect username or password',
                );
            }
            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Staff',
                'timestamp'=>date('D M j, Y G:i:s T')
            );
        }
        function pwordCheck($pw, $existingpw){
            $hash=crypt($pw, $existingpw);
            if($hash === $existingpw){return true;} else {return false;}
        }
        
        



    }
?>