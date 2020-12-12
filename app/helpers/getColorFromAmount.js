module.exports = n => {
    if (n >= 16777215 ) return "ffffff"
  
    let hexVal = n.toString(16)
    hexVal = "0".repeat(6 - hexVal.length) + hexVal
    return hexVal
  }