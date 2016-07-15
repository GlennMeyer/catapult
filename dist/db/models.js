'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Foo = exports.Pub = exports.Employee = exports.User = exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('sequelize', 'username', 'password', {
	host: 'localhost',
	dialest: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

// sudo mysql
// CREATE DATABASE sequelize;
// CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
// GRANT ALL ON 'sequelize'.* to 'username@localhost';
// \q
// mysql -u username -p sequelize
// password

// Sequelize code follows
sequelize.authenticate().then(function (err) {
	console.log('Connection has been established successfully.');
}).catch(function (err) {
	console.log('Unable to connect to the database:', err);
});

// Define model 'user'
var User = sequelize.define('user', {
	firstName: {
		type: _sequelize2.default.STRING,
		field: 'first_name'
	},
	lastName: {
		type: _sequelize2.default.STRING,
		field: 'last_name'
	}
}, {
	freezeTableName: true,
	timestamps: true
});

// Create table 'user' and insert new user
User.sync({ force: true }).then(function () {
	return User.create({
		firstName: 'John',
		lastName: 'Hancock'
	}).then(function (john) {
		// Verify User was inserted
		console.log(john.get());
	});
});

// Define model 'employee' with custom getter & setter methods
var Employee = sequelize.define('employee', {
	name: {
		type: _sequelize2.default.STRING,
		allowNull: false,
		get: function get() {
			var title = this.getDataValue('title');

			return this.getDataValue('name') + ' (' + title + ')';
		}
	},
	title: {
		type: _sequelize2.default.STRING,
		allowNull: false,
		set: function set(val) {
			this.setDataValue('title', val.toUpperCase());
		}
	}
});

// Create 'employee' table and insert new employee, printing custom getter
Employee.sync({ force: true }).then(function () {
	Employee.create({ name: 'John Doe', title: 'senior engineer' }).then(function (employee) {
		console.log(employee.get('name'));
		console.log(employee.get('title'));
	});
});

// Define model 'pub' with validations

var Pub = sequelize.define('pub', {
	name: { type: _sequelize2.default.STRING },
	address: { type: _sequelize2.default.STRING },
	latitude: {
		type: _sequelize2.default.DOUBLE,
		allowNull: true,
		defaultValue: null,
		validate: { min: -90, max: 90 }
	},
	longitude: {
		type: _sequelize2.default.DOUBLE,
		allowNull: true,
		defaultValue: null,
		validate: { min: -180, max: 180 }
	}
}, {
	freezeTableName: true,
	validate: {
		bothCoordsOrNone: function bothCoordsOrNone() {
			if (this.latitude === null !== (this.longitude === null)) {
				throw new Error('Require either both latitude and longitude or nether');
			}
		}
	}
});

// Create 'pub' table
Pub.sync({ force: true }).then(function () {
	Pub.create({
		name: 'Draught House Pub & Brewery',
		address: '4112 Medical Pkwy, Austin, TX 78756',
		latitude: 30.311322,
		longitude: -97.742875
	}).then(function (pub) {
		console.log(pub.get());
	});
});

// Define model 'foo' with customizations
var Foo = sequelize.define('foo', {
	bar: {
		type: _sequelize2.default.STRING
	}
}, {
	timestamps: true,
	createdAt: false,
	updatedAt: 'updateTimestamp',
	deletedAt: 'destroyTime',
	paranoid: true,
	comment: 'I\'m a table comment!'

}).sync();

exports.sequelize = sequelize;
exports.User = User;
exports.Employee = Employee;
exports.Pub = Pub;
exports.Foo = Foo;