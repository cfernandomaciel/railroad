
const portscanner = require('portscanner');

const time = Math.floor(1000 + Math.random() * 9000);


setTimeout(() => {
	portscanner.findAPortNotInUse(15000, 16000, "localhost", (error, port) => {
		if (error) throw new Error(error);
	
		console.log('>>>> starting server at port ', port);
		
		require('child_process').spawn('node', ['server.js', process.argv[2], process.argv[3]], {
			env: {
				PORT: port
			},
			stdio: 'inherit'
		})

	});
	
}, time);
	
