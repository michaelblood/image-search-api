image-search-api
=====
an implementation of the FreeCodeCamp Image Search Abstraction Layer project.

Getting started
-----
Requires node.js and mongoDB.
```
git clone https://github.com/michaelblood/image-search-api.git
cd image-search-api
```
For the search to work, you will need an API key from [Google CSE](https://cse.google.com/cse/). Once a key is obtained, you can use it by running the following command:

```
echo '{"API_KEY": "YOUR_API_KEY"}' > config.json
```

To install dependencies, run the following command:

```npm install```

Then, to start the server:

```npm start```

Using the API
-----
You can find information about using the API at the [demo version of the site](mb-img.herokuapp.com).