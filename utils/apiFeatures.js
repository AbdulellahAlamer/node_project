class apiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  // ALL Examples : (127.0.0.1:8000/api/v1/tours?page=2&duration[lt]=5&rating[gte]=4.8)
  filter() {
    const queryObj = { ...this.queryString }; // use method to make a copy (not a refrence)
    // e.x. queryObj is like this :
    // { page : 2 , duration : {"lt" : "5"},  rating {"lt" : "4.8"}}
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    // below is called (regular expressions)
    // it convrt e.x. (gt) to ($gt)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // Example (127.0.0.1:8000/api/v1/tours?sort=duration)
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    // Example (127.0.0.1:8000/api/v1/tours?fields=name,duration)
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = apiFeatures;
