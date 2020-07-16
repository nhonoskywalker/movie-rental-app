export class Movie {
  id: string; //pk
  registrationId: string; //fk
  title: string;
  copyCode: string; //unqiue
  rented: boolean;
}
