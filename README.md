# cloudinsight-selenium-scripts

使用 Selenium API 快速验证 CloudInsight 左边导航栏里的所有的页面

## 配置选项

|      环境变量              |       备注       | 默认值                                  |
|---------------------------|------------------|----------------------------------------|
|   SELENIUM_BROWSER        |   浏览器(chrome,firefox,internet explorer) | firefox       |
|   SELENIUM_REMOTE_URL     |   Selenium Hub   | 本地                                    |
|   HOMEPAGE                |   首页            | https://cloud.oneapm.com/              |
|   LOGINPAGE               |   登录页          | https://user.oneapm.com/account/demo.do|

## 配合 Jenkins 使用效果最佳

![Jenkins](./configutation.png)

Jenkins 需要安装这几个插件

[`Selenium Plugin`](http://wiki.jenkins-ci.org/display/JENKINS/Selenium+Plugin)

能够自动下载和运行 `Selenium` 所需的 `Jar` 文件

[`Image Gallery Plugin`](https://wiki.jenkins-ci.org/display/JENKINS/Image+Gallery+Plugin)

能够把构建 Artifacts 里的图片显示成一个 Gallery

## 最终效果

![界面截图](./screenshot.png)