function validateZip(req, res, next) {
    const zip = req.params.zip;
    const zipToNumber = Number(zip);
    const zipToString = zip.toString();
    const isNumber = /^\d+$/.test(zip);
    if(!isNumber || zipToString.length !== 5) {
      res.send(`Zip (${zipToString}) is invalid!`);
    } else {
      next();
    }
    
  }
  
  module.exports = validateZip;

