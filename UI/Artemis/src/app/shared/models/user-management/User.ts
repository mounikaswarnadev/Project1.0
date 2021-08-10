export class User {
  userId: number;
  userName: string;
  userAlias: string;
  email: string;
  regionId: number;
  regionName : string;
  userURL: string;
  userThumbnailUrl: string;
  userImage: string;
  fileName: string;
  constructor(obj) {
    this.userId = obj.userId || null;
    this.userName = "Rajesh, D";
    this.userAlias = obj.userAlias || null;
    this.email = obj.email || null;
    this.regionId = obj.regionId || null;
    this.regionName = obj.regionName || null;
    this.userURL = obj.userURL || null;
    this.userThumbnailUrl = obj.userThumbnailUrl || null;
    this.userImage = obj.userImage || null;
    this.fileName = obj.fileName || null;
  }
}
