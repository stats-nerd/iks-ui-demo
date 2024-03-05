import ImageCaptureBox from "../../ImageCaptureBox/ImageCaptureBox";

const Double_CaptureComp = ({ updateFrontPic, updateBackPic }) => {
  return (
    <div className="md:hidden w-full flex flex-col gap-5 items-center justify-center">
      <ImageCaptureBox
        imageType="Front Picture"
        img="FrontPicture"
        setImageDL={updateFrontPic}
      />
      <ImageCaptureBox
        imageType="Back Picture"
        img="BackPicture"
        setImageDL={updateBackPic}
      />
    </div>
  );
};

export default Double_CaptureComp;
