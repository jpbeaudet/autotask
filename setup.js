// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Autotask
// Version : 1.1
////////////////////////////////////////////////////////////
// Will be called with botname as arg to setup a new bot


module.exports= function setup (){
	// print process.argv
	process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
	});
}
