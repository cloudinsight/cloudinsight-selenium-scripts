const fs = require('fs');
const webDriver = require('selenium-webdriver');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const By = webDriver.By;
const Until = webDriver.until;
const builder = new webDriver.Builder().forBrowser('firefox');// 本地测试的时候用 Firefox

const driver = builder.build();

// 定义函数
const writeFile = (filename, res) => fs.writeFileSync(`./dist/${filename}.png`, new Buffer(res, 'base64'));

const goThrough = (list, index) => {
	if (list[index]) {
		driver.get(list[index]).then(()=> {
			driver.takeScreenshot().then(writeFile.bind(null, list[index].replace(/\W/g, '_'))).then(()=> {
				goThrough(list, index + 1);
			})
		})
	} else {
		driver.quit();
	}
}

// 清空重建文件夹
rimraf.sync('./dist');
mkdirp.sync('./dist');

// 先以 DEMO 用户登录
driver.get('https://user.oneapm.com/account/demo.do').then(()=> {

	// 访问首页
	driver.get('https://cloud.oneapm.com/');

	driver.wait(Until.elementLocated(By.css('.sidebar'))).then(sidebar => {
		sidebar
			.findElements(By.css('a'))
			.then(res => Promise.all(res.map(element =>element.getAttribute('href'))))
			.then(links => {
				goThrough(links, 0);
			})
	});
});
