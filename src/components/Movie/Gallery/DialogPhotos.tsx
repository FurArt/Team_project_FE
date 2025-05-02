import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"
import './DialogPhotos.scss'

interface DialogPhotosProps {
  open: boolean
  handleClose: () => void
  url: string
  error?: string | null
}

export default function DialogPhotos({
  open,
  handleClose,
  url,
}: DialogPhotosProps) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
        <div className="dialog-gallery--container">
          
          <img
            src={url}
            alt="Full screen"
            style={{ width: "97%", height: "auto", borderRadius: 8 }}
          />
          <DialogActions>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  )
}
