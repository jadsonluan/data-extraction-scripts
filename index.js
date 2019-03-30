var data;

Papa.parse('resources/horario20191.csv', {
	header: true,
	download: true,
	dynamicTyping: true,
	complete: function(results) {
		data = results.data;
		console.log(data);
	}
});
