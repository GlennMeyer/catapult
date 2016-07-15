// Sequelize code follows
import Sequelize from 'sequelize';

const sequelize = new Sequelize('sequelize', 'username', 'password', {
	host: 'localhost',
	dialest: 'mysql',

	pool : {
		max: 5,
		min: 0,
		idle: 10000,
	},
});

// sudo mysql
// CREATE DATABASE sequelize;
// CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
// GRANT ALL ON 'sequelize'.* to 'username@localhost';
// \q
// mysql -u username -p sequelize
// password

sequelize
	.authenticate()
	.then((err) => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.log('Unable to connect to the database:', err);
	});

// Define model 'user'
const User = sequelize.define('user', {
	firstName: {
		type: Sequelize.STRING,
		field: 'first_name',
	},
	lastName: {
		type: Sequelize.STRING,
		field: 'last_name',
	},
}, {
	freezeTableName: true,
	timestamps: true,
});

// Create table 'user' and insert new user
User.sync({force: true}).then(() => {
	return User.create({
		firstName: 'John',
		lastName: 'Hancock'
	}).then((john) => {
		// Verify User was inserted
		console.log(john.get());
	})
});

// Define model 'employee' with custom getter & setter methods
const Employee = sequelize.define('employee', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		get: function(){
			let title = this.getDataValue('title');

			return `${this.getDataValue('name')} (${title})`;
		}
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		set: function(val) {
			this.setDataValue('title', val.toUpperCase());
		}
	}
});

// Create 'employee' table and insert new employee, printing custom getter
Employee.sync({force: true}).then(() => {
	Employee
		.create({name: 'John Doe', title: 'senior engineer'})
		.then((employee) => {
			console.log(employee.get('name'));
			console.log(employee.get('title'));
		});
});

// Define model 'pub' with validations

const Pub = sequelize.define('pub', {
	name: { type: Sequelize.STRING },
	address: { type: Sequelize.STRING },
	latitude: {
		type: Sequelize.DOUBLE,
		allowNull: true,
		defaultValue: null,
		validate: {min: -90, max: 90}
	},
	longitude: {
		type: Sequelize.DOUBLE,
		allowNull: true,
		defaultValue: null,
		validate: {min: -180, max: 180}
	}
}, {
	freezeTableName: true,
	validate: {
		bothCoordsOrNone: function() {
			if ((this.latitude === null) !== (this.longitude === null)) {
				throw new Error('Require either both latitude and longitude or nether');
			} 
		}
	}
})

// Create 'pub' table
Pub.sync({force: true}).then(() => {
	Pub.create({
			name: 'Draught House Pub & Brewery',
			address: '4112 Medical Pkwy, Austin, TX 78756',
			latitude: 30.311322,
			longitude: -97.742875
		})
		.then((pub) => {
			console.log(pub.get());
		});
})

// Define model 'foo' with customizations
const Foo = sequelize.define('foo', {
	bar: {
		type: Sequelize.STRING
	}
}, {
	timestamps: true,
	createdAt: false,
	updatedAt: 'updateTimestamp',
	deletedAt: 'destroyTime',
	paranoid: true,
	comment: 'I\'m a table comment!'

}).sync();

export {sequelize, User, Employee, Pub, Foo};