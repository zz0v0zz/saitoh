const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  if('OPTIONS' === req.method) {
    res.send(200)
  } else{
    next()
  }
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(allowCrossDomain)

const port = 3000
const mysql = require('mysql')

const pool = mysql.createPool({
  host: '172.17.0.3',
  user: 'tancow23',
  password: 'kerutaemon8'
})

function execute(sql) {
  return new Promise ((resolve, reject) => {
    pool.getConnection(function(error, connection) {

      connection.query(sql, function(err, result, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
        connection.release();
      });
    });
  });
}

app.get('/', (req, res) => {
  const param = req.query.param;
  const sql = `
    select
      crop_name
     ,variety_name
     ,cultivation_name
     ,process_name
     ,m_date_1.date_name as date_1
     ,m_date_2.date_name as date_2
     ,m_date_1.date_num as date_1_num
     ,m_date_2.date_num as date_2_num
    from
      api.crop crop
    inner join
      api.variety variety
    on crop.crop_id = variety.crop_id
    inner join
      api.cultivation cultivation
    on variety.variety_id = cultivation.variety_id
    and variety.crop_id = cultivation.crop_id
    inner join
      api.process process
    on cultivation.cultivation_id = process.cultivation_id
    and cultivation.variety_id = process.variety_id
    and cultivation.crop_id = process.crop_id
    inner join
      api.m_cultivation m_cultivation
    on cultivation.cultivation_id = m_cultivation.cultivation_id
    inner join
      api.m_process m_process
    on process.process_id = m_process.process_id
    inner join
      api.m_date m_date_1
    on process.start_date_id = m_date_1.date_id
    inner join
      api.m_date m_date_2
    on process.end_date_id = m_date_2.date_id
    where
      crop_name like '%${ param }%'
      or variety_name like '%${ param }%'
      or cultivation_name like '%${ param }%'
      or process_name like '%${ param }%'
    order by crop.crop_id, variety.variety_id, cultivation.cultivation_id, date_1_num
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.get('/crop', (req, res) => {
  const sql = `
    select
      crop_name
      ,crop_id
    from
      api.crop crop
    order by crop.crop_name
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.get('/variety', (req, res) => {
  const param = req.query.param;
  const sql = `
    select
      variety_name
      ,variety_id
    from
      api.crop crop
    inner join
      api.variety variety
    on crop.crop_id = variety.crop_id
    where
      variety.crop_id = ${ param }
    order by variety.variety_name
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.get('/m_cultivation', (req, res) => {
  const sql = `
    select
      cultivation_name
      ,cultivation_id
    from
      api.m_cultivation m_cultivation
    order by m_cultivation.cultivation_name
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.get('/m_process', (req, res) => {
  const sql = `
    select
      process_name
      ,process_id
    from
      api.m_process m_process
    order by m_process.process_name
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.get('/process', (req, res) => {
  const crop = req.query.crop;
  const variety = req.query.variety;
  const cultivation = req.query.cultivation;
  const sql = `
    select
     m_process.process_name
     ,m_process.process_id
     ,m_date_1.date_name as date_1
     ,m_date_2.date_name as date_2
     ,m_date_1.date_num as date_1_num
     ,m_date_2.date_num as date_2_num
    from
      api.crop crop
    inner join
      api.variety variety
    on crop.crop_id = variety.crop_id
    inner join
      api.cultivation cultivation
    on variety.variety_id = cultivation.variety_id
    and variety.crop_id = cultivation.crop_id
    inner join
      api.process process
    on cultivation.cultivation_id = process.cultivation_id
    and cultivation.variety_id = process.variety_id
    and cultivation.crop_id = process.crop_id
    inner join
      api.m_cultivation m_cultivation
    on cultivation.cultivation_id = m_cultivation.cultivation_id
    inner join
      api.m_process m_process
    on process.process_id = m_process.process_id
    inner join
      api.m_date m_date_1
    on process.start_date_id = m_date_1.date_id
    inner join
      api.m_date m_date_2
    on process.end_date_id = m_date_2.date_id
    where
      crop.crop_id = ${ crop }
      and variety.variety_id = ${ variety }
      and cultivation.cultivation_id = ${ cultivation }
    order by crop.crop_id, variety.variety_id, cultivation.cultivation_id, date_1_num
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.get('/date', (req, res) => {
  const sql = `
    select
     m_date.date_name
     ,m_date.date_id
    from
      api.m_date m_date
    order by m_date.date_id
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.post('/crop', (req, res) => {
  const crop_name = req.body.crop_name;
  const sql = `
    insert into api.crop
      (crop_name)
      values
      ('${crop_name}')
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.post('/variety', (req, res) => {
  const crop_id = req.body.crop_id;
  const variety_name = req.body.variety_name;
  const sql = `
    insert into api.variety
      (crop_id, variety_name)
      values
      (${crop_id}, '${variety_name}')
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.post('/m_cultivation', (req, res) => {
  const cultivation_name = req.body.cultivation_name;
  const sql = `
    insert into api.m_cultivation
      (cultivation_name)
      values
      ('${cultivation_name}')
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.post('/m_process', (req, res) => {
  const process_name = req.body.process_name;
  const sql = `
    insert into api.m_process
      (process_name)
      values
      ('${process_name}')
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.post('/cultivation', (req, res) => {
  const cultivation_id = req.body.cultivation_id;
  const crop_id = req.body.crop_id;
  const variety_id = req.body.variety_id;
  const sql = `
    insert ignore into api.cultivation
      (cultivation_id, crop_id, variety_id)
      values
      (${cultivation_id}, ${crop_id}, ${variety_id})
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.post('/process', (req, res) => {
  const process_id = req.body.process_id;
  const crop_id = req.body.crop_id;
  const variety_id = req.body.variety_id;
  const cultivation_id = req.body.cultivation_id;
  const start_date_id = req.body.start_date_id;
  const end_date_id = req.body.end_date_id;
  const sql = `
    insert into api.process
      (process_id, crop_id, variety_id, cultivation_id, start_date_id, end_date_id)
      values
      (${process_id}, ${crop_id}, ${variety_id}, ${cultivation_id}, ${start_date_id}, ${end_date_id})
      on duplicate key update
      start_date_id = values(start_date_id)
      ,end_date_id = values(end_date_id)
  `;
  execute(sql)
    .then((result) => {
      res.send(result);
    });
})

app.listen(3000, () => {
  console.log('Start server port:3000')
})
