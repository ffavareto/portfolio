const express = require('express')
const nunjucks = require('nunjucks')
const videos = require('./data')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req, res) => {
    const about = {
        avatarUrl: "https://avatars1.githubusercontent.com/u/56367529?s=460&u=8b48ad3c1dfc94a3476c9ef0f762bb24cef33591&v=4",
        name: "Lucas Santos",
        role: "Instrutor - Faculdade iv2",
        description: "Desenvolvedor Front-End Júnior, focado em ensinar iniciantes do desenvolvimento web, colaborador da <a href='https://faculdadeiv2.com.br' target='_blank'>Faculdade iv2</a>",
        links: [
            { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100038104997232" },
            { name: "GitHub", url: "https://github.com/ffavareto" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/lucassantos1998/" }
        ]
    }
    return res.render("about", { about })
})

server.get("/portfolio", (req, res) => {
    return res.render('portfolio', { items: videos })
})

server.get("/video", (req, res) => {
    const id = req.query.id

    const video = videos.find((video) => {
        return video.id == id
    })

    if (!video) {
        return res.send("video not found")
    }

    res.render("video", { item: video })
})

server.listen(5000, () => {
    console.log("Server started on port 5000")
})