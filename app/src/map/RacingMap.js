const VERSION_MIN = 1;
const VERSION_MAX = 1;
const DESCRIPTOR = {
	Road: ['Type', 'Position', 'Align'],
	StartPoint: ['Position'],
	CheckPoint: ['Position'],
	EndPoint: ['Position']
};

class RacingMap {
	constructor(mapInfo) {

	}

	static parse(mapSource) {
		const map = {
			Map: {},
			Road: {
				StartPoint: undefined,
				CheckPoint: [],
				EndPoint: undefined,
				Road: []
			},
			Props: {
				Props: []
			}
		};

		let context = '';
		const source = mapSource.match(/[^\r\n]+/g);

		const versionTag = source.shift();
		if(versionTag.slice(0, 16) !== 'Drift Race Map v') throw new Error("Invalid Map Format!");

		const version = parseInt(versionTag.slice(16));
		if(!isFinite(version) || version < VERSION_MIN || VERSION_MAX < version)
			throw new Error("Unsupported Version!");

		source.forEach((line, lineno) => {
			const contextMatch = line.match(/^\[([a-zA-Z]+)\]$/);
			if(contextMatch) {
				context = contextMatch[1];
				return;
			}

			const keyValueMatch = line.match(/^([a-zA-Z]+)\=(.*)$/)
			if(keyValueMatch) {
				let value = keyValueMatch[2];
				value = isFinite(parseInt(value)) ? parseInt(value) : value;

				map[context][keyValueMatch[1]] = value;

				return;
			}

			const objectMatch = line.match(/^([a-zA-Z]+)\(([^\)]+)\)$/);
			if(objectMatch) {
				const type = objectMatch[1];
				const rawArgs = objectMatch[2].split(';');

				const object = {};
				if(DESCRIPTOR[type].length !== rawArgs.length)
					throw new Error(`Invalid Arguments Supplied at Line ${lineno}`);

				DESCRIPTOR[type].forEach((descriptorName, argIndex) => {
					let value = rawArgs[argIndex];

					if(value.split(',').length > 1) {
						value = value.split(',');
						value = value.map(v => isFinite(parseInt(v)) ? parseInt(v) : v);

					} else if(isFinite(parseInt(value))) {
						value = parseInt(value);
					}

					object[descriptorName] = value;
				});

				if(Array.isArray(map[context][type])) {
					map[context][type].push(object);
				} else {
					map[context][type] = object;
				}
			}
		});

		return new RacingMap(map);
	}
}

module.exports = RacingMap;
