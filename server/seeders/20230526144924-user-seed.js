'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    function encryPassword(pass) {
      const salt = bcrypt.genSaltSync(10, 'a');
      const password = bcrypt.hashSync(pass, salt);
      return password;
    }
    await queryInterface.bulkInsert('login_credentials', [
      {
        email: 'test1@gmail.com',
        password: encryPassword('test1@123'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'test2@gmail.com',
        password: encryPassword('test2@123'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'test3@gmail.com',
        password: encryPassword('test3@123'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'test4@gmail.com',
        password: encryPassword('test4@123'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'test5@gmail.com',
        password: encryPassword('test5@123'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('users', [
      {
        uuid: '28e23eb7-7210-4da9-9186-4934f607cee6',
        first_name: 'Jennie',
        last_name: 'Nichols',
        phone_number: '172-113-1711',
        date_of_birth: '2003/02/02',
        login_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid: '2259c347-56bb-4646-9fb3-022f817684b8',
        first_name: 'Raphaela',
        last_name: 'Hugnot',
        phone_number: '773-911-4967',
        date_of_birth: '2002/06/1',
        login_id: '2',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid: '2a2a19c3-0f3a-4465-88b0-6eb61098d42a',
        first_name: 'Betteanne',
        last_name: 'Measor',
        phone_number: '635-108-8397635-108-8397',
        date_of_birth: '2000/05/20',
        login_id: '3',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid: 'a1e07794-85fe-4625-8570-d402bcd0a68c',
        first_name: 'Keir',
        last_name: 'Salatino',
        phone_number: '340-499-1684',
        date_of_birth: '2000/01/01',
        login_id: '4',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid: '99784543-8915-468b-bbb4-15fb34793f16',
        first_name: 'Zitella',
        last_name: 'Sorsbie',
        phone_number: '748-396-5098',
        date_of_birth: '2000/01/21',
        login_id: '5',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'login_credentials',
      {},
      {
        restartIdentity: true,
        cascade: true,
        truncate: true,
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
