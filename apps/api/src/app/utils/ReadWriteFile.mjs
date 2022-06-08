import fs from 'fs';

export default function ReadWriteFile(filename, content) {
	let Content = fs.readFileSync(
		filename,
		'utf8',
		function (error, fileContent) {
			if (error) throw error;
		}
	);
	let toWrite = Content + '\r\n' + content;
	fs.writeFileSync(filename, toWrite, function (error) {
		if (error) throw error;
	});
}
