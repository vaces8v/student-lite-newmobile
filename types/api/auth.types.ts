export interface ResponseAuth {
    response: Response;
  }
  
   interface Response {
    state: number;
    error?: any;
    result: ResultAuth;
  }
  
   interface ResultAuth {
    token: string;
    expires: string;
  }

export interface BodyAuth {
    login: string;
    password: string;
}