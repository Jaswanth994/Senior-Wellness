const API_KEY = import.meta.env.VITE_LANGUAGE_API_KEY;

// Fetch supported languages
export const fetchLanguages = async () => {
  try {
    const response = await fetch("https://api.apilayer.com/language_translation/languages", {
      method: 'GET',
      headers: { "apikey": API_KEY }
    });
    const data = await response.json();
    return data.languages;
  } catch (error) {
    console.error("Error fetching languages:", error);
  }
};

// Detect language of a given text
export const detectLanguage = async (text) => {
  try {
    const response = await fetch("https://api.apilayer.com/language_translation/identify", {
      method: 'POST',
      headers: {
        "apikey": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ body: text })
    });
    return await response.json();
  } catch (error) {
    console.error("Error detecting language:", error);
  }
};

// Translate text to a target language
export const translateText = async (text, targetLanguage) => {
  try {
    const response = await fetch(`https://api.apilayer.com/language_translation/translate?target=${targetLanguage}`, {
      method: 'POST',
      headers: {
        "apikey": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ body: text })
    });
    return await response.json();
  } catch (error) {
    console.error("Error translating text:", error);
  }
};
