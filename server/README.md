# Module 3 Branch
Search queries and jest tests.
## Queries
- <code>propertyName=value</code> || Returns the document where a property equals the value
- Comparisons
  - <code>propertyName[gt]=5</code> || Property value is greater than 5
  - <code>propertyName[gte]=5</code> || Property value is greater than or equal to 5
  - <code>propertyName[lt]=5</code> || Property value is less than 5
  - <code>propertyName[lte]=5</code> || Property value is less than or equal to 5
- <code>select=propertyOne,propertyTwo</code> || Returns only the properties named in a document
- Sorting
  - <code>sort=propertyName</code> || Sorts property in ascending order
  - <code>sort=-propertyName</code> || Sorts property in descending order
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
