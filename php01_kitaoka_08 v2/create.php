<?php

// dbconnect.phpを読み込む→dbconnect.phpが実行されて、DBと接続される
include_once('./dbconnect.php');

// 新しいレコードを追加するための処理
// 【処理の流れ】
// 最終のゴール：新しい学習記録が追加されて、TOPに戻る

// 1. 画面で入力された値の取得→POST
// 2. PHPからMySQLへ接続→PDOクラスを使用
// 3. SQL文を作成して、画面で入力された値をrecordsテーブルに追加
// 4. index.phpに画面遷移する

$date = $_POST['date'];
$time = $_POST['time'];
$title = $_POST['title'];
$amount = $_POST['amount'];
$type = $_POST['type'];


// INSERT文の作成
$sql = "INSERT INTO records(time, title, type, amount, date, created_at, updated_at) VALUES(:time, :title, :type, :amount, :date, now(), now())";

// SQLを実行できるよう準備
$stmt = $pdo->prepare($sql);

// 値の設定
$stmt->bindParam(':time', $time, PDO::PARAM_STR);
$stmt->bindParam(':title', $title, PDO::PARAM_STR);
$stmt->bindParam(':type', $type, PDO::PARAM_INT);
$stmt->bindParam(':amount', $amount, PDO::PARAM_STR);
$stmt->bindParam(':date', $date, PDO::PARAM_STR);

// SQLを実行
$stmt->execute();

// index.phpに移動
header('Location: ./index.php');
exit;