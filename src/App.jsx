import { useState } from 'react';
import './App.css';

const ScriptGenerator = () => {
  const [genre, setGenre] = useState('');
  const [theme, setTheme] = useState('');
  const [characters, setCharacters] = useState('');
  const [setting, setSetting] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');

  const genres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 
    'Science Fiction', 'Thriller', 'Fantasy'
  ];

  const themes = [
    'Redemption', 'Love', 'Revenge', 'Coming of Age', 
    'Good vs Evil', 'Man vs Nature', 'Self Discovery'
  ];

  const getScriptTemplate = (genre, character1, character2) => {
    const templates = {
      Action: {
        intro: `FADE IN:\n\nEXT. {setting} - DAY\n\nThe sun beats down mercilessly as ${character1} surveys the terrain.`,
        conflict: `${character1} spots movement in the distance. ${character2} emerges, armed and dangerous.`,
        dialogue: `${character1}\n(tensely)\nI've been waiting for this moment.\n\n${character2}\n(firmly)\nThen let's not waste any more time.`
      },
      Drama: {
        intro: `FADE IN:\n\nINT. {setting} - EVENING\n\n${character1} sits alone, lost in thought.`,
        conflict: `The door creaks open. ${character2} enters, their eyes meeting in a moment of tension.`,
        dialogue: `${character1}\n(quietly)\nWe need to talk about what happened.\n\n${character2}\n(emotional)\nI'm not sure I'm ready for that conversation.`
      },
      Comedy: {
        intro: `FADE IN:\n\nINT. {setting} - DAY\n\n${character1} frantically runs around, clearly late for something important.`,
        conflict: `${character2} appears out of nowhere, holding a rubber chicken.`,
        dialogue: `${character1}\n(out of breath)\nOf all the days for this to happen!\n\n${character2}\n(grinning)\nTrust me, it gets better.`
      }
    };
    
    return templates[genre] || templates['Drama'];
  };

  const generateScript = () => {
    if (!genre || !theme || !characters || !setting) {
      setGeneratedScript("Please fill in all fields first!");
      return;
    }

    const charactersList = characters.split(',').map(c => c.trim());
    const character1 = charactersList[0]?.toUpperCase() || 'PROTAGONIST';
    const character2 = charactersList[1]?.toUpperCase() || 'ANTAGONIST';

    let script = `TITLE: "${theme.toUpperCase()} IN ${setting.toUpperCase()}"\n\n`;
    script += `GENRE: ${genre}\nTHEME: ${theme}\n\n`;

    const template = getScriptTemplate(genre, character1, character2);

    script += template.intro.replace('{setting}', setting);
    script += '\n\n' + template.conflict;
    script += '\n\n' + template.dialogue;

    setGeneratedScript(script);
  };

  return (
    <div className="container">
      <div className="generator">
        <h1>Movie Script Generator</h1>
        <div className="form">
          <div className="field">
            <label>Genre</label>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">Select genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="">Select theme</option>
              {themes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Characters (comma-separated)</label>
            <input 
              placeholder="e.g., John, Sarah, Detective Smith"
              onChange={(e) => setCharacters(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Setting</label>
            <input 
              placeholder="e.g., Abandoned Warehouse, City Park"
              onChange={(e) => setSetting(e.target.value)}
            />
          </div>
        </div>

        <button className="generate-button" onClick={generateScript}>
          Generate Script
        </button>

        {generatedScript && (
          <div className="script-output">
            <label>Generated Script:</label>
            <textarea 
              value={generatedScript}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptGenerator;


