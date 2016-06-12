// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Autotask
// Version : 1.1
////////////////////////////////////////////////////////////
// Will be called with botname to run as argm


module.exports= function run (){
	// print process.argv
	process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
	});
}
