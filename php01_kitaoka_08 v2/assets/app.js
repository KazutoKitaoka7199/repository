function setElapseTime() {
    const starttime= document.getElementById("starttime").value;
    const endtime= document.getElementById("endtime").value;
    document.getElementById("time").value = calElapseTime(starttime, endtime);
}

function calElapseTime(starttime, endtime) {
    //引数が時間形式(hh:mm)でない場合は計算しない
    if (!isFormatHHMM(starttime) || !isFormatHHMM(endtime)) return "";

    //経過時間算出のために一旦日付型に変換する
    //前提として同一日の時間入力同士の計算なのでDate化する際の日付は固定
    const wd = "2022/01/10";
    const startDate = new Date(`${wd} ${starttime}`);
    const endDate = new Date(`${wd} ${endtime}`);

    console.log(startDate);
    //開始時間 > 終了時間の場合、日を跨いでいるとして扱い、終了日に+1日する
    if (startDate > endDate) endDate.setDate(endDate.getDate() + 1);

    //終了日(終了時間) - 開始日(開始時間)を行い経過時間(ミリ秒)を算出
    const elapseMs = endDate - startDate;

    //経過時間(ミリ秒)をhh:mm形式の文字列にして返却する
    return msToTimeString(elapseMs);
}

//文字列が時間形式(hh:mm)かどうかを判定する
function isFormatHHMM(str) {
    const fmt = RegExp("^([0-1][0-9]|2[0-3]):([0-5][0-9])$");
    return fmt.test(str);
}

//ミリ秒から時分文字列(hh:mm)を作成して返す
function msToTimeString(ms) {
    //1minute = 60000ms
    //1hour = 60minutes = 3600000ms
    const hour = Math.floor(ms / 3600000);
    const minute = Math.floor((ms - 3600000 * hour) / 60000);
    const hh = ("00" + hour).slice(-2);
    const mm = ("00" + minute).slice(-2);

    return `${hh}:${mm}`;
}

const btn = document.querySelector("#endtime")
btn.addEventListener("input", setElapseTime)