import { Box } from "@primer/react";

import ProfileForm from "./ProfileForm";

export const ProfileTab = () => {
  return (
    <>
      <Box sx={{ borderBottom: "1px solid #343B45" }} className="px-4 py-1">
        <h2 className="text-base font-semibold">Your Profile</h2>
      </Box>
      <Box className="px-3 pt-4">
        <ProfileForm
          firstName={""}
          lastName={""}
          username={""}
          email={""}
          password={""}
        />
      </Box>
    </>
  );
};
