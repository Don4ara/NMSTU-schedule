// Ad-hoc подпись macOS-сборки, когда нет сертификата Developer ID.
//
// electron-builder без валидной identity просто пропускает подпись, и в бандле
// остаётся линкерная сигнатура самого Electron — она уже не соответствует
// подменённым Info.plist, иконке и asar. На Apple Silicon такой бандл не
// запускается вовсе: «Приложение повреждено и его не удаётся открыть».
//
// Ad-hoc подпись это чинит: приложение запускается после снятия карантина
// (右клик → Открыть или xattr -dr com.apple.quarantine). Полноценная подпись
// Developer ID + нотаризация всё равно нужны, чтобы оно открывалось без плясок.
const { execFileSync } = require('node:child_process');
const path = require('node:path');

exports.default = async function adhocSign(context) {
  if (context.electronPlatformName !== 'darwin') return;
  // настоящая подпись настроена — не вмешиваемся
  if (process.env.CSC_LINK || process.env.CSC_NAME) return;

  const appPath = path.join(
    context.appOutDir,
    `${context.packager.appInfo.productFilename}.app`,
  );

  execFileSync('codesign', ['--force', '--deep', '--sign', '-', appPath], {
    stdio: 'inherit',
  });
  console.log(`  • ad-hoc подпись  file=${appPath}`);
};
