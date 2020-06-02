// import { Request, Response } from 'express';
// // import * as jsonServer from 'json-server';
// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router(__dirname + '/db.json')
// const middlewares = jsonServer.defaults()

// var multer = require('multer')
// var upload = multer({
//   dest: './uploads',
// })
//   .single('auctionimage')

// var fs = require('fs')

// // Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares)
// server.use(jsonServer.bodyParser)

// function uuid() {
//   return Math.ceil(Math.random() * 1000) + '-' + Date.now()
// }

// const sessions = {}

// server.post('/login', (req, res) => {
//   const { username, password } = req.body

//   const result = router.db.get('users')
//     .find({ username, password })
//     .value();

//   if (result) {

//     const sessionid = uuid()
//     sessions[sessionid] = result;

//     res.send({ result, sessionid })
//   } else {
//     res.status(403).send({ message: 'Wrong username password' })
//   }
// })


// // Add custom routes before JSON Server router
// server.get('/echo', (req, res) => {
//   res.jsonp(req.query)
// })

// // Upload
// server.get('/uploads/*', (req, res) => {
//   // res.send(req.path)
//   try {
//     fs.createReadStream(__dirname + req.path).pipe(res)
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// server.post('/upload', upload, async (req, res) => {
//   console.log(req.file)
//   try {
//     if (!req.file) {
//       res.send({
//         status: false,
//         message: 'No file uploaded'
//       });
//     } else {
//       //Use the name of the input field (i.e. "auctionImage") to retrieve the uploaded file

//       await fs.promises.rename('./' + req.file.path, __dirname + '/uploads/' + req.file.originalname)

//       // router.db.set('auctions/234', { id: 'placki' })

//       //send response
//       res.send({
//         status: true,
//         message: 'File is uploaded',
//         data: {
//           url: '/uploads/' + req.file.originalname,
//           name: req.file.originalname,
//           mimetype: req.file.mimetype,
//           size: req.file.size
//         }
//       });
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// })


// function getUser(req, res) {
//   const Authorization = req.headers.authorization;

//   const Session = sessions[Authorization]
//   console.log(Authorization, Session)
//   if (!Session) {
//     res.status(403).send({ err: 'No permission' })
//     throw 'Not authorized'
//   }
//   return Session
// }

// // To handle POST, PUT and PATCH you need to use a body-parser
// // You can use the one used by JSON Server
// server.use((req, res, next) => {
//   if (req.method === 'POST' && req.path !== '/login') {

//     const Session = getUser(req, res)

//     req.body.userId = Session.id
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

// // Use default router
// server.use(router)
// server.listen(9000, () => {
//   console.log('JSON Server is running, on Port ' + 9000)
// })


// import { Request, Response } from 'express';
// import * as jsonServer from 'json-server';
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(__dirname + '/db.json')
const middlewares = jsonServer.defaults()

var multer = require('multer')
var upload = multer({
  dest: './uploads',
})
  .single('auctionimage')

var fs = require('fs')

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use(jsonServer.bodyParser)

function uuid() {
  return Math.ceil(Math.random() * 1000) + '-' + Date.now()
}

const sessions = {}

server.post('/login', (req, res) => {
  const { username, password } = req.body

  const result = router.db.get('users')
    .find({ username, password })
    .value();

  if (result) {

    const sessionid = uuid()
    sessions[sessionid] = result;

    res.send({ result, sessionid })
  } else {
    res.status(403).send({ message: 'Wrong username password' })
  }
})


// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// Upload
server.get('/uploads/*', (req, res) => {
  // res.send(req.path)
  try {
    fs.createReadStream(__dirname + req.path).pipe(res)
  } catch (e) {
    res.status(500).send(e);
  }
});

server.post('/upload', upload, async (req, res) => {
  console.log(req.file)
  try {
    if (!req.file) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "auctionImage") to retrieve the uploaded file

      await fs.promises.rename('./' + req.file.path, __dirname + '/uploads/' + req.file.originalname)

      // router.db.set('auctions/234', { id: 'placki' })

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          url: '/uploads/' + req.file.originalname,
          name: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
})


function getUser(req, res) {
  const Authorization = req.headers.authorization;

  const Session = sessions[Authorization]
  console.log(Authorization, Session)
  if (!Session) {
    res.status(403).send({ err: 'No permission' })
    throw 'Not authorized'
  }
  return Session
}

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path !== '/login') {

    const Session = getUser(req, res)

    req.body.userId = Session.id
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(9000, () => {
  console.log('JSON Server is running, on Port ' + 9000)
})