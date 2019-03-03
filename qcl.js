let config = require("./config");
let pjson = require("./package.json");

// Colors
require("colors");

console.log("Quantum Conundrum Leaderboards".magenta);
console.log("  by ".magenta + "Z".green + "emanz" + "o".green);
console.log((new Date()).toString().magenta);

// SRC API requests
let request = require("request");

function srcApiRequest(params){
	let options = {
		url: `https://www.speedrun.com/api/v1/${params}`,
		headers: {
			"User-Agent": `quantum-condundrum-leaderboards/${pjson.version}`
		}
	};

	return new Promise(function(resolve, reject) {
		request(options, function(error, response, body) {
			if (
				(error && response.statusCode === 200)
				||
				(body.substr(0,1) === '<' && response.statusCode === 200)
			) {
				reject(error, response);
			} else {
				try {
					resolve(JSON.parse(body));
				} catch {
					console.error(currentHourString() + "Request body is not JSON")
				}
			}
		});
	});
}

function getLevelRuns(levelId){
	return srcApiRequest(`runs?level=${levelId}&status=verified`);
}

// Database
let sqlite3 = require("better-sqlite3");
let db = new sqlite3(config.database.path);
let wings;

// Add levels, this does assume levels are ordered correctly in the data returned from the API
let dataReady = new Promise((resolve, reject)=>{
	db.prepare(`
		CREATE TABLE IF NOT EXISTS levels (
			id INTEGER UNIQUE,
			apiId TEXT,
			wing TEXT,
			wingId TEXT,
			title TEXT,
			speedruncomLink TEXT,
			steamtimeLink INTEGER,
			steamshiftLink INTEGER,
			PRIMARY KEY("id")
		)
		`).run();

	let levelCount = db.prepare("SELECT Count(*) FROM levels").get();

	if (levelCount['Count(*)'] === 0) {
		console.log(currentHourString() + ' No levels found in database. Fetching data...'.yellow);

		return srcApiRequest("games/9d3eqg1l/levels")
			.then((body) => {
				let levels = body;
				let ilData = require("./il-data.json");

				console.log("YAAA".green, levels);

				db.prepare("BEGIN TRANSACTION").run();

				for (let i = 0; i < levels.data.length; i++){
					let level = levels.data[i];
					db.prepare(
						`INSERT OR ABORT INTO levels (
							id,
							apiId,
							wing,
							wingId,
							title,
							speedruncomLink,
							steamtimeLink,
							steamshiftLink
							) VALUES(?,?,?,?,?,?,?,?)`,
					).run([
						i,
						level.id,
						ilData.data[i].wing,
						ilData.data[i].levelID,
						level.name,
						level.weblink,
						`http://steamcommunity.com/stats/Quantum%20Conundrum/leaderboards/${ilData.data[i].speedUrl}`,
						`http://steamcommunity.com/stats/Quantum%20Conundrum/leaderboards/${ilData.data[i].shiftsUrl}`
					]);
				}

				db.prepare("COMMIT TRANSACTION").run();

				console.log(currentHourString() + ' Levels successfully added to database!'.green);

				return resolve();
			}
		)
		.catch((error) => {
			console.log(currentHourString() + ' Something went wrong when adding levels to the database... :/'.red);
			console.log(currentHourString() + error);

			return reject();
		});
	} else {
		console.log(currentHourString() + ' Levels already in database!'.green, levelCount);

		return resolve();
	}
})
.then(()=>{
	// Build wings
	wings = [
		{
			title: "BLUE WING",
			className: "blue",
			levels: []
		},
		{
			title: "YELLOW WING",
			className: "yellow",
			levels: []
		},
		{
			title: "RED WING",
			className: "red",
			levels: []
		},
		{
			title: "UBER IDS",
			className: "uberids",
			levels: []
		},
		{
			title: "THE DESMOND DEBACLE",
			className: "desmonddebacle",
			levels: []
		},
		{
			title: "IKE-ARAMBA!",
			className: "ikearamba",
			levels: []
		},
	];

	let levels = db.prepare("SELECT * FROM levels").all();

	for (level of levels){
		level.number = pad(level.id + 1,2)
		let wingIndex = wings.findIndex(wing => wing.className === level.wing);
		wings[wingIndex].levels.push(level);
	}

	console.log(currentHourString() + ' Adding runs...'.yellow);

	// Add runs
	db.prepare(`
		CREATE TABLE IF NOT EXISTS runs (
			apiId TEXT UNIQUE,
			levelId TEXT,
			userId TEXT,
			lagAbuse INTEGER,
			time REAL,
			date TEXT,
			PRIMARY KEY("apiId")
		)
		`).run();

	let runPromises = [];

	db.prepare("BEGIN TRANSACTION").run();

	// for (level of levels){
	// 	runPromises.push(
	// 		getLevelRuns(level.apiId)
	// 			.then((body) => {
	// 				let runs = body.data;

	// 				for (run of runs){
	// 					db.prepare(
	// 						`INSERT OR REPLACE INTO runs (
	// 							apiId,
	// 							levelId,
	// 							userId,
	// 							lagAbuse,
	// 							time,
	// 							date
	// 							) VALUES(?,?,?,?,?,?)`,
	// 					).run([
	// 						run.id,
	// 						run.level,
	// 						run.players[0].id,
	// 						(run.values["r8rg5zrn"] === "5q8ze9gq" ? 0 : 1), // lag abuse, "5q8ze9gq" is NO lag abuse used.
	// 						parseFloat(run.times.primary_t),
	// 						run.date || run.submitted.substr(0, run.submitted.indexOf("T"))
	// 					]);
	// 				}

	// 				return true;
	// 			},
	// 			(error) => {
	// 				return error;
	// 			})
	// 			.catch((error)=>{
	// 				console.log(error);
	// 			})
	// 	);
	// }

	// return Promise.all(runPromises);
	return true;
}).then(() => {
	db.prepare("COMMIT TRANSACTION").run();

	// Add users
	console.log(currentHourString() + ' Adding users...'.yellow);

	db.prepare(`
		CREATE TABLE IF NOT EXISTS users (
			userId TEXT UNIQUE,
			userName TEXT,
			webLink TEXT,
			PRIMARY KEY("userId")
		)
		`).run();

	db.prepare("BEGIN TRANSACTION").run();

	// Get all unique users with a run
	let userPromises = [];
	let users = db.prepare(`SELECT DISTINCT userId FROM runs`).all();
	for (user of users) {
		userPromises.push(
			srcApiRequest(`users/${user.userId}`)
				.then((response) => {
					response = response.data;
					db.prepare(
						`INSERT OR REPLACE INTO users (
							userId,
							userName,
							webLink
						) VALUES(?,?,?)`,
					).run([
						response.id,
						response.names.international,
						response.weblink
					]);
				})
		);
	}
}).then(() => {
	db.prepare("COMMIT TRANSACTION").run();
});

/* Express connections */
let mustacheExpress = require("mustache-express");
let express = require("express");
let compression = require("compression");
let app = express();

app.use(compression());
app.use(express.static(__dirname + "/public"));
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
if (!config.express.cache) app.disable("view cache");
app.set("views", __dirname + "/templates");

let bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

app.get("/", function (req, res) {
	res.render("index");
});

app.get("/chambers", function (req, res) {
	res.redirect('/individual-levels');
});

app.get("/individual-levels", function (req, res) {
	// get runs
	let runs = db.prepare(`
		SELECT levelId, userId, min(time)
		FROM runs r
		WHERE r.apiId IN (
			SELECT apiId
			FROM runs
			WHERE levelId = r.levelId AND lagAbuse = 0
		)
		GROUP BY levelId, userId
		ORDER BY time
	`).all();

	let runDictionary = {};
	for (run of runs) {
		if (!runDictionary[run.levelId]) runDictionary[run.levelId] = [];
		runDictionary[run.levelId].push(run);
	}

	// get users
	let users = db.prepare(`SELECT * FROM users`).all();
	let userDictionary = {};
	for (user of users) {
		userDictionary[user.userId] = user;
	}

	// fill wings with above data
	for (wing of wings) {
		for (level of wing.levels) {
			level.records = {
				time: []
			};

			if (runDictionary[level.apiId]){
				for (records of runDictionary[level.apiId]){
					level.records.time.push(
						{
							time: records["min(time)"].toFixed(2),
							user: {
								name: records.userId ? userDictionary[records.userId].userName : "NULL"
							}
						}
					);
				}
			}
		}
	}

	res.render("individual-levels", { wings });
});

app.get("/about", function (req, res) {
	res.render("about");
});

dataReady.then(()=>{
	let server = app.listen(config.express.port, function () {
		let port = server.address().port;
		console.log(currentHourString()+" EXPRESS: Listening at port %s", port);
	});
});

function pad(num,size) {
	let s = "000000000" + num;
	return s.substr(s.length-size);
}

function currentHourString(){
	let date = new Date();
	return "["+pad(date.getHours(),2)+":"+pad(date.getMinutes(),2)+"]";
}


// let wings = [
// 	{
// 		title: "BLUE WING",
// 		className: "blue",
// 		levels: [
// 			{
// 				title: "Hall of Wonders",
// 				number: "01",
// 				id: "WingA15",
// 				records: {
// 					time: [
// 						{
// 							time: "29.90",
// 							user: {
// 								name: "Fatal"
// 							}
// 						},
// 						{
// 							time: "30.48",
// 							user: {
// 								name: "LagMasterSam"
// 							}
// 						}
// 					],
// 					shift: {
// 						amount: "0 shifts",
// 						unset: true
// 					}
// 				}
// 			},
// 			{
// 				title: "A Fluffy Journey of Discovery",
// 				number: "05",
// 				id: "WingA11",
// 				records: {
// 					time: [
// 						{
// 							time: "40.28",
// 							user: {
// 								name: "Leji"
// 							}
// 						},
// 						{
// 							time: "40.57",
// 							user: {
// 								name: "Zemanzo"
// 							}
// 						},
// 						{
// 							time: "42.07",
// 							user: {
// 								name: "Fatal"
// 							}
// 						}
// 					],
// 					shift: {
// 						amount: "5 shifts",
// 						user: {
// 							name: "Schlepian"
// 						}
// 					}
// 				}
// 			},
// 		]
// 	}
// ];
