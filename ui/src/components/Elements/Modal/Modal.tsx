import React, { useRef } from "react";
import { Box, Button } from "@primer/react";
import { Dialog } from "@primer/react/experimental";

interface DialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  // dialogTitle: string;
  children: React.ReactNode;
  sx?: object;
  buttonText?: string;
  showButtons?: boolean;
  customHeader?: () => React.ReactNode;
}

const Modal: React.FC<DialogProps> = ({
  isOpen,
  onDismiss,
  // dialogTitle,
  children,
  sx = {},
  buttonText = "",
  showButtons = true,
  customHeader = () => {},
}) => {
  const returnFocusRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {isOpen && (
        <Dialog
          sx={sx}
          renderHeader={customHeader}
          returnFocusRef={returnFocusRef}
          onClose={onDismiss}
          footerButtons={
            showButtons
              ? [
                  {
                    buttonType: "default",
                    content: "Cancel",
                    onClick: onDismiss,
                  },
                  {  content: buttonText },
                ]
              : undefined
          }
        >
          <div data-testid="inner">
            <Box className="">{children}</Box>
            {showButtons && (
              <Box className="flex justify-end gap-2 p-3">
                {/* {buttonText && (
                  <Button
                    sx={{
                      fontSize: "14px",
                      backgroundColor: "#fff",
                      color: "#16191D",
                      "&:hover": {
                        color: "#fff",
                      },
                    }}
                  >
                    {buttonText}
                  </Button>
                )} */}
              </Box>
            )}
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Modal;
