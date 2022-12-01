/*
const dbConf = {
  host: '3.115.111.52',
  user: 'auction',
  password: 'tokoro',
  database: 'auction'
};
 */

// INSERT INTO users (US_name, US_login_id, US_password, US_gender, US_birthday, US_address, US_mail, US_tel, US_ban) VALUES("hal","hal","hal","M",19991212,"大阪市","hal@hal.ac.jp",09099998888,0);
// INSERT INTO makers (M_name) VALUES("hal");
// INSERT INTO color_systems (C_name) VALUES("hal");


/*
(async () =>{
  console.log(
    await require('./VehicleDao').insert("hal", 1, 3000, 1,4)
  );
})();
*/

/* 
(async () =>{
  console.log(
    await require('./UserDao').loginCheck("hal", "hal")
  );
})();
 */

// INSERT INTO vehicles (V_name, V_maker_id, V_mileage, V_color_system_id, V_transmission, V_body_type_id, V_delete_flag) VALUES('${name}', ${makerId}, ${mileage}, ${colorId}, ${transmission}, ${bodyTypeId}, 0)
// INSERT INTO vehicle_details (VD_vehicle_id, VD_passenger, VD_handle) VALUES('${rows.insertId}', ${passenger}, ${handle})


(async () =>{
  console.log(
    await require('./AuctionDao').findAll()
  );
})();
