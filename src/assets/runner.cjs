const fs = require('fs');
const path = require('path');

function findFontsDirectory() {
    const currentDirectory = process.cwd();

    // Check the current directory
    if (fs.existsSync(path.join(currentDirectory, "fonts"))) {
        return path.join(currentDirectory, "fonts");
    }

    // Check subdirectories
    const subDirectories = fs.readdirSync(currentDirectory, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => path.join(currentDirectory, entry.name));

    for (const dir of subDirectories) {
        if (fs.existsSync(path.join(dir, "fonts"))) {
            return path.join(dir, "fonts");
        }
    }

    // If fonts directory is not found
    return null;
}

function generateFontCss(directory) {
    if (!directory) {
        console.log("Error: Fonts directory not found.");
        return "";
    }

    const fontFamilies = {};

    const walkSync = (currentDir, fontFamily) => {
        const files = fs.readdirSync(currentDir);
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            if (fs.statSync(filePath).isDirectory()) {
                walkSync(filePath, fontFamily || path.basename(filePath));
            } else if (file.endsWith(".ttf")) {
                const familyName = fontFamily || path.basename(currentDir);
                if (!fontFamilies[familyName]) {
                    fontFamilies[familyName] = [];
                }
                fontFamilies[familyName].push(path.relative(directory, filePath));
            }
        }
    };

    walkSync(directory);

    let cssOutput = "";
    for (const fontFamily in fontFamilies) {
        cssOutput += `@font-face {\n`;
        cssOutput += `  font-family: '${fontFamily}';\n`;
        cssOutput += `  src: ${fontFamilies[fontFamily].map(file => `url('${file}') format('truetype')`).join(', ')};\n`;
        cssOutput += `}\n\n`;
    }

    return cssOutput;
}

if (require.main === module) {
    const fontsDirectory = findFontsDirectory();

    if (fontsDirectory) {
        const cssContent = generateFontCss(fontsDirectory);

        console.log("CSS Content:");
        console.log(cssContent);

        fs.writeFileSync("fonts.css", cssContent);
        console.log("CSS file generated successfully.");
    } else {
        console.log("Error: Fonts directory not found.");
    }
}
