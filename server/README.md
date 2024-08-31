# Game & Studio DB Server
Search queries and jest tests.
## Queries
- `propertyName=value` || Returns the document where a property equals the value
- Comparisons
  - `propertyName[gt]=5` || Property value is greater than 5
  - `propertyName[gte]=5` || Property value is greater than or equal to 5
  - `propertyName[lt]=5` || Property value is less than 5
  - `propertyName[lte]=5` || Property value is less than or equal to 5
- `select=propertyOne,propertyTwo` || Returns only the properties named in a document
- Sorting
  - `sort=propertyName` || Sorts property in ascending order
  - `sort=-propertyName` || Sorts property in descending order
## Testing
Testing is done with Jest, Supertest, and mongodb-memory-server. The testing file is located at app/controllers/gameController.test.js
## Dependencies
- express
- dotenv
- mongoose
- morgan
## Dev Dependencies
- nodemon
- jest
- supertest
- mongodb-memory-server

To install dependencies, use <code>npm install</code> in the terminal. To install dependencies manually, use <code>npm install (dependency name)</code>.
## Run the server
After installing dependencies..<br>
<code>npm run start</code> or <code>npm run dev</code> (If nodemon is installed)
