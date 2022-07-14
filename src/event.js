/**
 * GASウェブサイトを開く為の処理を扱う
 * @param e パラメータなどの情報の集まり
 * @returns ウェブサイトを表示する
 */
function doGet(e) {
    let page = e.parameter.page
    if (!page) {
        page = "index";
    }

    Logger.log(page)

    const htmlIndex = HtmlService.createTemplateFromFile(page);
    for (const key in e.parameter) {
        htmlIndex[key] = e.parameter[key];
    }

    return htmlIndex
        .evaluate()
        .setTitle(_title)
        .setFaviconUrl('https://drive.google.com/file/d/1PiGhr86ddYOerCQm8aL2lN2bwAJSFf-t/view?usp=sharing' + ".png")
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * ウェブサイトで利用したいcssファイルやjsファイルを読み込む処理を扱う
 * @param filename cssファイルやjsファイルを指定する
 * @returns 
 */
function include(filename) {
    return HtmlService
        .createHtmlOutputFromFile(filename)
        .getContent()
        .replace("&lt;", "<")
        .replace("&gt;", ">")
}