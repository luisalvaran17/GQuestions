const { Builder, By, until } = require('selenium-webdriver');

(async function LoginSuccessTest() {
  const url = 'http://192.168.0.34:3000/'
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(url.toString() + 'login');
    await driver.findElement(By.id('login')).sendKeys('luisalvaranleav@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('root1234');
    await driver.findElement(By.className('btn-primary')).click();
    let et = "Inicio - GQuestions";
    await driver.wait(until.titleIs(et), 10000);
    let at = await driver.getTitle()

    const assertLogin = function (condition, message) {
      if (!condition)
        throw Error('Assert login failed: ' + (message || ''));
      if (condition)
        console.log('Test login successful');
    };

    assertLogin(et === at); 

    await driver.close();
  } finally {
  }
})();

(async function LoginPasswordTest() {
  const url = 'http://192.168.0.34:3000/'
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(url.toString() + 'login');
    await driver.findElement(By.id('login')).sendKeys('luisalvaranleav@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('root123');
    await driver.findElement(By.className('btn-primary')).click();
    await driver.sleep(5000)
    let at = await (await driver.findElement(By.id('credenciales_incorrectas'))).getText()
    let et = "Credenciales incorrectos"
    
    const assertPasswordLogin = function (condition, message) {
      if (!condition)
        throw Error('Assert password failed: ' + (message || ''));
      if (condition)
        console.log('Assert password incorrect successful');
    };

    assertPasswordLogin(et === at);

    await driver.close();
  } finally {
  }
})();

(async function LoginEmptyFieldsTest() {
  const url = 'http://192.168.0.34:3000/'
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(url.toString() + 'login');
    await driver.findElement(By.id('login')).sendKeys('');
    await driver.findElement(By.id('password')).sendKeys('');
    await driver.findElement(By.className('btn-primary')).click();
    await driver.sleep(5000)
    let at = await (await driver.findElement(By.id('campos_vacios'))).getText()
    let et = "Hay campos vacíos"
    
    const assertPasswordLogin = function (condition, message) {
      if (!condition)
        throw Error('Assert empty fields failed: ' + (message || ''));
      if (condition)
        console.log('Assert empty fields successful');
    };

    assertPasswordLogin(et === at); 

    await driver.close();
  } finally {
  }
})();