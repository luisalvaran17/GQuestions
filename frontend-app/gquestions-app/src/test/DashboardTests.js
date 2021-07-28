const { Builder, By, until } = require('selenium-webdriver');

(async function NavigationAppTest() {
  const url = 'http://192.168.0.34:3000/'
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(url.toString() + 'login');
    driver.manage().window().maximize();
    await driver.findElement(By.id('login')).sendKeys('luis.albaran@correounivalle.edu.co');
    await driver.findElement(By.id('password')).sendKeys('root1234');
    await driver.findElement(By.className('btn-primary')).click();
    let et = "Generación - GQuestions";
    await driver.wait(until.titleIs(et), 10000);

    await driver.sleep(1000);
    await driver.findElement(By.id('btn-dashboard')).click();
    await driver.sleep(1000);
    await driver.findElement(By.name('0208a8f2-1609-4664-b898-e789882dfdc0-modal')).click();
    await driver.sleep(4000);
    await driver.findElement(By.className('btn-secondary')).click();
    await driver.sleep(2000);

    await driver.findElement(By.name('40d7b081-ae97-47e5-b3b6-d2bd10c548e3-modal')).click();
    await driver.sleep(4000);
    await driver.findElement(By.className('btn-secondary')).click();

    await driver.findElement(By.name('40d7b081-ae97-47e5-b3b6-d2bd10c548e3-show-generacion')).click();
    await driver.sleep(2000);
    await driver.findElement(By.id('e3ddf16c-95e3')).click()
    await driver.sleep(700);
    await driver.findElement(By.id('579e7422-da89')).click()
    await driver.sleep(700);
    await driver.findElement(By.id('ab977107-ddd2')).click()
    await driver.sleep(700);
    await driver.findElement(By.className('btn-back')).click();
    await driver.sleep(2000);

    await driver.close();
  } finally {
  }
})();