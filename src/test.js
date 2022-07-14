/**
 * ドキュメント保存のテストコード
 */
function test_saveDocument(){
	const name = "テスト" + formatDate(new Date());
	const text = "本日は晴天なり";
	saveDocument(name, text);
}

/**
 * スプレッドシート書き込みのテストコード
 */
function test_setData(){
	const name = "山田太郎";
	const hiragana = "やまだたろう";
	const age = 31;
	setData(name, hiragana, age);
}

/**
 * 日付をYYYY-MM-DDの書式で返すメソッド
 * @param  日時 
 * @returns 日時を文字列として返す
 */
function formatDate(dt) {
	var y = dt.getFullYear();
	var m = ('00' + (dt.getMonth()+1)).slice(-2);
	var d = ('00' + dt.getDate()).slice(-2);
	return (y + '-' + m + '-' + d);
  }
  