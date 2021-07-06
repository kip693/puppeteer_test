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
    var data = [];

    const header = ["description", "leader", "team", "status", "fund"];
    data.push(header);

    for (let t = 1; t < 10; t++) {
      var section = '/html/body/main/div/div/div/div[3]/div/div[2]/div[' + t + ']/div[1]/table/tbody/tr['

      try {
        for (let i = 1; i <= 50; i++) {
          let company  = [];

          let company_xpath = section + i + ']/';
        
          let description_path = company_xpath + 'td[2]/div[2]/span';
          const description_elem = await page.$x(description_path);
          const description_jsHandle = await description_elem[0].getProperty('textContent');
          const description = await description_jsHandle.jsonValue();
          company.push(description);

          let leader_path =  company_xpath + 'td[3]/div'
          const leader_elem = await page.$x(leader_path);
          const leader_jsHandle = await leader_elem[0].getProperty('textContent');
          const leader = await leader_jsHandle.jsonValue();
          company.push(leader);

          let team_path =  company_xpath + 'td[4]/a'
          const team_elem = await page.$x(team_path);
          const team_jsHandle = await team_elem[0].getProperty('textContent');
          const team = await team_jsHandle.jsonValue();
          company.push(team);

          let status_path =  company_xpath + 'td[5]/span'
          const status_elem = await page.$x(status_path);
          const status_jsHandle = await status_elem[0].getProperty('textContent');
          const status = await status_jsHandle.jsonValue();
          company.push(status);

          let fund_path =  company_xpath + 'td[6]/span'
          const fund_elem = await page.$x(fund_path);
          const fund_jsHandle = await fund_elem[0].getProperty('textContent');
          const fund = await fund_jsHandle.jsonValue();
          company.push(fund);
          data.push(company);
        }

      } catch (err) {
        console.log(err)
      }

    }
  } catch (err) {
    // エラーが起きた際の処理
    console.log(err)
  } finally {

    

    console.log(data)
    console.log("success")
    // CSVに出力する処理.
    // data(多次元配列)
    stringify(data, (error, csvString) => {
      // ファイルシステムに対してファイル名を指定し、ファイルストリームを生成する.
      const writableStream = fs.createWriteStream(path.join(__dirname, 'result.csv'));
      // csvStringをUTF-8で書き出す.
      writableStream.write(iconv.encode(csvString, 'UTF-8'));
    });


    await browser.close();
  }
})();