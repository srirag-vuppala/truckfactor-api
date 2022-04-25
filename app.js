const express = require('express');
const app = express();
const port = 3001;

var exec = require('child_process').exec;

function get_name(url){
  return url.split("/").slice(-2).join('/')
}

app.get('/truck', (req, res) => {
    let url = req.query.giturl;
    let cmd = "./truckfactor-tool/get_truck_factor.sh "+url+" "+get_name(url)
    exec(cmd, function(error, stdout, stderr) {
      if (!error){
        //things worked
        res.send(stdout);
      }
      else {
        //failed
        res.send(":((");
        res.send(stderr);
      }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// sample query : http://localhost:3001/truck?giturl=https://github.com/aserg-ufmg/Truck-Factor