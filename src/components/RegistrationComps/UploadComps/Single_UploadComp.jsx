import ImageUploadBox from "../../ImageUploadBox/ImageUploadBox";

const Single_UploadComp = ({ updateFrontPic }) => {
  return (
    <div className="hidden md:flex w-fit flex-col">
      <ImageUploadBox
        imageType="Front Picture"
        img="FrontPicture"
        setImageDL={updateFrontPic}
      />
    </div>
  );
};

export default Single_UploadComp;
