import ImageCaptureBox from "../../ImageCaptureBox/ImageCaptureBox";

const Single_CaptureComp = ({ updateFrontPic }) => {
  return (
    <div className="md:hidden w-full flex flex-col items-center justify-center gap-5">
      <ImageCaptureBox
        imageType="Front Picture"
        img="FrontPicture"
        setImageDL={updateFrontPic}
      />
    </div>
  );
};

export default Single_CaptureComp;
