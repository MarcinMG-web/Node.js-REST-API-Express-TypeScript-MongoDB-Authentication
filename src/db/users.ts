import mongoose from 'mongoose';

/**
 * Schema
 */
const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, selected: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

/**
 * Model
 */
export const UserModel = mongoose.model('User', UserSchema);

/**
 * Actions
 */
export const getUsers = () => UserModel.find();

// Authentication
export const getUsersByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  });

// Interaction on User
export const getUserById = (id: string) => UserModel.findById(id);

export const createUsers = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
