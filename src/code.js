/**
 * スプレッドシートのシート1からデータを取得する
 */
function getData() {
	// 連携しているスプレッドシートからシート1を取得する
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
	// B列の中でB2から最後の内容が入力されている行までの入力数を取得する
	const lastRow = sheet.getRange("B3:B").getValues().filter(String).length;
	// B2からD列の中で内容が入力されているすべての行内容を取得する
	// getRange(2行目, B列, 取得する行の数, 取得する列の数)
	const rangeList = sheet.getRange(3, 2, lastRow, sheet.getLastColumn() - 1).getValues();

	// 取得した内容をログに出力する
	Logger.log(rangeList);
	// 取得した内容を返却する
	return rangeList;
}

/**
 * スプレッドシートのシート1に書き込む
 * @param name 名前
 * @param hiragana 名前(ひらがな)
 * @param age 年齢
 */
function setData(name, hiragana, age) {
	const values = [[name, hiragana, age]];
	Logger.log(values);
	// 連携しているスプレッドシートからシート1を取得する
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
	// B列の中でB2から最後の内容が入力されている行までの入力数を取得する。
	const lastRow = sheet.getRange("B2:B").getValues().filter(String).length;
	// B2からD列の中で内容が入力されているすべての行内容を取得する
	// getRange(入力されている行の数＋2, B列, 保存したい内容の数, 保存したい内容のセルの数)
	sheet.getRange(lastRow + 2, 2, values.length, values[0].length).setValues(values);
	// 登録した内容を枠線を囲う
	sheet.getRange(lastRow + 2, 2, values.length, values[0].length).setBorder(true, true, true, true, true, true, "Black", SpreadsheetApp.BorderStyle.SOLID);
	// 更新されたデータを返却する
	return getData();
}
/**
 * スプレッドシートからデータを削除する
 * @param index 削除するデータの位置 
 * @returns 
 */
function deleteData(index){
	// getData()でシートの内容を取得して該当の内容を変数に格納する
	let data = getData();
	Logger.log(data);
	data.splice(index, 1)
	Logger.log(data);
	// 連携しているスプレッドシートからシート1を取得する
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
	// 一度データを削除する
	sheet.getRange("B3:D").clearContent();
	// 枠線を削除する
	sheet.getRange("B3:D").clearFormat();
	// 登録する
	sheet.getRange(3, 2, data.length, data[0].length).setValues(data);
	// 枠線で囲う
	sheet.getRange(3, 2, data.length, data[0].length).setBorder(true, true, true, true, true, true, "Black", SpreadsheetApp.BorderStyle.SOLID);
	return data;
}

/**
 * ドキュメント作成または上書き
 * @param name ドキュメント名
 * @param text  内容
 */
function saveDocument(name, text) {
	// 自アカウントのマイドライブの情報を取得して格納する
	const root = DriveApp.getRootFolder();
	// 自アカウントのマイドライブの情報からワークショップというフォルダの情報を取得
	const folderIterator = root.getFoldersByName("ワークショップ");
	// ワークショップフォルダの情報を格納する為の変数を定義しておく
	let targetFolder;
	// ワークショップフォルダが存在するかをチェック
	if (folderIterator.hasNext()) {
		// 存在する場合は、targetFolderにワークショップフォルダの情報を格納する
		targetFolder = folderIterator.next();
	} else {
		// 存在しない場合は、ワークショップフォルダを作成してtargetFolderに情報を格納する
		targetFolder = root.createFolder("ワークショップ");
	}

	// ドキュメントの情報を格納する為の変数を定義しておく
	let doc;
	// ワークショップフォルダの中にあるドキュメントの情報を取得して格納する
	const files = targetFolder.getFilesByType(MimeType.GOOGLE_DOCS);
	// filesに格納されたファイルの情報がある限り処理をループさせる
	while (files.hasNext()) {
		// filesに格納されたファイルの情報を一度格納する
		const file = files.next();
		if (file.getName() === name)  {
			// 指定した名前のドキュメントが存在する場合は、docにドキュメントの情報を格納する
			doc = DocumentApp.openById(file.getId());
			// ループを抜け出す
			break;
		}
	}
	if (typeof doc === "undefined") {
		// docにドキュメントの情報が格納されていなければ、新しくドキュメントを作成して、docに情報を格納する
		doc = DocumentApp.create(name);
	}

	// docに格納されているドキュメントに指定した内容を書き込む
	// 元々存在したドキュメントの情報が格納されている場合は元の内容に追記されていく
	doc.getBody().appendParagraph(text);
	// ドキュメントの内容を保存する
	doc.saveAndClose();
	// ドキュメントのファイル情報を格納する
	const docFile = DriveApp.getFileById(doc.getId());
	// ワークショップフォルダにドキュメントを移動させる
	targetFolder.addFile(docFile);
}