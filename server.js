const { createServer } = require("http");
const querystring = require("querystring");
const search = require("./search");

const server = createServer((req, res) => {
  switch (req.method) {
    case "GET":
      return handleGetRequest(req, res);
  }
});

const handleGetRequest = (req, res) => {
  const url = new URL(`http://localhost:8080${req.url}`);
  const path = url.pathname;
  // console.log(url);
  if (path === "/search") {
    const params = querystring.parse(url.search.slice(1));
    const key = params.key;
    // console.log("search key: ", key);
    search(key).then((result) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const json = JSON.stringify(result);
      return res.end(json);
    });
  }
};

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`server listining on port ${PORT}`);
});
