# Akoma Ntoso 台灣法律文件範例專案

本專案旨在以 Akoma Ntoso 格式製作台灣裁判與法律的範例文件，探索國際法律文件標準在台灣法制體系的應用可能性。

## 什麼是 Akoma Ntoso？

Akoma Ntoso（非洲規範性文本面向知識管理的開放標準與本體架構）是一個國際技術標準，用於以結構化方式表示行政、立法和司法文件，使用特定領域的法律 XML 詞彙表。

### 主要特色

- **國際標準**：由 OASIS（結構化資訊標準促進組織）於 2018 年正式採納為國際標準
- **機器可讀**：使法律文件能夠被機器處理，支援高品質的資訊資源開發
- **語義結構**：提供一致的語法和明確定義的語義來表示數位格式的法律文件
- **靈活可擴展**：可以擴展以滿足不同組織的需求或不同法律傳統的特色
- **全球通用**：設計為所有議會、法律和司法系統的通用交換格式

### 國際應用實例

- **英國**：國家檔案館在 2014 年將所有立法轉換為 AKN 格式
- **義大利**：參議院自 2016 年起以 Akoma Ntoso 格式提供法案開放資料
- **歐盟**：開發 AKN4EU 作為歐盟法律文件交換的機器可讀結構化格式
- **美國**：美國法典標記語言（USLM）架構與 Akoma Ntoso 保持一致
- **聯合國**：高階管理委員會於 2017 年批准採用 Akoma Ntoso 作為文件建模標準

## 專案結構

```
.
├── akn/                    # Akoma Ntoso 格式的範例文件（18個檔案）
│   ├── 民法第一編總則.akn      # 法律條文範例
│   ├── TPE-民事-*.akn        # 民事判決範例
│   ├── FSE-民事-*.akn        # 鳳山簡易庭民事判決
│   └── *例稿*.akn           # 各類型判決範例稿
├── reader/                 # 網頁版 Akoma Ntoso 閱讀器
│   ├── index.html          # 閱讀器介面
│   ├── reader.js           # 核心解析程式
│   └── package.json        # 依賴管理
├── docs/                   # Akoma Ntoso 標準文件
├── courts.json             # 台灣法院代碼對照表
├── generate_judgement_akn.rb # 判決書轉換工具
├── generate_reference.rb   # 法條引用產生器
└── translate_number.rb     # 中文數字轉換工具
```

## 主要功能

### 1. 判決書轉換工具 (`generate_judgement_akn.rb`)

將台灣司法院裁判系統的判決書轉換為 Akoma Ntoso 格式：

```bash
ruby generate_judgement_akn.rb "判決書網址"
```

**功能特色：**
- 自動擷取判決書元資料（法院、案號、日期等）
- 解析法官資訊和案件內容
- 生成符合 Akoma Ntoso 標準的 XML 文件
- 支援民事、刑事、行政等各類型案件

### 2. 法條引用產生器 (`generate_reference.rb`)

產生標準化的法條引用格式：

```bash
ruby generate_reference.rb reference.txt
```

支援多層次法條結構：
- 條文：`民法 第1條`
- 項次：`民法 第1條第1項`
- 款目：`民法 第1條第1項第1款`

### 3. 網頁閱讀器 (`reader/`)

提供視覺化的 Akoma Ntoso 文件閱讀介面：

```bash
cd reader
npm install
# 使用本地伺服器開啟 index.html
```

**閱讀器功能：**
- 結構化顯示判決書內容
- 支援線上載入 Akoma Ntoso 文件
- 友善的中文法律文件閱讀體驗

## 技術架構

### 法院系統支援

本專案支援台灣完整的法院體系：
- **最高法院層級**：最高法院（TPS）、最高行政法院（TPA）
- **高等法院層級**：各地高等法院及分院
- **地方法院層級**：各縣市地方法院
- **簡易法庭**：各地簡易庭
- **專業法院**：智慧財產法院、少年及家事法院等

### 文件結構設計

遵循 FRBR（書目記錄功能需求）架構：
- **Work 層級**：法律文件的抽象概念
- **Expression 層級**：特定語言/版本的表現形式
- **Manifestation 層級**：實體/數位格式

### 解析技術

- **Ruby 後端**：使用 Mechanize、Nokogiri 進行網頁爬取和 XML 處理
- **JavaScript 前端**：使用 xml-js、axios 進行 XML 解析和 HTTP 請求
- **中文處理**：支援繁體中文數字轉換和法律用語解析

## 使用方式

### 環境需求

**Ruby 環境：**
```bash
gem install mechanize nokogiri json
```

**Node.js 環境：**
```bash
cd reader
npm install
```

### 基本操作

1. **轉換判決書**：
   ```bash
   ruby generate_judgement_akn.rb "http://djirs.judicial.gov.tw/fjud/..."
   ```

2. **檢視範例文件**：
   瀏覽 `akn/` 資料夾中的 `.akn` 檔案

3. **使用閱讀器**：
   開啟 `reader/index.html` 並載入 AKN 文件

## 專案意義

本專案探索了將國際法律文件標準應用於台灣法制體系的可能性，具有以下意義：

1. **數位化轉型**：推動台灣法律資訊的數位化和結構化
2. **國際接軌**：使台灣法律文件符合國際標準，促進跨國法律資訊交流
3. **技術創新**：為法律科技發展提供基礎架構
4. **開放資料**：促進法律資訊的開放和透明化

## 參考資源

- [Akoma Ntoso 官方標準](https://docs.oasis-open.org/legaldocml/akn-core/v1.0/)
- [OASIS LegalDocML 技術委員會](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=legaldocml)
- [台灣司法院裁判系統](http://djirs.judicial.gov.tw/)

## 授權

本專案採用 MIT 授權條款。

Copyright (c) 2018 Billy Zhe-Wei Lin, Ronny Wang, Judicial Reform Foundation

詳細授權條款請參閱 [LICENSE](LICENSE) 檔案。

---

**注意**：本專案為研究和示範目的，產生的文件僅供參考，不具法律效力。
