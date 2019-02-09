let config = require("./config");
let pjson = require("./package.json");

/* Colors */
let colors = require("colors");

console.log("Quantum Conundrum Leaderboards".magenta);
console.log("  by ".magenta + "Z".green + "emanz" + "o".green);
console.log((new Date()).toString().magenta);

/* SRC API requests */
let request = require("request");

function srcApiRequest(params, callback){
	let options = {
		url: `https://www.speedrun.com/api/v1/${params}`,
		headers: {
			"User-Agent": `quantum-condundrum-leaderboards/${pjson.version}`
		}
	};

	request(options, callback);
}

/* Database */
let sqlite3 = require("better-sqlite3");
let db = new sqlite3(config.database.path);

// Add levels, this does assume levels are ordered correctly in the data returned from the API
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
	console.log(currentHourString() + ' No levels found in database. Fetching data..'.yellow);

	srcApiRequest("games/9d3eqg1l/levels", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			let levels = JSON.parse(body);
			let ilData = require("./il-data.json");

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
		}
	});
} else {
	console.log(currentHourString() + ' Levels already in database!'.green, levelCount);
}

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

let wings = [
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
	let wingIndex = wings.findIndex(wing => wing.className === level.wing);
	wings[wingIndex].levels.push(level);
}

console.log(wings[0].levels)

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

app.get("/chambers", function (req, res) {
	res.redirect('/individual-levels');
});

app.get("/individual-levels", function (req, res) {
	res.render("individual-levels", { wings });
});

let server = app.listen(config.express.port, function () {
	let port = server.address().port;
	console.log(currentHourString()+" EXPRESS: Listening at port %s", port);
});

function pad(num,size) {
    let s = "000000000" + num;
    return s.substr(s.length-size);
}

function currentHourString(){
	let date = new Date();
	return "["+pad(date.getHours(),2)+":"+pad(date.getMinutes(),2)+"]";
}
