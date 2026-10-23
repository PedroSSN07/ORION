@echo off
cd /d "%~dp0"
if not exist "node_modules\vite\bin\vite.js" (
  echo Dependencias ausentes. Execute npm.cmd ci nesta pasta primeiro.
  pause
  exit /b 1
)
echo Mantenha esta janela aberta enquanto utiliza o site.
call npm.cmd run dev -- --open
pause
