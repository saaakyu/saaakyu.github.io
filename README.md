# Talkship

「誰なら頼めるか」から「誰とこの仕事について話してみるとよいか」へ。チームの仕事相談を支援する React + TypeScript のプロトタイプです。

## GitHub上でプレビューする（コードの知識は不要です）

このリポジトリには、GitHub Pagesへ自動公開する設定が含まれています。

1. GitHubのリポジトリ画面で **Settings** を開きます。
2. 左側の **Pages** を開きます。
3. **Build and deployment** の **Source** で **GitHub Actions** を選びます。
4. 変更を `main` ブランチへマージ、またはプッシュします。
5. リポジトリ上部の **Actions** を開き、`Publish preview to GitHub Pages` が緑のチェックになるまで待ちます。
6. 完了した実行を開き、`deploy` に表示されるURLをクリックします。

公開URLは通常、次の形式です。

```text
https://GitHubのユーザー名.github.io/リポジトリ名/
```

初回だけPagesの設定が必要です。2回目以降は`main`へ変更が入るたび、自動的に同じURLへ反映されます。手動で再公開したい場合は、**Actions** → **Publish preview to GitHub Pages** → **Run workflow** を選びます。

> 公開されたプロフィールや案件は誰でもURLから閲覧できる可能性があります。このプロトタイプでは、実在する個人情報を入力しないでください。

## レンタルサーバーで確認する

Node.jsを使用できるPCで、次のコマンドを実行します。

```bash
npm install
npm run build
```

作成された`dist`フォルダの**中身をすべて**、レンタルサーバーの公開フォルダへアップロードしてください。相対パスでビルドするため、ドメイン直下だけでなく`/talkship/`のようなサブフォルダでも表示できます。

## PC上で確認する

```bash
npm install
npm run dev
```

ターミナルに表示される`http://localhost:5173/`をブラウザで開きます。

データはブラウザのLocalStorageに保存されます。画面右上のメニューからデモデータへ戻せます。
