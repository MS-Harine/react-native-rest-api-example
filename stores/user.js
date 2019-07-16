import { observable, action } from 'mobx';
import Axios from 'axios';
import { asyncAction, REJECTED } from 'mobx-utils'

import { DATABASE } from '../variable/secret';
import UpdateUserDataScreen from '../src/UpdateUserData';
import CreateUserDataScreen from '../src/CreateUserData';

export default class UserStore {
  @observable userList = [];
  @observable state = "pending"
  errorData = "";

  @asyncAction
  * getUserList() {
    this.state = "pending";

    try {
      let result = yield Axios.get(DATABASE + "/users/");
      this.userList = result.data.results;
      this.state = "done"
    }
    catch (error) {
      console.log(JSON.stringify(error));
      this.errorData = error.message;
      this.state = "error"
    }
  }

  @asyncAction
  * deleteUser(id) {
    this.state = 'pending';

    try {
      let result = yield Axios.delete(DATABASE + '/users/' + id + '/');
      const index = this.userList.findIndex(item => item.id === id);
      this.userList.splice(index, 1);
      this.state = 'done';
    }
    catch (error) {
      console.log(error);
      this.errorData = error.message;
      this.state = 'error';
    }
  }

  @asyncAction
  * updateUser(id, username) {
    this.state = 'pending';

    try {
      let result = yield Axios.patch(DATABASE + '/users/' + id + '/', {
        username: username
      });
      const index = this.userList.findIndex(item => item.id === id);
      this.userList[index].username = username;
      this.state = 'done';
    }
    catch (error) {
      console.log(error);
      this.errorData = error.message;
      this.state = 'error';
    }
  }

  @asyncAction
  * createUser(username) {
    try {
      let result = yield Axios.post(DATABASE + "/users/", {
        username: username
      });
      this.userList.push(response);
      this.state = 'done';
    }
    catch (error) {
      console.log(error);
      this.errorData = error.message;
      this.state = 'error';
    }
  }
}
