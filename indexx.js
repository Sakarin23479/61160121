const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = 'mongodb+srv://superadmin:23479.naruto@cluster0.wm519.mongodb.net/sample_weatherdata?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
//function (req,res){} คือตัวเดียวกัน กับ (req, res )=> {}
	async function connect(){
		await client.connect()
	}
	connect()

app.get('/weather', async (req, res) => {
	try{
		const callLetters = req.query.callLetters
		//const borough = req.query.borough
		
		const db = client.db('sample_weatherdata')
		
		const collection = db.collection('data')
		//ตัวอย่าง postman >>> http://localhost:3000/restaurants?cuisine=Delicatessen
		//const query = {cuisine: cuisine}
		
		let query = {}
		
		if (callLetters) {
			query.callLetters = callLetters
		}
		
		// if (borough) {
		// 	query.borough = borough
		// }
		
		const cursor = collection.find(query).limit(10)
		
		let data = [] //สร้างตัวแปร arry
		
		//await cursor.forEach(doc => console.log(doc))
		await cursor.forEach(doc => data.push(doc.position,doc.callLetters,doc.airTemperature,doc.ts)) //push เก็บในarry
		//console.log(restaurants) //ปริ้นค่าออกมาเฉพาะชื่อร้าน ใน arry
		
		res.send(data)

	}catch(e){
		
		console.log(e)
	}
})

app.listen(3000, console.log('Start application at port 3000'))

//anoymuse fuction ไม่ต้องมีชื่อทำงานจบหายไป
//pagekage.json ไว้ดูที่ติดตั้งไป

//-------------------------
//npm install --save-prod express >>> ติดตั้ง express

