const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/dotev");
const UserRepository = require("../repository/user-repository");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("====================================");
      console.log("Error occured in userService");
      console.log("====================================");
      throw error;
    }
  }
  async destroy(id) {
    try {
      const data = await this.userRepository.destroy(id);
      return data;
    } catch (error) {
      console.log("====================================");
      console.log("Error occured in userService");
      console.log("====================================");
      throw error;
    }
  }

  async get(id) {
    try {
      const data = await this.userRepository.get(id);
      return data;
    } catch (error) {
      console.log("====================================");
      console.log("Error occured in userService");
      console.log("====================================");
      throw error;
    }
  }
  async getAll() {
    try {
      const data = await this.userRepository.getAll();
      return data;
    } catch (error) {
      console.log("====================================");
      console.log("Error occured in userService");
      console.log("====================================");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const result = await this.userRepository.update(id, data);

      return result;
    } catch (error) {
      console.log("====================================");
      console.log("Error occured in userService");
      console.log("====================================");
      throw error;
    }
  }
  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation");
      throw error;
    }
  }
  async signin(email, password) {
    try {
      const user = await this.getByEmail(email);
      if (!user) throw { error: "User not found" };
      const passwordMatch = this.checkPassword(password, user.password);
      if (!passwordMatch) {
        console.log("Password  doesn't matched");
        throw { error: "Password doesnot matched" };
      }
      const newJWT = this.createToken({ email: user.email, id: user.id });

      return newJWT;
    } catch (error) {
      console.log("Something went wrong in the sign in process");
      throw error;
    }
  }

  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparision");
      throw error;
    }
  }
  async getByEmail(email) {
    try {
      return await this.userRepository.getByEmail(email);
    } catch (error) {
      console.log("Something went wrong while finding by email");
      throw error;
    }
  }
  async isAuthenticated(token) {
    try {
      const verifiedToken = await this.verifyToken(token);
      if (!verifiedToken) throw { error: "invalid token" };
      const user = await this.userRepository.get(verifiedToken.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }

      const data = {
        id: user.id,
        email: user.email,
      };
      return data;
    } catch (error) {
      console.log("Something went wrong in auth process");
      throw error;
    }
  }
}

module.exports = UserService;
