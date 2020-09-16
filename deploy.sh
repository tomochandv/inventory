echo "> 키파일 복사"
mkdir ~/app/dist/server/lib/keys
cp ~/configs/config.js ~/app/dist/server/config.js
cp ~/configs/emailKey ~/app/dist/server/lib/keys/emailKey
cp ~/configs/private ~/app/dist/server/lib/keys/private
cp ~/configs/public ~/app/dist/server/lib/keys/public
cp ~/configs/recaptch ~/app/dist/server/lib/keys/recaptch
cp ~/configs/tokenKey ~/app/dist/server/lib/keys/tokenKey
echo "> pm2 삭제"
pm2 stop pinventory
echo "> pm2 시작"
pm2 ~/app/start pm2.json
