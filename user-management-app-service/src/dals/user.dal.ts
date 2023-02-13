// import { DAL } from "../helpers/abstracts/DAL";
// import { User, } from "../helpers/database/Sequelize";
// import async from "async";

// class UserDAL implements DAL {
//   /**
//    * Find Many Posts
//    * @param query
//    * @param order
//    * @param includes
//    */
//   static findMany(query: any, order: any, includes: any): Promise<User[]> {
//     return new Promise((resolve, reject) => {
//       User.findAll({ where: query, order: order, include: includes })
//         .then((result: User[]) => resolve(result))
//         .catch((error: any) => reject(error));
//     });
//   }

//   /**
//    * create user
//    *
//    * @param {string} title
//    *
//    */
//   static create(
//     userName: string,
//     phoneNumber: string,
//     email: string,
//     password: string,
//     userType: string
//   ): Promise<User> {
//     return new Promise((resolve, reject) => {
//       User.create({
//         userName: userName,
//         phoneNumber: phoneNumber,
//         email: email,
//         password: password,
//         userType: userType,
//       })
//         .then((result: User) => resolve(result))
//         .catch((error: any) => reject(error));
//     });
//   }

//   /**
//    * create user account with user detail info
//    *
//    * @param {string} title
//    *
//    */
//   static createUserInfo(userInfo: any): Promise<UserDetail> {
//     console.log("under user info ", userInfo);
//     return new Promise((resolve, reject) => {
//       async.waterfall([
//         (done: Function) => {
//           User.create({
//             userName: userInfo.userName,
//             phoneNumber: userInfo.phoneNumber,
//             email: userInfo.email,
//             password: userInfo.password,
//             userType: userInfo.userType,
//           })
//             .then((result: User) => done(null, result))
//             .catch((error: any) => done(error));
//         },
//         (user: User, done: Function) => {
//           UserDetail.create({
//             firstName: userInfo.firstName,
//             middleName: userInfo.middleName,
//             lastName: userInfo.lastName,
//             region_id: userInfo.region_id,
//             city_id: userInfo.city_id,
//             subcity_id: userInfo.subcity_id,
//             woreda_id: userInfo.woreda_id,
//             user_id: user?.id,
//           })
//             .then((result: UserDetail) => resolve(result))
//             .catch((error: any) => reject(error));
//         },
//       ]);
//     });
//   }

//   /**
//    * Update User
//    *
//    * @param {User}    language
//    * @param {any}         payload
//    * @param {Transaction} transaction
//    */
//   static update(id: any, userInfo: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       User.update(
//         {
//           userName: userInfo?.userName,
//           phoneNumber: userInfo?.phoneNumber,
//           email: userInfo?.email,
//           userType: userInfo?.userType,
//           verified: userInfo?.verified,
//         },
//         {
//           where: { id: id },
//         }
//       )
//         .then((result: any) => resolve(result))
//         .catch((error: any) => reject(error));
//     });
//   }

//   /**
//    * Find One user
//    *
//    * @param query
//    * @param order
//    * @param includes
//    */
//   static findOne(query: any, order: any, includes: any): Promise<User> {
//     return new Promise((resolve, reject) => {
//       User.findOne({ where: query, order: order, include: includes })
//         .then((result: any) => resolve(result))
//         .catch((error: any) => reject(error));
//     });
//   }

//   /**
//    * Count Users
//    *
//    * @param query
//    */
//   static count(query: any): Promise<number> {
//     return new Promise((resolve, reject) => {
//       User.count({ where: query })
//         .then((result: number) => resolve(result))
//         .catch((error: any) => reject(error));
//     });
//   }

//   /**
//    * Delete User by id
//    *
//    * @param query
//    */
//    static deleteById(id: any): Promise<number> {
//     return new Promise((resolve, reject) => {
//       User.destroy({ where: { id: id} })
//         .then((result: number) => resolve(result))
//         .catch((error: any) => reject(error));
//     });
//   }
// }

// export default UserDAL;
