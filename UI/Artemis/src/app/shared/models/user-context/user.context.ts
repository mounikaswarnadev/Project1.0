import { Role } from './user.role';
import { User } from '../user-management/User';

export class UserContext {
 // constructor(public UserId: any, public UserName: string, public RoleId: string, public Password: string) { }
   constructor(public user : User,public roles: Role[],
     public projects: Project[], public lobs: Lob[],
     public ingestionFolders: IngestionFolders[]) { }
}


export class Project{
  constructor(public projectId:number,public projectName:string){}
}
export class Lob{
  constructor(public lobId:number,public lobName:string){}
}
export class IngestionFolders {
  constructor(public folderId: number, public folderName: string) { }
}
