import ImageUploadBox from "../../ImageUploadBox/ImageUploadBox";

const Double_UploadComp = ({ updateFrontPic, updateBackPic }) => {
  return (
    <div className="hidden md:flex w-full items-center justify-center gap-5">
      <div className="flex-col">
        <ImageUploadBox
          imageType="Front Picture"
          img="FrontPicture"
          setImageDL={updateFrontPic}
        />
      </div>
      <div className="flex-col">
        <ImageUploadBox
          imageType="Back Picture"
          img="BackPicture"
          setImageDL={updateBackPic}
        />
      </div>
    </div>
  );
};

export default Double_UploadComp;
