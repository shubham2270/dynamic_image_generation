const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");

// Register the font (make sure the font supports Devanagari)
registerFont("NotoSansDevanagari-Bold.ttf", {
  family: "NotoSansDevanagari",
}); // Replace with your font file path

const generateDohaImage = async (
  lang,
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
  const textLen = lang === "hin" ? hinTextLength : engTextLength;
  const meaningWithLineBreak = insertNewlineBasedOnLength(meaningText, textLen);

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

const dohas = [
  {
    lang: "eng",
    serial: 36,
    doha: "हरिजन गाँठि न बांधही, उदर समाना लेय |\nआगे पीछे हरि खड़े, जो मांगै सो देय | ३६ ||",
    meaning:
      "A true devotee does not hoard for tomorrow, taking only enough to satisfy hunger. God, the caretaker, stands by and provides as needed.",
    ang: "Viswash ko ang",
  },
  {
    lang: "eng",
    serial: 37,
    doha: "अंडा पालै काछुई, बिन थन राखै पोख |\nयौं करता सबको करै, पालै तीनों लोक | ३७ ||",
    meaning:
      "Just as the turtle nurtures her eggs with mere focus and no physical nourishment, God sustains all beings across the three worlds through His divine grace.",
    ang: "Viswash ko ang",
  },
  {
    lang: "eng",
    serial: 38,
    doha: "अब तूं काहे को डरै, सिर पर हरि का हाथ |\nहस्ती चढ़कर डोलिये, कूकर भुसे जु लाख | ३८ ||",
    meaning:
      "Why fear now? God’s hand is above you. Let the dogs of criticism bark; ride the elephant of devotion with confidence.",
    ang: "Viswash ko ang",
  },
  {
    lang: "eng",
    serial: 39,
    doha: "आगे पीछे हरि खड़ा, आप सम्हारे भार |\nजन को दुःखी क्यों करै, समरथ सिरजनहार | ३९ ||",
    meaning:
      "God stands by His devotees, taking their burdens upon Himself. Why would the all-powerful Creator ever allow His devotee to suffer?",
    ang: "Viswash ko ang",
  },
  {
    lang: "eng",
    serial: 40,
    doha: "ऐसा कौन अभागिया, जो विस्वास और |\nराम बिना पग धरन कूँ, कहो कहाँ है ठौर || ४० ||",
    meaning:
      "Who is so unfortunate as to trust anyone other than Ram? Without Ram, is there even a place to stand?",
    ang: "Viswash ko ang",
  },
];

dohas.forEach(({ lang, ang, serial, doha, meaning }, i) => {
  generateDohaImage(
    lang,
    ang,
    serial,
    doha,
    meaning,
    "doha_template.png",
    `doha_${lang}_${ang}_${serial}.png`
  );
});
