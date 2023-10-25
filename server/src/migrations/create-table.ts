import sequelize from 'config/database.config';

const createRoleTable = async () => {
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS roles(
        id  serial PRIMARY KEY,
        name varchar (200) unique,
        description varchar (200),
        createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
        )
     `);
};

const createUsertable = async () => {
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        id  serial PRIMARY KEY,
        name varchar (200),
        email varchar (200) unique,
        refresh_token text,
        password varchar (255),
        roleId int references roles(id),
        createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
        )
     `);
};

const createPropertyTypeTable = async () => {
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS property_type (
        id  serial PRIMARY KEY,
        name varchar (200) unique,
        description varchar (200),
        createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
        )
     `);
};

const createPropertyTable = async () => {
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id  serial PRIMARY KEY,
        location varchar (500),
        description varchar (200),
        price Int,
        size varchar (200),
        amenities varchar (200),
        status varchar (200),
        images varchar (200),
        typeId int references property_type(id),
        userId int references users(id),
        createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
        )
     `);
};
const createInquiryTable = async () => {
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id  serial PRIMARY KEY,
        subject varchar (500),
        content varchar,
        date date,
        userId int references users(id),
        createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
        )
     `);
};

const createAppointmentTable = async () => {
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id  serial PRIMARY KEY,
        agentId int references users(id),
        propertyId int references properties(id),
        clientId int references users(id),
        date date,
        createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
        )
     `);
};

const createFollowupTable = async () => {
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS follow_ups (
        id  serial PRIMARY KEY,
        date date,
        notes varchar(1024),
        appointmentId int references appointments(id),
        createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
        )
     `);
};
const createLeadTable = async () => {
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id  serial PRIMARY KEY,
        details varchar(1024),
        status varchar(1024),
        appointmentId int references appointments(id),
        createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
        )
     `);
};
const createReviewTable = async () => {
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id  serial PRIMARY KEY,
        message varchar(1024),
        userId int references users(id),
        propertyId int references properties(id),
        createdAt TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updatedAt TIMESTAMPTZ DEFAULT NOW() NOT NULL
        )
     `);
};
export default async function createTable() {
  await createRoleTable();
  await createUsertable();
  await createPropertyTypeTable();
  await createPropertyTable();
  await createInquiryTable();
  await createAppointmentTable();
  await createFollowupTable();
  await createLeadTable();
  await createReviewTable();
}
