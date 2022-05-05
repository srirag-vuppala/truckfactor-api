const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var exec = require('child_process').exec;

function get_name(url){
  return url.split("/").slice(-2).join('/')
}

app.get('/truck', (req, res) => {
    let url = req.query.giturl;
    let cmd = "./get_truck_factor.sh "+url+" "+get_name(url)
    exec(cmd, function(error, stdout, stderr) {
      if (!error){
        //things worked
        let output = stdout.split("\n");
        res.send(output);
      }
      else {
        //failed
        res.send(":(( " + error);
        // res.send(stderr);
      }
    })
})


app.get('/', (req, res) => {
  res.send("server is up")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// sample query : http://localhost:3001/truck?giturl=https://github.com/aserg-ufmg/Truck-Factor

/**
TF = 1 (coverage = 30.43%) TF authors (Developer;Files;Percentage): Cameron Toy;76;82.61 

tf_result = {
  tf: 2,
  coverage = 30.43,
  tf_authors = [
    {
      dev: Cameron Toy,
      num_files: 76,
      percentage: 82.61
    },
    {
      dev: Srirag V,
      num_files: 100,
      percentage: 50
    }
  ]
}

 * 
 */