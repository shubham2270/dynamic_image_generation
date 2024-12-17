const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");

// Register the font (make sure the font supports Devanagari)
registerFont("NotoSansDevanagari-Bold.ttf", {
  family: "NotoSansDevanagari",
}); // Replace with your font file path

const generateDohaImage = async (
  angText,
  serialNumber,
  dohaText,
  meaningText,
  backgroundPath,
  outputPath
) => {
  // Load the background image
  const background = await loadImage(backgroundPath);

  // Canvas dimensions (Instagram square: 1080x1080 pixels)
  const width = 1080;
  const height = 1080;

  // Create canvas and context
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Draw the background image on the canvas
  ctx.drawImage(background, 0, 0, width, height);

  // Serial Number
  ctx.font = "bold 50px Arial"; // Font for serial number
  ctx.fillStyle = "#ffffff"; // White text color for serial number
  ctx.fillText(`#${serialNumber}`, 50, 80);

  // Ang Text
  ctx.font = "24px Arial"; // Font for serial number
  ctx.fillStyle = "#ffffff"; // White text color for serial number
  ctx.fillText(`${angText}`, 200, 70);

  // Doha Text
  ctx.font = '40px "NotoSansDevanagari"';
  ctx.fillStyle = "#ffde59"; // White text color
  const dohaLines = dohaText.split("\n");
  let yOffset = 150; // Starting Y position for doha text
  let xOffset = 140;
  dohaLines.forEach((line, i) => {
    if (i === 0) {
      ctx.fillText(line, xOffset + 80, yOffset);
    } else {
      ctx.fillText(line, xOffset, yOffset);
    }
    yOffset += 60; // Adjust line spacing
  });

  // Meaning Text
  ctx.font = '40px "NotoSansDevanagari"';
  ctx.fillStyle = "#dddddd"; // Light gray text for meaning

  function insertNewlineBasedOnLength(text, maxLineLength) {
    let result = "";
    let currentLine = "";

    // Split the text into words and iterate
    let words = text.split(" ");

    words.forEach((word) => {
      // If adding the word exceeds the max length, add a newline
      if ((currentLine + word).length > maxLineLength) {
        result += currentLine.trim() + "\n"; // Add the current line and newline
        currentLine = word + " "; // Start a new line with the current word
      } else {
        currentLine += word + " "; // Add the word to the current line
      }
    });

    // Append the last line
    result += currentLine.trim();

    return result;
  }
  const hinTextLength = 50;
  const engTextLength = 45;
  const meaningWithLineBreak = insertNewlineBasedOnLength(
    meaningText,
    hinTextLength
  );

  const meaningLines = meaningWithLineBreak.split("\n");
  yOffset += 50; // Add spacing before meaning
  meaningLines.forEach((line) => {
    ctx.fillText(line, 100, yOffset);
    yOffset += 60; // Adjust line spacing
  });

  // Save the image
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputPath, buffer);
  console.log(`Image saved at: ${outputPath}`);
};

// const dohas = [
//   {
//     lang: "eng",
//     ang: "Surma ko ang",
//     serial: 1,
//     doha: "कड़ी कमान कबीर की धरी रहै मैदान ।\nसूरा हवे सो खींचही, नहि कायर का काम । । १ । ।",
//     meaning:
//       "Kabir Sahib's teachings are like a powerful bow that remains in the field, but only a brave warrior can pull and adopt it. It is not the work of cowards.",
//   },
//   {
//     lang: "eng",
//     ang: "Surma ko ang",
//     serial: 2,
//     doha: "कड़ी कमान कबीर की, न्यारे न्यारे तीर ।\nचुनि चुनि मारै बखतरी, मूरख गिनै न तीर । । २ । ।",
//     meaning:
//       "Kabir Sahib's powerful bow contains various arrows of uplifting teachings. He selects and shoots these arrows of wisdom at the ignorant, but foolish people fail to grasp their importance.",
//   },
//   {
//     lang: "eng",
//     ang: "Surma ko ang",
//     serial: 3,
//     doha: "कड़ी कमान कबीर की, काचा टिकै न कोय ।\nसिर सौंपे सीधा लड़े, सूरा कहिये सोय । । ३ । ।",
//     meaning:
//       "Kabir Sahib's teachings are so powerful that no weak person can withstand them. Only those who surrender their ego and fight with sincerity are considered true warriors.",
//   },
// ];

const dohas = [
  {
    serial: 4,
    doha: "कड़ी कमान कबीर की धरी रहै मैदान ।\nसूरा हवे सो खींचही, नहि कायर का काम । । १ । ।",
    meaning:
      "कबीर साहब का उपदेशरूपी कमान शक्तिशाली है, जो मैदान में पड़ा रहने पर भी शूरवीर द्वारा ही खींचा-अपनाया जाता है। यह कायरों का काम नहीं है।",
  },
  {
    serial: 5,
    doha: "कड़ी कमान कबीर की, न्यारे न्यारे तीर ।\nचुनि चुनि मारै बखतरी, मूरख गिनै न तीर । । २ । ।",
    meaning:
      "कबीर साहब के शक्तिशाली कमान में अनेक तरह के आत्मोत्थानक तीररूपी सदुपदेश भरे पड़े हैं। अज्ञान के बक्खतर पहने संसारियों को वे चुन-चुनकर सदुपदेशरूपी तीर मारते हैं, पर मूर्ख मनुष्य उपदेश-तीर का महत्त्व नहीं समझता।",
  },
  {
    serial: 6,
    doha: "कड़ी कमान कबीर की, काचा टिकै न कोय ।\nसिर सौंपे सीधा लड़े, सूरा कहिये सोय । । ३ । ।",
    meaning:
      "कबीर साहब का उपदेशरूपी कमान बहुत अधिक शक्तिशाली है। कोई भी कच्चा इन्सान उसके आगे टिक नहीं सकता। जो अहंकार को त्यागकर निष्कपट निश्छल होकर लड़े, वही शूरवीर कहलाता है।",
  },
];

dohas.forEach(({ ang, serial, doha, meaning }, i) => {
  generateDohaImage(
    ang,
    serial,
    doha,
    meaning,
    "doha_template.png",
    `output_image_${serial}.png`
  );
});
