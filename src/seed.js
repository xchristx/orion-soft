import PocketBase from 'pocketbase';
// const PocketBase = require('pocketbase/cjs')
import { map as emissionData } from './db/emissions.js';
const pb = new PocketBase('http://31.220.49.30:8090');

// pb.collection('example').getFullList(200)

// authenticate as auth collection record
// pb.collection('users').authWithPassword('dukintosh@gmail.com', 'vn3jLSYU8pbxrkz');
// const userData = await pb.collection('users').authWithPassword('test@example.com', '123456');
// const adminData = await pb.collection('users').authWithPassword('dukintosh@gmail.com', 'vn3jLSYU8pbxrkz');

// const adminData = await pb.admins.authWithPassword('dukintosh@gmail.com', 'vn3jLSYU8pbxrkz')

// console.log(`Admindata: ${JSON.stringify(adminData)}`)
(async () => {
  pb.autoCancellation(false);
  emissionData.map(async el => {
    // example create data
    const data = {
      _id: el._id,
      category: el.category,
      name: el.name,
      emission_factor: el.emission_factor,
      chemical_formula_id: el.chemical_formula_id,
      unit_of_measurement: el.unit_of_measurement,
      countries: el.countries.toString(),
      years: el.years.toString(),
    };
    return pb.collection('emissions').create(data);
  });
  const records = await pb.collection('emissions').getFullList(200 /* batch size */, {
    sort: '-created',
  });
  console.log(`Records: ${JSON.stringify(records)}`);
  // (optional) send an email verification request
  // await pb.collection('users').requestVerification('test@example.com');
})();
