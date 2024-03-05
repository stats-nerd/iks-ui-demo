import { iksLogo } from "../../../assets";
import styles from "../../../styles";

const Footer = () => {
  return (
    <div
      className={`bg-[#FBFBFB] border-t border-[#DDDDDD] py-6 ${styles.xSectionPadding} flex items-center justify-between`}
    >
      <img src={iksLogo} alt="iks logo" />
      <span className="font-lato text-[#6D6760] text-sm font-normal">
        © 2023 IKS Health. All Rights Reserved
      </span>
    </div>
  );
};

export default Footer;
