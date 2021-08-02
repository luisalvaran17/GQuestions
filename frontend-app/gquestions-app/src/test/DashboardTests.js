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
    await driver.findElement(By.name('473ce667-2510-47fa-84b3-750d097e6dc9-modal')).click();
    await driver.sleep(4000);
    await driver.findElement(By.className('btn-secondary')).click();
    await driver.sleep(2000);

    await driver.findElement(By.name('9c1ac508-6c11-4bad-a992-d81c30b8463d-modal')).click();
    await driver.sleep(4000);
    await driver.findElement(By.className('btn-secondary')).click();

    await driver.findElement(By.name('9c1ac508-6c11-4bad-a992-d81c30b8463d-show-generacion')).click();
    await driver.sleep(2000);
    await driver.findElement(By.id('d326b59b-7a4c')).click()
    await driver.sleep(700);
    await driver.findElement(By.id('203897d2-42ac')).click()
    await driver.sleep(700);
    await driver.findElement(By.id('b742c6ef-f8d1')).click()
    await driver.sleep(700);
    await driver.findElement(By.className('btn-back')).click();
    await driver.sleep(2000);

    await driver.close();
  } finally {
  }
})();