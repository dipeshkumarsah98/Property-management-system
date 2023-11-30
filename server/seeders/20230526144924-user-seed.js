'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const imagesArray = [
      'https://res.cloudinary.com/dcdhklrjc/image/upload/v1692612598/wwcrlzgwx04egdadyvbg.png',
      'https://media.istockphoto.com/id/1184625380/photo/large-modern-expensive-home.jpg?s=612x612&w=0&k=20&c=TuX7dnAQvrxt02_BMnlgtVMMdvBLmh3gcXL1bPnobP8=',
      'https://lovehomedesigns.com/wp-content/uploads/2022/01/cute-house-012522.jpg',
      'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg',
      'https://st.hzcdn.com/simgs/pictures/exteriors/builders-in-kochi-creo-homes-pvt-ltd-img~a751d25e0d2ef808_4-0254-1-cb5c87b.jpg',
    ];
    function encryPassword(pass) {
      const salt = bcrypt.genSaltSync(10, 'a');
      const password = bcrypt.hashSync(pass, salt);
      return password;
    }
    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
      },
    ]);

    await queryInterface.bulkInsert('users', [
      {
        name: 'dipesh',
        email: 'dipeshsah98@gmail.com',
        password: encryPassword('dipesh@123'),
        roleid: 1,
      },
      {
        name: 'keshav',
        email: 'keshav@gmail.com',
        password: encryPassword('keshav@123'),
        roleid: 1,
      },
    ]);

    await queryInterface.bulkInsert('property_type', [
      {
        name: 'flat',
      },
      {
        name: 'house',
      },
    ]);

    faker.seed(10); // it will help to generate same data in every machine

    const generateImageURL = () =>
      faker.image.urlLoremFlickr({
        category: 'product',
        width: 450,
        height: 560,
      });

    const createProperty = () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      location: faker.location.city(),
      size: faker.helpers.arrayElement(['1BHK', '2BHK', '3BHK', '4BHK']),
      amenities: faker.commerce.productAdjective(),
      status: faker.helpers.arrayElement(['rent', 'sale']),
      typeid: faker.helpers.arrayElement([2]),
      userid: faker.helpers.arrayElement([2]),
      price: faker.commerce.price({ dec: 0 }),
      images: faker.helpers.arrayElement(imagesArray),
    });
    const createProducts = (numbers = 5) => {
      return Array.from({ length: numbers }, createProperty);
    };
    // inserting dummy data into database
    await queryInterface.bulkInsert('properties', createProducts(20));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'properties',
      {},
      {
        restartIdentity: true,
        cascade: true,
        truncate: true,
      }
    );
    await queryInterface.bulkDelete(
      'property_type',
      {},
      {
        restartIdentity: true,
        truncate: true,
        cascade: true,
      }
    );
    await queryInterface.bulkDelete(
      'roles',
      {},
      {
        restartIdentity: true,
        truncate: true,
        cascade: true,
      }
    );
    await queryInterface.bulkDelete(
      'users',
      {},
      {
        restartIdentity: true,
        truncate: true,
        cascade: true,
      }
    );
  },
};
