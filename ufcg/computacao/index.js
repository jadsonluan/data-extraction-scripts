var data;

Papa.parse('/ufcg/computacao/csv/horario20191.csv', {
	header: true,
	download: true,
	dynamicTyping: true,
	complete: function(results) {
		data = results.data;
		data.sort((a, b) => (a.disciplina > b.disciplina) - (b.disciplina > a.disciplina));
		data = normalize(data);
		data = separateSubjectClass(data);
		console.log(data);
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

function separateSubjectClass(data) {
	var subject, classNum;
	var temp;
	for (var i = 0; i < data.length; i++) {
		temp = data[i].disciplina;
		subject = temp.slice(0, -3);
		classNum = temp.slice(-2);
		data[i].disciplina = subject;
		data[i].turma = classNum;
	}
	return data;
}