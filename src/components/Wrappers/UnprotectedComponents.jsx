const UnprotectedComponents = ({ children }) => {
  // const { state } = useAppContext();
  // const { currentAuthUser } = state;

  // if (currentAuthUser) {
  //   console.log(
  //     "FROM AUTH PROTECTION: current user not logged in",
  //     currentAuthUser
  //   );
  //   return <Navigate to="/dashboard/registration" />;
  // }

  return children;
};

export default UnprotectedComponents;
