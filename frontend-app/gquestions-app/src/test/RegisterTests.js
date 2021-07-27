const { Builder, By, until } = require('selenium-webdriver');

/* (async function RegisterDocenteSuccessTest() {
  const url = 'http://192.168.0.34:3000/'
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(url.toString() + 'register');
    await driver.findElement(By.id('first_name')).sendKeys('Luis');
    await driver.findElement(By.id('last_name')).sendKeys('Albaran');
    await driver.findElement(By.id('email')).sendKeys('prueba2@test.com');
    await driver.findElement(By.id('password')).sendKeys('prueba1234');
    await driver.findElement(By.id('password2')).sendKeys('prueba1234');
    await driver.findElement(By.id('rol')).sendKeys('Docente');
    await driver.findElement(By.className('btn-primary')).click();

    let et = "Generación - GQuestions";
    await driver.wait(until.titleIs(et), 10000);
    let at = await driver.getTitle()

    const assertLogin = function (condition, message) {
      if (!condition)
        throw Error('Assert register failed: ' + (message || ''));
      if (condition)
        console.log('Test register successful');
    };

    assertLogin(et === at); 

    await driver.close();
  } finally {
  }
})(); */

(async function RegisterExistUserTest() {
    const url = 'http://192.168.0.34:3000/'
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url.toString() + 'register');
        await driver.findElement(By.id('first_name')).sendKeys('Luis');
        await driver.findElement(By.id('last_name')).sendKeys('Albaran');
        await driver.findElement(By.id('email')).sendKeys('prueba2@test.com');
        await driver.findElement(By.id('password')).sendKeys('prueba1234');
        await driver.findElement(By.id('password2')).sendKeys('prueba1234');
        await driver.findElement(By.id('rol')).sendKeys('Docente');
        await driver.findElement(By.className('btn-primary')).click();
        let contain_text = "ya está registrado"
        let ele = await driver.wait(until.elementLocated(By.id('modal-title')), 10000);
        let condition = await driver.wait(until.elementTextContains(ele, contain_text), 10000);

        const assertLogin = function (condition, message) {
            if (!condition)
                throw Error('Assert exist user failed: ' + (message || ''));
            if (condition)
                console.log('Test exist user successful');
        };

        assertLogin(condition);

        await driver.close();
    } finally {
    }
})();

(async function RegisterEmptyFieldsTest() {
    const url = 'http://192.168.0.34:3000/'
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url.toString() + 'register');
        await driver.findElement(By.className('btn-primary')).click();
        await driver.sleep(5000)
        let at = await (await driver.findElement(By.id('campos-vacios'))).getText()
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

(async function RegisterPasswordNoMatchFieldsTest() {
    const url = 'http://192.168.0.34:3000/'
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url.toString() + 'register');
        await driver.findElement(By.id('first_name')).sendKeys('Luis');
        await driver.findElement(By.id('last_name')).sendKeys('Albaran');
        await driver.findElement(By.id('email')).sendKeys('prueba2@test.com');
        await driver.findElement(By.id('password')).sendKeys('prueba12345');
        await driver.findElement(By.id('password2')).sendKeys('prueba1234');
        await driver.findElement(By.id('rol')).sendKeys('Docente');
        await driver.findElement(By.className('btn-primary')).click();
        await driver.sleep(5000)
        let at = await (await driver.findElement(By.id('pass-no-match'))).getText()
        let et = "Las contraseñas no coinciden"

        const assertPasswordLogin = function (condition, message) {
            if (!condition)
                throw Error('Assert no match pass failed: ' + (message || ''));
            if (condition)
                console.log('Assert no match pass successful');
        };

        assertPasswordLogin(et === at);

        await driver.close();
    } finally {
    }
})();

(async function RegisterPasswordShortTest() {
    const url = 'http://192.168.0.34:3000/'
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url.toString() + 'register');        
        await driver.findElement(By.id('first_name')).sendKeys('Luis');
        await driver.findElement(By.id('last_name')).sendKeys('Albaran');
        await driver.findElement(By.id('email')).sendKeys('prueba2@test.com');
        await driver.findElement(By.id('password')).sendKeys('1234');
        await driver.findElement(By.id('password2')).sendKeys('1234');
        await driver.findElement(By.id('rol')).sendKeys('Docente');
        await driver.findElement(By.className('btn-primary')).click();
        await driver.sleep(5000)

        let condition = await driver.wait(until.elementLocated(By.id('pass-short')), 5000);

        const assertPasswordShort = function (condition, message) {
            if (!condition)
                throw Error('Assert short password failed: ' + (message || ''));
            if (condition)
                console.log('Assert short password successful');
        };

        assertPasswordShort(condition);

        await driver.close();
    } finally {
    }
})();