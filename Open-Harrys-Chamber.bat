@echo off
rem Opens Harry's Chamber in its own window (no browser bars). Needs Microsoft Edge or Google Chrome.
set "URL=file:///%~dp0index.html"
set "URL=%URL:\=/%"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE%" (start "" "%EDGE%" --app="%URL%" & exit /b)
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" (start "" "%CHROME%" --app="%URL%" & exit /b)
set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" (start "" "%CHROME%" --app="%URL%" & exit /b)
start "" "%~dp0index.html"
