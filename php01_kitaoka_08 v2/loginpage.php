<?php

// 1. loginpage.php画面で入力された値の取得→POST
// 2. PHPからMySQLへ接続→PDOクラスを使用
// 3. SQL文を作成して、画面で入力された値をloginテーブルから取得
// 4. 取得できた時、取得結果が配列として格納されるので、
//　　配列が空でない場合はindex.phpに画面遷移

$error_msg = "";

if(isset($_POST['loginpage'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    try {
        //ID:'root', Password: 'root'
        $pdo = new PDO(
          'mysql:dbname=login;charset=utf8;host=localhost',
          'root',
          'root');
        //INSERT文の作成
        $sql = 'SELECT * from login where username = :username AND password = :password';
        //SQLを実行できるように準備
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);

        //SQLの実行
        $stmt->execute();
        $result = $stmt->fetch();
        $stmt = null;
        $pdo = null;

        if($result[0] != 0){
            //index.phpへリダイレクト
            header('Location: ./index.php');
            exit;  
        }else{
            $error_msg = "ユーザー名またはパスワードが誤っています。";
        }
    } catch (PDOException $e) {
        exit('DBConnectError:'.$e->getMessage());
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
    <title>学習記録CRUD</title>
</head>
<body>
    <form class="m-5" action="" method="POST">
        <?php if($error_msg !== null && $error_msg !== ""){ echo $error_msg.'<br>';} ?>
        <p class="alert alert-primary" role="alert">ログイン画面</p>
        <div class="form-group">
            <label for="date">ユーザ名</label>
            <input type="text" class="form-control" id="username" name="username" required placeholder="ユーザーネームを入力" value="">
        </div>
        <div class="form-group">
            <label for="title">パスワード</label>
            <input type="password" class="form-control" id="password" name="password" minlength="8" required autocomplete="off" autocomplete="" value="">
            <span id="buttonEye" class="fa fa-eye"></span>
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-outline-primary" id="loginpage" name="loginpage" value="ログイン">
        </div>
    </form>
    <a class="m-5" href="login.php">新規登録</a>
    <script src="./assets/css/hidePass.js"></script>
</body>
</html>