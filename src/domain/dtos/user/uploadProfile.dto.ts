import { UploadImageDto} from "../common";

export class UploadProfileDto extends UploadImageDto{
  protected constructor(public readonly file: FormData) {
    super(file);
  }

  public static create(data: UploadProfileDto): [UploadProfileDto?, string[]?] {
    return UploadFileDto.create(data);
  }

}
