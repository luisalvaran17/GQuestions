const { Builder, By, until } = require('selenium-webdriver');

(async function AjustesCuentaTest() {
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

    await driver.get(url.toString() + 'teacher/ajustes-cuenta');
    await driver.sleep(2000);

    await driver.findElement(By.id('btn-contrasena')).click();
    await driver.findElement(By.id('btn-editar')).click();
    await driver.sleep(600);
    await driver.findElement(By.id('new_password')).sendKeys('root1234');
    await driver.sleep(500);
    await driver.findElement(By.id('new_password2')).sendKeys('root1234');
    await driver.sleep(500);
    await driver.findElement(By.id('old_password')).sendKeys('root1234');
    await driver.sleep(500);

    await driver.findElement(By.id('btn-guardar')).click();

    await driver.sleep(2000);

    await driver.findElement(By.id('btn-info-adicional')).click();
    await driver.findElement(By.id('btn-editar')).click();
    await driver.sleep(500);
    await driver.findElement(By.id('organizacion')).sendKeys(' Test');
    await driver.sleep(500);
    await driver.findElement(By.id('btn-guardar')).click();
    await driver.sleep(2000);

    await driver.findElement(By.id('btn-perfil')).click();
    await driver.sleep(2000);

    await driver.findElement(By.id('btn-editar')).click();
    await driver.sleep(500);
    await driver.findElement(By.id('apellidos')).sendKeys(' Test');
    await driver.sleep(2000);

    await driver.findElement(By.id('btn-guardar')).click();
    await driver.sleep(2000);
    await driver.close();
  } finally {
  }
})();