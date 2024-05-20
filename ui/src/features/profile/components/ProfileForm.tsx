import React from "react";
import { Box, Button, FormControl, TextInput } from "@primer/react";
import { EyeSlash } from "phosphor-react";

interface ProfileFormProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const TextInputStyle = {
  width: "100%",
  height: 35,
  borderRadius: "6px",
  backgroundColor: "transparent",
};
const TextInputLabelStyle = {
  fontSize: "14px",
  color: "#F2F2F2",
  fontWeight: 500,
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  return (
    <Box as="form" className="flex flex-col gap-6">
      <FormControl>
        <FormControl.Label style={TextInputLabelStyle}>
          First Name
        </FormControl.Label>
        <TextInput defaultValue={firstName} sx={TextInputStyle} block />
      </FormControl>
      <FormControl>
        <FormControl.Label style={TextInputLabelStyle}>
          Last Name
        </FormControl.Label>
        <TextInput defaultValue={lastName} sx={TextInputStyle} block />
      </FormControl>
      <FormControl>
        <FormControl.Label style={TextInputLabelStyle}>
          Username
        </FormControl.Label>
        <TextInput defaultValue={username} sx={TextInputStyle} block />
      </FormControl>
      <FormControl>
        <FormControl.Label style={TextInputLabelStyle}>Email</FormControl.Label>
        <TextInput defaultValue={email} sx={TextInputStyle} block />
      </FormControl>
      <FormControl>
        <FormControl.Label style={TextInputLabelStyle}>
          Password
        </FormControl.Label>
        <TextInput
          defaultValue={password}
          sx={{
            width: "96%",
            height: 35,
            borderRadius: "6px",
            backgroundColor: "transparent",
          }}
          type="password"
          trailingVisual={EyeSlash}
        />
      </FormControl>
      <Box className="flex justify-end">
        <Button sx={{ width: "50%", borderRadius: "24px", padding: "18px" }}>
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;
