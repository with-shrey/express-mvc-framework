var themeSettings = (localStorage.getItem('themeSettings')) ? JSON.parse(localStorage.getItem('themeSettings')) :
{};
var themeName = themeSettings.themeName || '';
if (themeName)
{
    document.write('<link rel="stylesheet" id="theme-style" href="/admin-temp/css/app-' + themeName + '.css">');
}
else
{
    document.write('<link rel="stylesheet" id="theme-style" href="/admin-temp/css/app.css">');
}
