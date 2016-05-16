const DEFAULT_BROWSER = 'firefox';
const fs = require('fs');
const webDriver = require('selenium-webdriver');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const By = webDriver.By;
const Until = webDriver.until;
const builder = new webDriver.Builder().forBrowser(DEFAULT_BROWSER);// 本地测试的时候用 Firefox
const driver = builder.build();

const browserName = process.env.SELENIUM_BROWSER || DEFAULT_BROWSER;
const homePage = process.env.HOMEPAGE || 'https://cloud.oneapm.com/';
const loginPage = process.env.LOGINPAGE || 'https://user.oneapm.com/account/demo.do';

// 设置窗口大小
driver.manage().window().setSize(1200, 768);

// 定义函数
const writeFile = (filename, res) => fs.writeFileSync(`./dist/${filename}.png`, new Buffer(res, 'base64'));

const goThrough = (list, index) => {
	if (list[index]) {
		const fileName = (browserName + '_' + list[index]).replace(/\W+/g, '_');
		driver.get(list[index]).then(()=> {
			setTimeout(()=> {
				driver.takeScreenshot()
					.then(writeFile.bind(null, fileName)).then(()=> {
					goThrough(list, index + 1);
				})
			}, 2000)
		});
	} else {
		driver.quit();
	}
}

// 清空重建文件夹
rimraf.sync('./dist');
mkdirp.sync('./dist');

// 先以 DEMO 用户登录
driver.get(loginPage).then(()=> {

	// 访问首页
	driver.get(homePage);

	driver.wait(Until.elementLocated(By.css('.sidebar'))).then(sidebar => {
		sidebar
			.findElements(By.css('a'))
			.then(res => Promise.all(res.map(element =>element.getAttribute('href'))))
			.then(links => {
				goThrough(links, 0);
			});
	});
});
