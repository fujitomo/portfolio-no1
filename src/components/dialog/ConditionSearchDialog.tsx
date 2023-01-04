import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export function ConditionSearchDialog(props: any) {
  // プロパティの受け取り
  const { message, onAccept, onClose, open } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  // 承諾（OK または YES ボタンをクリック）した時

  // ダイアログクローズ
  const handleClose = () => {
    console.log(message);
    setDialogOpen(false);
    onClose();
  };

  const [searchOpen, setSearchOpen] = useState(false);

  const handleCloseSearch = () => {
    console.log(message);
    setSearchOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseSearch} maxWidth={"lg"}>
      <DialogTitle>検索条件</DialogTitle>
      <DialogContent
        dividers
        sx={{
          width: 500,
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="物件名"
          type="string"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="所在地"
          type="string"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseSearch}>検索</Button>
        <Button onClick={handleCloseSearch}>クリア</Button>
        <Button onClick={handleCloseSearch}>閉じる</Button>
      </DialogActions>
    </Dialog>
  );
}
