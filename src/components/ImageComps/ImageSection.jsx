const ImageSection = ({ src, alt, imageStyles }) => {
  return <img src={src} alt={alt} className={imageStyles} />;
};

export default ImageSection;
