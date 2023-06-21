// const fs = require('fs');

// // read data file
// const tours_data = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.checkID = (req, res, next, val) => {
//   if (+req.params.id > tours_data.length) return FailPage(res, 'Invalid ID', 404);
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   console.log(req.body);
//   if (!req.body.name || !req.body.price) return FailPage(res, 'the body is empty', 400);
//   next();
// };

// const FailPage = function (res, massage, statusCode) {
//   return res.status(statusCode).json({
//     status: 'fail',
//     massage: massage,
//   });
// };

// exports.getAllTours = (req, res) => {
//   console.log(req.requestTime);
//   res.status(200).json({
//     status: 'success',
//     Time: req.requestTime,
//     results: tours_data.length,
//     data: {
//       tours: tours_data,
//     },
//   });
// };
// exports.createNewTour = (req, res) => {
//   const newID = tours_data[tours_data.length - 1].id + 1;
//   const newTorus = Object.assign({ id: newID }, req.body);

//   console.log(newTorus);

//   tours_data.push(newTorus);
//   fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours_data), (err) => {

//   });
//   res.status(201).json({
//     status: 'sucess',
//     data: {
//       tour: newTorus,
//     },
//   });
// };
// exports.findTour = (req, res) => {
//   console.log(req.params);

//   const id = +req.params.id;
//   const tour = tours_data.find((el) => el.id === id);

//   res.status(200).json({
//     status: 'sucess',
//     data: {
//       tour,
//     },
//   });
// };
// exports.updateTour = (req, res) => {
//   res.status(200).json({
//     status: 'sucess',
//     data: {
//       tour: '<Update tour here ...>',
//     },
//   });
// };
// exports.deleteTour = (req, res) => {
//   res.status(204).json({
//     status: 'sucess',
//     data: null,
//   });
// };
