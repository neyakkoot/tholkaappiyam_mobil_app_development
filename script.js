// தொல்காப்பியச் செயலி - ஆய்வு நிரல்

function analyzeText() {
    const text = document.getElementById("textInput").value.trim();
    if (!text) {
        alert("தயவுசெய்து தமிழ் உரையை உள்ளிடவும்.");
        return;
    }

    const words = text.split(/\s+/); // சொற்களைப் பிரித்தல்
    
    checkMozhiMudhal(words);
    checkMozhiIruthi(words);
    checkPunarchi(text);
}

// 1. மொழிமுதல் ஆய்வு (Words start check)
function checkMozhiMudhal(words) {
    // தொல்காப்பிய விதிப்படி முதலில் வராத எழுத்துக்கள் (எளிய வடிவம்)
    const invalidStarts = ['ட', 'ண', 'ர', 'ல', 'ள', 'ழ', 'ற', 'ன']; 
    let errors = [];

    words.forEach(word => {
        let firstChar = word.charAt(0);
        // இது ஒரு எளிய சரிபார்ப்பு. மெய்யெழுத்து அகற்றுதல் போன்ற மேம்பட்ட விதிகள் தேவைப்படலாம்.
        if (invalidStarts.includes(firstChar)) {
            errors.push(`'${word}' - '${firstChar}' எழுத்தில் தொடங்கக்கூடாது.`);
        }
    });

    displayResult("result-mudhal", errors, "எல்லா சொற்களும் சரியான எழுத்தில் தொடங்குகின்றன.");
}

// 2. மொழியிறுதி ஆய்வு (Words end check)
function checkMozhiIruthi(words) {
    // இறுதியில் வரக்கூடாத மெய்கள்: க், ச், ட், த், ப், ற் (வல்லினம்) மற்றும் ங்
    // (குறிப்பு: குற்றியலுகரமாக வந்தால் வரலாம். இது அடிப்படை விதி)
    const invalidEnds = ['க்', 'ச்', 'ட்', 'த்', 'ப்', 'ற்', 'ங்'];
    let errors = [];

    words.forEach(word => {
        // கடைசி எழுத்து மெய்யெழுத்தா என பார்க்க வேண்டும்
        // எளிமைக்காக கடைசி எழுத்தை மட்டும் சோதிக்கிறோம்
        invalidEnds.forEach(endChar => {
            if (word.endsWith(endChar)) {
                errors.push(`'${word}' - '${endChar}' மெய்யெழுத்தில் முடியக்கூடாது.`);
            }
        });
    });

    displayResult("result-iruthi", errors, "மொழியிறுதிப் பிழைகள் இல்லை.");
}

// 3. புணர்ச்சி மற்றும் பொதுவான பிழை திருத்தம்
function checkPunarchi(text) {
    let errors = [];
    
    // எடுத்துக்காட்டு விதி: 'அவள்' + 'யார்' = 'அவள்யார்' (சரி), 'அவள்' + 'தான்' = 'அவள்தான்'
    // லகர ளகர விதிகளுக்கான மாதிரி குறியீடு
    
    // பொதுவான சந்திப் பிழை எடுத்துக்காட்டு (வல்லினம் மிகும் இடங்கள்)
    // இது மிகவும் சிக்கலானது, இங்கே ஒரு மாதிரி (Dummy Logic) தரப்பட்டுள்ளது.
    if (text.includes("அந்த பையன்")) {
         errors.push("'அந்த பையன்' -> 'அந்தப் பையன்' (வல்லினம் மிகும்)");
    }
    if (text.includes("எந்த புத்தகம்")) {
        errors.push("'எந்த புத்தகம்' -> 'எந்தப் புத்தகம்' (வல்லினம் மிகும்)");
   }

    displayResult("result-punarchi", errors, "குறிப்பிட்ட புணர்ச்சிப் பிழைகள் காணப்படவில்லை.");
}

// முடிவுகளைத் திரையில் காட்டும் செயல்பாடு
function displayResult(elementId, errorList, successMsg) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    if (errorList.length === 0) {
        container.innerHTML = `<div class="status-pass">✓ ${successMsg}</div>`;
    } else {
        let ul = document.createElement("ul");
        ul.className = "error-list";
        errorList.forEach(err => {
            let li = document.createElement("li");
            li.textContent = err;
            ul.appendChild(li);
        });
        container.appendChild(ul);
    }
}
