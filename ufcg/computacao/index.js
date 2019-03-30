var data;

Papa.parse('resources/horario20191.csv', {
	header: true,
	download: true,
	dynamicTyping: true,
	complete: function(results) {
		data = results.data;
		data.sort((a, b) => (a.disciplina > b.disciplina) - (b.disciplina > a.disciplina));
		data = normalize(data);
		console.log(JSON.stringify(data[0]));
	}
});

function normalize(data) {
	var k = 0, result = [];
	for (var i = 1; i < data.length; i++) {
		if (data[i].disciplina == data[i-1].disciplina) {
			result.push(merge(data[i], data[i-1]));
		}
	}
	return result;
}

function merge(objA, objB) {
	for (var key in objA) {
		if (objA[key] != objB[key]) {
			var temp = objA[key];
			objA[key] = [temp, objB[key]];
		}
	}
	return objA;
}