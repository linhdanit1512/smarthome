'use strict'

var mongoose = require('./connection');
// require('./device');
// require('./user');
// require('./room');

var schemaDeviceInRoom = new mongoose.Schema({
  device : {type : mongoose.Schema.Types.ObjectId, require : true, ref : 'Device'},
  room : {type : mongoose.Schema.Types.ObjectId, ref : 'Room'},
  user : {type : mongoose.Schema.Types.ObjectId, require : true, ref : 'User'},
  device_name : {type : String},
  status : {type : Boolean, require : true}});

var DeviceInRoom = mongoose.model('DeviceInRoom', schemaDeviceInRoom, 'DEVICEINROOM');

/**
Tìm kiếm dựa vào _id của deviceInRoom (kiểu ObjectId)
*/
DeviceInRoom.findBy_ID = (_ID) =>{
  return new Promise((resolve, reject) =>{
    DeviceInRoom.findById(new mongoose.Types.ObjectId(_ID), (error, data) =>{
      if(error){
        return reject(new Error('Cannot get data!' + '\n' + error));
      }else{
        return resolve(data);
      }
    });
  });
};

DeviceInRoom.getDeviceInRoom = (roomID) =>{
  return new Promise((resolve, reject) =>{
    DeviceInRoom.find({'room' : new mongoose.Types.ObjectId(roomID)})
    // .populate('room')
    .populate('device')
    // .populate('user')

    .exec((err, data) =>{
      if(err) {return reject(new Error(err));}
      return resolve(data);
    });
  });
}
// DeviceInRoom.getDeviceInRoom('5ab5bcba66a8743898db512c').then(data => console.log(JSON.stringify(data)), err =>console.log(err.toString()));

DeviceInRoom.unused = (userID) =>{
  return new Promise((resolve, reject) =>{
    DeviceInRoom.find({'user' : new mongoose.Types.ObjectId(userID)})
    .or([{'room' : null}, {'room' : { $exists: false }}])
    .populate('device')
    .exec((err, data) =>{
      if(err) {return reject(new Error(err));}
      return resolve(data);
    });
  });
}

// DeviceInRoom.unused('5ab3333038b9043e4095ff84').then(data => console.log(JSON.stringify(data)), err =>console.log(err.toString()));

DeviceInRoom.search = (data) =>{
  return new Promise((resolve, reject) =>{
    DeviceInRoom.find({
      'device_name': {$regex: data.device_name},
      'room' : new mongoose.Types.ObjectId(data.room),
      'user' : new mongoose.Types.ObjectId(data.user)})
      .exec((err, data) =>{
      if(err) return reject(new Error('Cannot get data!' + '\n' + err.toString()));
      return resolve(data);
    });
  });
}

// DeviceInRoom.search({'device_name' : 'den'}).then(data => console.log(JSON.stringify(data)), err =>console.log(err.toString()));

DeviceInRoom.findByUser = (userID) =>{
  return new Promise((resolve, reject) =>{
    DeviceInRoom.find({'user': new mongoose.Types.ObjectId(userID)})
    .exec((error, data) =>{
      if(error){
        return reject(new Error('Cannot get data!' + '\n' + err));
      }else{
        return resolve(data);
      }
    });
  });
}

DeviceInRoom.mInsert = (data) =>{
  return new Promise((resolve, reject) =>{

    let mDeviceInRoom = new DeviceInRoom();
    mDeviceInRoom.device = new mongoose.Types.ObjectId(data.device);
    mDeviceInRoom.room = new mongoose.Types.ObjectId(data.room);
    mDeviceInRoom.user = new mongoose.Types.ObjectId(data.user);
    mDeviceInRoom.device_name = data.device_name;
    mDeviceInRoom.status = data.status;

    mDeviceInRoom.save((err) =>{
      if(err) return reject(new Error('Error! An error occurred. Please try again later'));
      return resolve(true);
    });
  });
};

// DeviceInRoom.mInsert({'device' : '5ad695bb8ccca527b0176399', 'user' : '5ab3333038b9043e4095ff84', 'device_name' : 'Quat phong ngu 2-1', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695bb8ccca527b0176399', 'user' : '5ab3333038b9043e4095ff84', 'device_name' : 'Quat phong ngu 2-2', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'user' : '5ab3333038b9043e4095ff84', 'device_name' : 'Bong den 11', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'user' : '5ab3333038b9043e4095ff84', 'device_name' : 'Bong den 12', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'user' : '5ab3333038b9043e4095ff84', 'device_name' : 'Bong den 13', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'room' : '5ab5bcba66a8743898db512c', 'device_name' : 'Bong den 4', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695bb8ccca527b0176399', 'room' : '5ab5bd2c413df81ccc5ca8b8', 'device_name' : 'Quat phong ngu', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695bb8ccca527b017639a', 'room' : '5ab5bd2c413df81ccc5ca8b8', 'device_name' : 'Tu lanh', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'room' : '5ab5bd2c413df81ccc5ca8b8', 'device_name' : 'Bong den 5', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'room' : '5ab5bd2c413df81ccc5ca8b8', 'device_name' : 'Bong den 6', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695bb8ccca527b0176399', 'room' : '5ab5bd2c413df81ccc5ca8b9', 'device_name' : 'Quat nha bep', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'room' : '5ab5bd2c413df81ccc5ca8b9', 'device_name' : 'Bong den 7', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'room' : '5ab5bd2c413df81ccc5ca8b9', 'device_name' : 'Bong den 8', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'room' : '5ab5bd2c413df81ccc5ca8ba', 'device_name' : 'Bong den 9', 'status' : 0 });
// DeviceInRoom.mInsert({'device' : '5ad695ba8ccca527b0176398', 'room' : '5ab5bd2c413df81ccc5ca8ba', 'device_name' : 'Bong den 10', 'status' : 0 });


/**
@param mDeviceInRoom:
*/
DeviceInRoom.mUpdate = (data) => {
  return new Promise((resolve, reject) =>{
    let mDeviceInRoom = new DeviceInRoom();
    mDeviceInRoom._id = new mongoose.Types.ObjectId(data._id);
    mDeviceInRoom.device = new mongoose.Types.ObjectId(data.device);
    mDeviceInRoom.room = new mongoose.Types.ObjectId(data.room);
    mDeviceInRoom.user = new mongoose.Types.ObjectId(data.user);
    mDeviceInRoom.device_name = data.device_name;
    mDeviceInRoom.status = data.status;

    mDeviceInRoom.update({'_id' : data._id}, {$set : data})
    .exec((err, data) =>{
      if(err) return reject(new Error('Error! An error occurred. Please try again later'));
      return resolve(true);
    });
  });
};


/**
@param deviceInRoom_ID: mã _id của thiết bị
@objective : thực hiện xóa 1 DeviceInRoom
*/
DeviceInRoom.mDelete = (_ID) =>{
  return new Promise((resolve, reject) =>{
    DeviceInRoom.remove({_id : new mongoose.Types.ObjectId(_ID)}, (err) =>{
      if (err) return reject(new Error('Error! An error occurred. Please try again later'));
      return resolve(true);
    });
  });
};
/**
Lấy về tất cả các DeviceInRoom
*/

DeviceInRoom.getAllDeviceInRoom = () => {
  return new Promise((resolve, reject) => {
    DeviceInRoom.find((err, data) =>{
      if(err) return reject(new Error('Cannot get data'));
      return resolve(data);
    });
  });
}
// DeviceInRoom.getAllDeviceInRoom().then(data =>console.log(JSON.stringify(data)), err =>console.log(err));
/**
Lấy danh sách thiết bị theo số lượng và trang
(dùng cho phân trang)
*/
DeviceInRoom.getByPage = (quantity, page) =>{
  return new Promise((resolve, reject) =>{
    DeviceInRoom.find()
    .skip((page-1)*quantity)
    .limit(quantity)
    .sort({name : 1, type : 1, price : -1})
    .exec((err, data) =>{
      if(err) return reject(new Error('Cannot get data. Error: \n'+ err));
      return resolve(data);
    });
  });
}

module.exports = exports = DeviceInRoom;
