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
    await driver.findElement(By.id('btn-estadisticas')).click();
    await driver.sleep(2000);
    await driver.findElement(By.id('btn-calificaciones')).click();
    await driver.sleep(2000);
    await driver.findElement(By.id('6ec132ab')).click();
    await driver.sleep(2000);

    await driver.findElement(By.id('51cb1807')).click();
    await driver.sleep(2000);

    await driver.findElement(By.id('btn-volver')).click();
    await driver.sleep(3000);

    await driver.findElement(By.id('btn-ajustes')).click();
    await driver.sleep(2000);
    await driver.close();
  } finally {
  }
})();