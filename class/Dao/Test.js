

// INSERT INTO users (US_name, US_login_id, US_password, US_gender, US_birthday, US_address, US_mail, US_tel, US_ban) VALUES("hal","hal","hal","M",19991212,"大阪市","hal@hal.ac.jp",09099998888,0);
// INSERT INTO makers (M_name) VALUES("hal");
// INSERT INTO color_systems (C_name) VALUES("hal");


(async () =>{
  console.log(
    await require('./VehicleDao').insert("hal", 1, 3000, 1,4)
  );
})();