import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme: any) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export function SimpleDialog(props: any) {
  // プロパティの受け取り
  const { title, message, onAccept, onClose, open, buttonType } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  // 承諾（OK または YES ボタンをクリック）した時
  const handleAccept = () => {
    handleClose();
    onAccept();
  };

  // ダイアログクローズ
  const handleClose = () => {
    console.log(message);
    setDialogOpen(false);
    onClose();
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  // openの値が変化した時
  useEffect(() => setDialogOpen(open), [open]);

  // 文字列を改行コードで分割して改行タグに置換
  const lbToBr = (txt: any) => {
    return txt.split(/(\n)/g).map((t: any) => (t === "\n" ? <br /> : t));
  };
  const text =
    "物件一覧情報をCSV出力しますか？。\n※検索で絞り込みした際は絞り込んだデータのみ出力されます。";
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {message.split("\\n").map((str: string) => (
          <Typography gutterBottom>{str}</Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept}>はい</Button>
        <Button autoFocus onClick={handleClose}>
          キャンセル
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

// ボタン種別
export enum ButtonType {
  OkOnly = "OkOnly",
  YesNo = "YesNo",
}

// プロパティ
// CsvOutputDialog.propTypes = {
//   title: PropTypes.string.isRequired,
//   message: PropTypes.string.isRequired,
//   onAccept: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   buttonType: PropTypes.oneOf([ButtonType.OkOnly, ButtonType.YesNo]).isRequired,
// };

// export default CsvOutputDialog;
