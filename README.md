# 前提条件
```shell
npm -v
node -v
```
上記の二つのコマンド売って、versionが表示されればOK
入っていなかったら、homebrewインストールして、
```shell
brew install npm
brew install node
```
をしてください。

# セットアップ方法
`make setup`

必要なnode_modulesをインストールします。
puppeteerが含まれており、その中にchromiumが入っているので若干時間かかるかも。

# 実行方法
`node index.js`

ルートディレクトリで実行すること。
