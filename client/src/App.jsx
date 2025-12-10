import { useState, useEffect } from "react";
import axios from "axios";
import { Copy, Check, Code2 } from "lucide-react"; 
import "./App.css"; // Import our new CSS file

function App() {
  const [snippets, setSnippets] = useState([]);
  const [formData, setFormData] = useState({ title: "", language: "javascript", code: "" });
  const [copiedId, setCopiedId] = useState(null); 

  // 1. Fetch Snippets
  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/snippets");
      setSnippets(res.data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  // 2. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/snippets", formData);
      setFormData({ title: "", language: "javascript", code: "" });
      fetchSnippets();
    } catch (error) {
      console.error("Error creating snippet:", error);
      alert("Failed to save. Check console.");
    }
  };

  // 3. Copy Function
  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <Code2 className="icon" />
        <h1>Snippet Manager</h1>
      </header>

      {/* FORM */}
      <div className="form-card">
        <h2>Add New Snippet</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Title (e.g. Auth Middleware)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              <option value="sql">SQL</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          
          <div className="form-row">
            <textarea
              rows="6"
              placeholder="Paste your code here..."
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-save">Save Snippet</button>
        </form>
      </div>

      {/* LIST */}
      <div className="snippet-list">
        {snippets.map((snippet) => (
          <div key={snippet._id} className="snippet-card">
            <div className="card-header">
              <div>
                <h3>{snippet.title}</h3>
                <span className="lang-badge">{snippet.language}</span>
              </div>
              <button
                onClick={() => handleCopy(snippet.code, snippet._id)}
                className="btn-copy"
                title="Copy Code"
              >
                {copiedId === snippet._id ? <Check size={20} color="green" /> : <Copy size={20} />}
              </button>
            </div>

            <pre className="code-block">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}

        {snippets.length === 0 && (
          <p className="empty-state">No snippets yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

export default App;