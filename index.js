const pg = require('pg')

const client= new pg.Client('postgres://localhost/block31_icecreamshop_backend')
const express = require('express')


const port =3000
const app = express()

app.get('/', (req, res, next) => {
    res.send("hello world")
})

app.get('/api/icecream', async (req, res, next) => {
    try{
        const flavors = `
        SELECT * FROM icecream;
        `
        const response = await client.query(flavors)
        console.log(response)
        res.send(response.rows)
    } catch (error) {
        next(error)

    }
})
app.get('/api/icecream/:id', async (req, res, next) => {
    try{
        console.log(req.params.id)
        const flavors = `
        SELECT * FROM icecream WHERE id=${req.params.id};
        `
        const response = await client.query(flavors)
        
        res.send("hello")
        
    } catch (error) {
        next(error)

    }
})

app.delete('/api/icecream/:id', async (req, res, next) => {
    try{
        const flavors =`
        DELETE FROM icecream WHERE id=$1
        `
        const response= await client.query(flavors, [req.params.id])
        console.log(response)
        res.send("hello hello")

    }catch (error){
        next(error)
    }
})

app.listen(port, () => {
    console.log("listening on port")

})

const start = async ()=> {

    await client.connect()
    console.log("connected to db!")

    const flavors =`
    DROP TABLE IF EXISTS icecream;
    CREATE TABLE icecream(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20)
        );

        INSERT INTO icecream(name) VALUES ('Rocky Road');
        INSERT INTO icecream(name) VALUES ('Vanilla');
        INSERT INTO icecream(name) VALUES ('Lavendar');
        INSERT INTO icecream(name) VALUES ('Mint Chip');
        INSERT INTO icecream(name) VALUES ('ChocoPeanut Butter');
        `
        await client.query(flavors)
        console.log('table created and seeded')
       
  
}
start ()