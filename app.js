const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var exec = require('child_process').exec;

function get_name(url){
  return url.split("/").slice(-2).join('/')
}

function form_result(data){
	data = data.filter(e => { return e !== '';})
  let tem = data[0].split(" ")
  let TF = tem[2]
  let coverage = (tem.pop()).slice(0,4)
  let tf_authors = []
  data.slice(1).forEach((element) => {
  	let temp = element.split(";")
    tf_authors.push({'dev': temp[0], 'num_files': temp[1], 'percentage': temp[2]})
  }) 
  
  let tf_result = {
    'tf': TF,
    'coverage': coverage,
    'tf_authors': tf_authors,
    // 'raw_data': data
  }
  return tf_result
}

app.get('/truck', (req, res) => {
    let url = req.query.giturl;
    let cmd = "./get_truck_factor.sh "+url+" "+get_name(url)
    exec(cmd, function(error, stdout, stderr) {
      if (!error){
        //things worked
        let indexer = 0;
        for (let [idx, item] of stdout.split("\n").entries()){
          if (item.split(' ')[0] === 'TF') {
            indexer = idx;
            break;
          }
        }
        let output = stdout.split("\n").slice(indexer);
        res.send(form_result(output));
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