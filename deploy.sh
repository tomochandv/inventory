echo "> pm2 삭제"
pm2 stop pinventory
echo "> pm2 시작"
pm2 start pm2.json
