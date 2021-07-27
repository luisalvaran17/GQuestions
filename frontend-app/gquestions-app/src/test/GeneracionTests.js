const { Builder, By, until } = require('selenium-webdriver');

(async function GeneracionFormSuccessTest() {
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

    await driver.findElement(By.id('cant_preguntas')).sendKeys('5');
    await driver.sleep(2000)

    await driver.findElement(By.id('btn-demo')).click();
    await driver.sleep(3000)

    await driver.findElement(By.id('editar-examenes')).click();
    await driver.sleep(2000);

    for (let i = 0; i < 7; i++) {
      await driver.findElement(By.id((i + 1).toString())).click();
      if (i === 4 || i === 6) {
        await driver.findElement(By.id('btn-preguntas')).click();
      }
      await driver.sleep(600);
    }

    await driver.sleep(1000);
    await driver.findElement(By.id('generar-examenes')).click();
    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.id('contrasena_exam')), 30000);
    await driver.sleep(300);
    await driver.findElement(By.id('contrasena_exam')).sendKeys('1234');
    await driver.sleep(300);
    await driver.findElement(By.id('title-examen')).sendKeys('Test');
    await driver.sleep(300);
    await driver.findElement(By.id('hours')).sendKeys('2');
    await driver.sleep(300);
    await driver.findElement(By.id('btn-terminar')).click();

    await driver.sleep(2000);

    await driver.wait(until.elementLocated(By.id('copiar-link')), 10000);
    await driver.sleep(1000)
    await driver.findElement(By.id('btn-aceptar')).click();
    await driver.sleep(2000)
    await driver.close();
  } finally {
  }
})();