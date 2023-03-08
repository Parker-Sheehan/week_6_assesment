const express = require('express')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

const path = require('path')
app.use(express.static('public'))

app.use(express.json())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '1b0fcbd6e0d4461a9feafa62fb780fed',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/list.html'))
})

app.get('/js', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/list.js'))
})

app.get('/css', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/styles.css'))
})


app.get('/api/robots', (req, res) => {
    try {
        rollbar.log('see bots button clicked')
        res.status(200).send(botsArr)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
        rollbar.log('draw button working')
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        rollbar.log('robot dual!!')
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            rollbar.log('someone lost a dual')
            playerRecord.losses++
            res.status(200).send('You lost!')

        } else {
            rollbar.log('someone won a dual')
            playerRecord.losses++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

app.listen(4000, () => {
  console.log(`Listening on 4000`)
})