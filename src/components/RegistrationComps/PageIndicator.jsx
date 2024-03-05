import { FiberManualRecord } from "@mui/icons-material";

const PageIndicator = ({ totalPages = 3, currentPage }) => {
  const pageNames = [
    "Identification Information",
    "Insurance Information",
    "Payment Information",
  ];

  return (
    <div className="w-fit flex items-center flex-col gap-5 justify-center">
      <div className="flex items-center justify-between w-64">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page, arrayIndex) => (
            <div key={page} className="relative text-center">
              {arrayIndex > 0 && (
                <div
                  className={`absolute -right-2 transform -translate-x-1/2 top-2 h-0.5 w-20 bg-green-500 ${
                    arrayIndex < currentPage - 1 ? "#92C281" : "#FFFFFF"
                  }`}
                ></div>
              )}
              <div
                className={`w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center ${
                  page <= currentPage ? "#92C281" : "#FFFFFF"
                }`}
              >
                {page <= currentPage && (
                  <FiberManualRecord
                    fontSize="small"
                    style={{
                      color: " #258503",
                      height: "9px",
                    }}
                  />
                )}
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex items-center justify-between w-60">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page, arrayIndex) => (
            <div key={page} className="relative text-center">
              <p
                className="text-xs mt-1"
                style={{
                  color: page <= currentPage ? "#134501" : "#6D6760",
                  position: "absolute",
                  left: "-20px",
                  top: "-16px",
                }}
              >
                {pageNames[arrayIndex]}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PageIndicator;
