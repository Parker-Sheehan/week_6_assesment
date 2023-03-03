
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:4000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test('draw button clickable', async () => {
    const draw = await driver.findElement(By.id('draw'))
    await draw.click()
    const card = await driver.findElement(By.className('bot-card'))
    const displayed = await card.isDisplayed()
    await driver.sleep(5000)
    expect(displayed).toBe(true)
})

test('Play again button to show up after match', async () => {
    const draw = await driver.findElement(By.id('draw'))
    await draw.click()
    await driver.sleep(2000)

    for(let i = 0; i < 2; i++){
        const addToDuoBtn = await driver.findElement(By.className('bot-btn'))
        await addToDuoBtn.click()
        await driver.sleep(2000)
    }

    const duelBtn = await driver.findElement(By.id('duel'))
    await duelBtn.click()
    await driver.sleep(5000)

    const playAgain = await driver.findElement(By.id('play-again'))
    expect(await playAgain.isDisplayed()).toBe(true)
    
})