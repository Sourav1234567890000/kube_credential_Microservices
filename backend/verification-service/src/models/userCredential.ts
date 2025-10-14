export default class VerificationCredentials {
  name: string;
  email: string;
  employeeID: string;

  constructor(name: string, email: string, employeeID: string) {
    this.name = name;
    this.email = email;
    this.employeeID = employeeID;
  }

}
