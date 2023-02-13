// import { User } from "./../models/user.model";
// import {
//   InternalServerError,
//   BadRequestError,
//   NotFoundError,
// } from "./../errors/Errors";
// import UserDAL from "../dals/user.dal";
// import Messages from "../errors/Messages";
// import { UserDetail } from "../models/userDetail.model";

// class UserService {
//   /**
//    * Find Many Users
//    */
//   static findMany(query: any): Promise<User[]> {
//     return new Promise((resolve, reject) => {
//       UserDAL.findMany(query, [], [])
//         .then((result: User[]) => resolve(result))
//         .catch((error: any) => {
//           console.log("under internal server error");
//           console.log(error);
//         });
//     });
//   }

//   /**
//    * create user
//    *
//    * @param {string} title
//    */
//   static create(
//     userName: string,
//     phoneNumber: string,
//     password: string,
//     email: string,
//     userType: string
//   ): Promise<User> {
//     return new Promise((resolve, reject) => {
//       UserDAL.create(userName, phoneNumber, password, email, userType)
//         .then((result: User) => resolve(result))
//         .catch((error: any) => reject(new InternalServerError(error)));
//     });
//   }

//   /**
//    * create user
//    *
//    * @param {string} title
//    */
//   static createUserInfo(userInfo: any): Promise<UserDetail> {
//     return new Promise((resolve, reject) => {
//       UserDAL.createUserInfo(userInfo)
//         .then((result: UserDetail) => resolve(result))
//         .catch((error: any) => reject(new InternalServerError(error)));
//     });
//   }

//   /**
//    * Update User
//    *
//    * @param id
//    * @param payload
//    */
//   static update(id: any, userInfo: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       UserDAL.update(id, userInfo)
//         .then((result: any) => resolve(result))
//         .catch((error: any) => {
//           console.log("under service update ", error);
//           reject(new InternalServerError(error));
//         });
//     });
//   }

//   /**
//    * Update User
//    *
//    * @param id
//    * @param payload
//    */
//   static deleteById(id: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       UserDAL.deleteById(id)
//         .then((result: any) => resolve(result))
//         .catch((error: any) => {
//           console.log("under service update ", error);
//           reject(new InternalServerError(error));
//         });
//     });
//   }

//   /**
//    * Find User By Id
//    *
//    * @param {string} id
//    */
//   static findById(id: string): Promise<User> {
//     return new Promise((resolve, reject) => {
//       UserDAL.findOne({ id: id }, [], [])
//         .then((result: User) => resolve(result))
//         .catch((error: any) => reject(new InternalServerError(error)));
//     });
//   }

//   /**
//    * find user
//    *
//    * @param {any}  query
//    *
//    */
//   static findOne(query: any): Promise<User> {
//     return new Promise((resolve, reject) => {
//       UserDAL.findOne(query, [], [])
//         .then((result: User) => resolve(result))
//         .catch((error: any) => reject(new BadRequestError(error)));
//     });
//   }
// }

// export default UserService;
