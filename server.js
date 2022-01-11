const exp = require('express');
const app = exp();
const port = 8080;

app.use(exp.static('./', { extensions: 'html' }));

app.listen(port, () => {

    console.log(`Listening on port ${port}`);

});