// server.js
const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// set view engine ke EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use(express.static(path.join(__dirname, 'public')))


app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))

// ROUTE: Home
app.get('/', (req, res) => {
  res.render('home', {
    active: 'home',
    profilePic: '/uploads/profile.png'
  })
})

// ROUTE: Analytics
app.get('/analytics', (req, res) => {
  res.render('analytics', { active: 'analytics' })
})

// ROUTE: About
app.get('/about', (req, res) => {
  res.render('about', { active: 'about' })
})

// ROUTE: Terms of Use
app.get('/terms', (req, res) => {
  res.render('terms', { active: 'terms' })
})

// jalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log('Serving static files from:', path.join(__dirname, 'public'))
})