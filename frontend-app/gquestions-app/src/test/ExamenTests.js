// https://gquestions.herokuapp.com/https://gquestions.herokuapp.com/student/login-examen/5ab856b8-ce94-46b5-9ee7-3c9f2bea9272
const { Builder, By, until } = require('selenium-webdriver');

(async function ExamenTests() {
  const url = 'http://192.168.0.34:3000/'
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(url.toString() + 'login');
    driver.manage().window().maximize();
    await driver.findElement(By.id('login')).sendKeys('luisalvaranleav@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('root1234');
    await driver.findElement(By.className('btn-primary')).click();
    let et = "Inicio - GQuestions";
    await driver.wait(until.titleIs(et), 10000);

    await driver.sleep(1000);
    
    await driver.get(url.toString() + 'student/login-examen/9c1ac508-6c11-4bad-a992-d81c30b8463d');
    await driver.sleep(400);
    await driver.findElement(By.id('password')).sendKeys('12345');
    await driver.sleep(400);
    await driver.findElement(By.id('btn-login-examen')).click();
    await driver.sleep(400);

    await driver.findElement(By.id('password')).clear();
    await driver.sleep(400);
    await driver.findElement(By.id('password')).sendKeys('1234');
    await driver.sleep(400);
    await driver.findElement(By.id('btn-login-examen')).click();
    await driver.sleep(1000);

    let text_areas = await driver.findElements(By.id('textarea-respuesta'));

    for (let i = 0; i < text_areas.length; i++) {
        text_areas[i].sendKeys('In its most general form, the activities describing music as an art form or cultural activity include the creation of works of music (songs, tunes, symphonies, and so on), the criticism of music');
    }
  
    await driver.sleep(500);
    await driver.findElement(By.xpath("//a[@href='examen#5']")).click();
    await driver.sleep(500);
    
    await driver.findElement(By.id('terminar-intento')).click();
    await driver.sleep(500);
    await driver.findElement(By.id('aceptar-modal')).click();

  } finally {
  }
})();