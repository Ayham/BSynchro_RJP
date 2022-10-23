export class user {
    Id: number | undefined;
    Name: string | undefined;
    Surname: string | undefined;
    Balance: string | undefined;
  }
  export class transaction {
    Id: number | undefined;
    UserId: string | undefined;
    Amount: string | undefined;
  }
  export class helper {
    CustomerID: string | undefined;
    InitialCredit: number | undefined;
  }