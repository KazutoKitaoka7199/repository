<?php


// 新しいユーザーアカウントを登録するための処理
// 【処理の流れ】
// 最終のゴール：新しいアカウントが追加されて、loginpage.phpに遷移

//入力されたパスワードをハッシュ化する今度挑戦

// 1. login.php画面で入力された値の取得→POST
// 2. PHPからMySQLへ接続→PDOクラスを使用
// 3. SQL文を作成して、画面で入力された値をloginテーブルに追加
// 4. loginpage.phpに画面遷移する


if(isset($_POST['login'])){
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        //ID:'root', Password: 'root'
        $pdo = new PDO(
          'mysql:dbname=login;charset=utf8;host=localhost',
          'root',
          'root');
        //INSERT文の作成
        $sql = 'INSERT INTO login(id, username,password) values(NULL, :username, :password)';
        //SQLを実行できるように準備
        $stmt = $pdo->prepare($sql);

        //バインド変数を用意
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);

        //SQLの実行
        $status = $stmt->execute();
        
        if($status==false){
            //SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
            $error = $stmt->errorInfo();
            exit("ErrorMessage:".$error[2]);
        }else{
            //loginpage.phpへリダイレクト
          header('Location: ./loginpage.php');
          exit;
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
    <form class="m-5" action="./login.php" method="POST">
        <p class="alert alert-primary" role="alert">新規登録画面</p>
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
            <input type="submit" class="btn btn-outline-primary" id="login" name="login" value="新規登録">
        </div>
    </form>
    <script src="./assets/css/hidePass.js"></script>
</body>
</html>