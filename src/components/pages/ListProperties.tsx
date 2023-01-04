import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
  //jaJP, // 日本語用のファイルをインポート
} from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { jaJP } from "../grid/locals/customJaJP"; // カスタム日本語化ファイルを読み込む
import { useState } from "react";
import styles from "./ScrapingConditions.module.css";
import { DataGridPro } from "@mui/x-data-grid-pro";
import CsvLink from "react-csv-export";
import { useCSVDownloader } from "react-papaparse";
import PapaParse, { UnparseConfig } from "papaparse";
import { SimpleDialog } from "../dialog/SimpleDialog";
import { ConditionSearchDialog } from "../dialog/ConditionSearchDialog";

const rows: GridRowsProp = [
  {
    id: 1,
    property_name: "第３和幸オークバインマンション",
    address: "大阪府枚方市中宮本町",
    train_Lines: "京阪交野線/宮之阪駅 歩14分 他",
    year_built: 10,
    plan_house: "2LD",
    property_price: 50000,
  },
  {
    id: 2,
    property_name: "レックスガーデン大津南郷ベル",
    address: "滋賀県大津市南郷５",
    train_Lines: "ＪＲ東海道本線「石山」バス16分停歩1分",
    year_built: 15,
    plan_house: "2LD",
    property_price: 1290,
  },
  {
    id: 3,
    property_name: "第３和幸オークバインマンション",
    address: "大阪府枚方市中宮本町",
    train_Lines: "京阪交野線/宮之阪駅 歩14分 他",
    year_built: 12,
    plan_house: "2LD",
    property_price: 1290,
  },
  {
    id: 4,
    property_name: "第３和幸オークバインマンション",
    address: "大阪府枚方市中宮本町",
    train_Lines: "京阪交野線/宮之阪駅 歩14分 他",
    year_built: 13,
    plan_house: "3LD",
    property_price: 1650,
  },
  {
    id: 5,
    property_name: "第３和幸オークバインマンション",
    address: "大阪府枚方市中宮本町",
    train_Lines: "京阪交野線/宮之阪駅 歩14分 他",
    year_built: 14,
    plan_house: "3LD",
    property_price: 1780,
  },
  {
    id: 6,
    property_name: "第３和幸オークバインマンション",
    address: "大阪府枚方市中宮本町",
    train_Lines: "京阪交野線/宮之阪駅 歩14分 他",
    year_built: 15,
    plan_house: "3LD",
    property_price: 1780,
  },
  {
    id: 7,
    property_name: "第３和幸オークバインマンション",
    address: "大阪府枚方市中宮本町",
    train_Lines: "京阪交野線/宮之阪駅 歩14分 他",
    year_built: 16,
    plan_house: "3LD",
    property_price: 1780,
  },
  {
    id: 8,
    property_name: "第３和幸オークバインマンション",
    address: "大阪府枚方市中宮本町",
    train_Lines: "京阪交野線/宮之阪駅 歩14分 他",
    year_built: 17,
    plan_house: "3LD",
    property_price: 2000,
  },
];

function CustomToolbar() {
  const data = [
    {
      "Column 1": "1-1",
      "Column 2": "1-2",
      "Column 3": "1-3",
      "Column 4": "1-4",
    },
    {
      "Column 1": "2-1",
      "Column 2": "2-2",
      "Column 3": "2-3",
      "Column 4": "2-4",
    },
    {
      "Column 1": "3-1",
      "Column 2": "3-2",
      "Column 3": "3-3",
      "Column 4": "3-4",
    },
    {
      "Column 1": 4,
      "Column 2": 5,
      "Column 3": 6,
      "Column 4": 7,
    },
  ];
  const download = () => {
    const config: UnparseConfig = {
      delimiter: ";",
    };

    const csvContent = PapaParse.unparse(data, config);
    const bomCode = "\ufeff";
    const csvData = new Blob([`${bomCode}${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });

    const filename = "物件一覧" + new Date();
    //const navObj: any = window.navigator;
    //const csvURL = navObj.msSaveBlob(csvData, `${filename}.csv`);
    const csvURL = window.URL.createObjectURL(csvData);

    const link = document.createElement("a");
    link.href = csvURL as string;
    link.setAttribute("download", `${filename}.csv`);
    link.click();
    link.remove();
  };

  const [csvOpen, setCsvOpen] = useState(false);

  const [searchOpen, setSarchOpen] = useState(false);

  const handleClickOpenSearch = () => {
    setSarchOpen(true);
  };

  const handleCloseSearch = () => {
    setSarchOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        onClick={() => setCsvOpen(true)}
        className={styles.csvButtonStyles}
      >
        CSVダウンロード
      </Button>
      <Button
        variant="contained"
        color="inherit"
        onClick={() => setSarchOpen(true)}
        className={styles.buttonStyles}
      >
        検索
      </Button>
      <SimpleDialog
        title="確認"
        message="物件一覧情報をCSVデータでダウンロードしますか？\n※検索で絞り込みした際は絞り込んだデータのみ出力されます。"
        open={csvOpen}
        // onAccept={() => download()}
        onAccept={() => download()}
        onClose={() => setCsvOpen(false)}
      />
      <ConditionSearchDialog
        open={searchOpen}
        // onAccept={() => download()}
        onAccept={() => download()}
        onClose={() => setSarchOpen(false)}
      />
    </>
    // <GridToolbarContainer>
    //   <GridToolbarColumnsButton />
    //   <GridToolbarExport />
    // </GridToolbarContainer>
  );
}

export function ListProperties() {
  const common = {};
  const cols: GridColDef[] = [
    // 詳細ボタン
    {
      field: "履歴ボタン",
      headerName: "",
      sortable: false,
      width: 90,
      // disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="inherit"
          onClick={() => console.log("(;^ω^)")}
        >
          履歴
        </Button>
      ),
    },
    {
      field: "property_name",
      headerName: "物件名",
      width: 470,
      renderCell: (params) => (
        <a target="_blank" href="https://suumo.jp/chintai/jnc_000035791285/">
          {params.value}
        </a>
      ),
      headerAlign: "center",
      // getActions: getDetailAction,
      description: "データ取得元のページを開く", // ツールチップで表示される説明
      hideable: false, // 非表示設定
      sortable: true, // ソート可能
      hideSortIcons: false, // ソートアイコン非表示
      resizable: true, // リサイズ設定リサイズなし設定(リサイズは商用バージョン (XGrid) でのみ可能)
      disableExport: false, // エクスポートに含めない設定
      disableReorder: false, // 並べ替え設定
      filterable: false, // フィルタリング設定
      disableColumnMenu: true, // カラムメニューを表示しない設定
    },
    {
      field: "address",
      headerName: "所在地",
      width: 400,
      headerAlign: "center",
      description: "物件の所在地", // ツールチップで表示される説明
      hideable: false, // 非表示設定
      sortable: true, // ソート可能
      hideSortIcons: false, // ソートアイコン非表示
      resizable: true, // リサイズ設定リサイズなし設定(リサイズは商用バージョン (XGrid) でのみ可能)
      disableExport: false, // エクスポートに含めない設定
      disableReorder: false, // 並べ替え設定
      filterable: false, // フィルタリング設定
      disableColumnMenu: true, // カラムメニューを表示しない設定
    },
    {
      field: "train_Lines",
      headerName: "沿線・駅",
      width: 300,
      headerAlign: "center",
      description: "最寄りの沿線・駅", // ツールチップで表示される説明
      hideable: false, // 非表示設定
      sortable: true, // ソート可能
      hideSortIcons: false, // ソートアイコン非表示
      resizable: true, /// リサイズ設定リサイズなし設定(リサイズは商用バージョン (XGrid) でのみ可能)
      disableExport: false, // エクスポートに含めない設定
      disableReorder: false, // 並べ替え設定
      filterable: false, // フィルタリング設定
      disableColumnMenu: true, // カラムメニューを表示しない設定
    },
    {
      field: "year_built",
      headerName: "築年数",
      type: "number",
      headerAlign: "center",
      align: "center",
      description: "物件の築年数", // ツールチップで表示される説明
      hideable: false, // 非表示設定
      sortable: true, // ソート可能
      hideSortIcons: false, // ソートアイコン非表示
      resizable: true, ///リサイズ設定リサイズなし設定(リサイズは商用バージョン (XGrid) でのみ可能)
      disableExport: false, // エクスポートに含めない設定
      disableReorder: false, // 並べ替え設定
      filterable: false, // フィルタリング設定
      disableColumnMenu: true, // カラムメニューを表示しない設定
    },
    {
      field: "plan_house",
      headerName: "間取り",
      headerAlign: "center",
      align: "center",
      description: "物件の間取り", // ツールチップで表示される説明
      hideable: false, // 非表示設定
      sortable: true, // ソート可能
      hideSortIcons: false, // ソートアイコン非表示
      resizable: true, // リサイズ設定リサイズなし設定(リサイズは商用バージョン (XGrid) でのみ可能)
      disableExport: false, // エクスポートに含めない設定
      disableReorder: false, // 並べ替え設定
      filterable: false, // フィルタリング設定
      disableColumnMenu: true, // カラムメニューを表示しない設定
    },
    {
      field: "property_price",
      headerName: "物件価格(万)",
      width: 120,
      type: "number",
      headerAlign: "center",
      description: "物件の物件価格(万)", // ツールチップで表示される説明
      hideable: false, // 非表示設定
      sortable: true, // ソート可能
      hideSortIcons: false, // ソートアイコン非表示
      resizable: true, // リサイズ設定リサイズなし設定(リサイズは商用バージョン (XGrid) でのみ可能)
      disableExport: false, // エクスポートに含めない設定
      disableReorder: false, // 並べ替え設定
      filterable: false, // フィルタリング設定
      disableColumnMenu: true, // カラムメニューを表示しない設定
    },
  ];

  const [pageSize, setPageSize] = useState<number>(5);

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  return (
    <>
      <Grid container m={2}>
        <Typography component="span">物件一覧</Typography>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item style={{ height: 600, width: "85%", textAlign: "center" }}>
          <Grid container my={1} alignItems="right" justifyContent="right">
            <CustomToolbar />
          </Grid>
          <DataGridPro
            rows={rows}
            columns={cols}
            // pageSize={5}
            // rowsPerPageOptions={[5]}
            // components={{
            //   Toolbar: CustomToolbar,
            // }}
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            hideFooterSelectedRowCount
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
          />
        </Grid>
      </Grid>
    </>
  );
}
