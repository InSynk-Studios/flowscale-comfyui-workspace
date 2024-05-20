import React, { useRef } from "react";
import { Box, Button } from "@primer/react";
import { Dialog } from "@primer/react";

interface DefaultModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  dialogTitle: string;
  children: React.ReactNode;
  sx?: object;
  buttonText?: string;
  showButtons?: boolean;
}

const DefaultModal: React.FC<DefaultModalProps> = ({
  isOpen,
  onDismiss,
  dialogTitle,
  children,
  sx = {},
  buttonText = "",
  showButtons = true,
}) => {
  const returnFocusRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Dialog
        sx={sx}
        isOpen={isOpen}
        returnFocusRef={returnFocusRef}
        onDismiss={onDismiss}
      >
        <div data-testid="inner">
          <Dialog.Header id="header">{dialogTitle}</Dialog.Header>

          <Box className="px-3">{children}</Box>
          {showButtons && (
            <Box className="flex justify-end gap-2 p-3">
              {buttonText && (
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
              )}
            </Box>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default DefaultModal;
