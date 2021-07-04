const puppeteer = require('puppeteer');
// csv-stringifyをrequire
const stringify = require('csv-stringify');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://visionfund.com/portfolio');
    var description = [];
    for (let t = 1; t < 10; t++) {
      var section = '/html/body/main/div/div/div/div[3]/div/div[2]/div[' + t + ']/div[1]/table/tbody/tr['

      try {
        for (let i = 1; i <= 50; i++) {
          let xpath = section + i + ']/td[2]/div[2]/span'
          const elems = await page.$x(xpath);
          const jsHandle = await elems[0].getProperty('textContent');
          const text = await jsHandle.jsonValue();
          description.push(text);
          console.log(text);
        }

      } catch (err) {
      }

    }
  } catch (err) {
    // エラーが起きた際の処理
  } finally {
    stringify(description, (error, csvString) => {
      // ファイルシステムに対してファイル名を指定し、ファイルストリームを生成する.
      const writableStream = fs.createWriteStream(path.join(__dirname, 'visionfund.csv'));
      // csvStringをUTF-8で書き出す.
      writableStream.write(iconv.encode(csvString, 'UTF-8'));
    });
    
    await browser.close();
  }
})();