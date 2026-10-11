// server.js
const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// baseUrl dipakai untuk meta tag share (WhatsApp/Instagram).
// Saat deploy, set env BASE_URL=https://domainmu.com
app.use((req, res, next) => {
  res.locals.baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`
  next()
})

app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))

app.get('/', (req, res) => res.render('home', { active: 'home', profilePic: '/uploads/profile.png' }))
app.get('/analytics', (req, res) => res.render('analytics', { active: 'analytics' }))
app.get('/about', (req, res) => res.render('about', { active: 'about' }))
app.get('/terms', (req, res) => res.render('terms', { active: 'terms' }))
app.get('/admin', (req, res) => res.render('admin', { active: 'admin' }))

// 404
app.use((req, res) => res.status(404).render('404', { active: '' }))

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
